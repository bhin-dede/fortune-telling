import { Client, errors } from '@opensearch-project/opensearch'

const node = process.env.OPENSEARCH_NODE || 'https://localhost:9200'
const username = process.env.OPENSEARCH_USERNAME || ''
const password = process.env.OPENSEARCH_PASSWORD || ''
const index = process.env.OPENSEARCH_INDEX || ''

type Connection = {
  node: string
  username?: string
  password?: string
  index: string
}

class OS {
  index: string
  client: Client

  constructor({ node, username = '', password = '', index }: Connection) {
    this.client = new Client({
      node,
      auth: {
        username,
        password,
      },
      ssl: {
        rejectUnauthorized: false,
      },
    })
    this.index = index

    this.init({ client: this.client, index: this.index })
  }

  init = async ({ client, index }: { client: Client; index: string }) => {
    let indexKey = index
    try {
      const { body } = await client.indices.get({ index })
      // Alias로 설정된 경우를 우회하기 위하여 작성
      const indexies = Object.keys(body)
      if (!indexies.includes(indexKey)) {
        // alias로 설정된 인덱스가 1개 이상일 경우 특정할 수 없으므로 추가적인 우회방법 필요함.
        if (indexies.length > 1) throw new Error('설정한 인덱스를 나타내는 Alias가 하나 이상입니다. 자동으로 설정할 수 없습니다.')
        const aliases = Object.keys(body[indexies[0]].aliases)

        if (!aliases.includes(indexKey)) throw new Error('설정한 인덱스를 나타내는 Alias가 존재하지 않습니다.')

        indexKey = indexies[0]
      }
    } catch (err: any) {
      console.info('###########', { ...err })
      if (err instanceof errors.ConnectionError) {
        console.info('데이터베이스 연결을 실패하였습니다.')
        throw new Error('데이터베이스 연결을 실패하였습니다.')
      }

      const { meta: { body: { meta: { connection } = {}, error: { type = '', reason = '' } = {} } = {} } = {} } = err

      if (!['resource_already_exists_exception', 'index_not_found_exception', 'illegal_argument_exception'].includes(type)) throw err

      if (!/^Limit of total fields \[\d+\] has been exceeded$/.test(reason)) {
        console.info('@@@@@@@@@@@여기오는거야?')
        await client.indices.create({
          index,
          wait_for_active_shards: 'all',
        })
      }
    } finally {
      console.info(`[opensearch] "${index}" 인덱스가 준비되었습니다.`)
    }
  }
}

const os = new OS({ node, username, password, index })

export { os }
