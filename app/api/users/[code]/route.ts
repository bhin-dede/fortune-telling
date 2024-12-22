import { NextRequest, NextResponse } from 'next/server'
import { os } from '@/lib/opensearch'
import Fortuneai from '@/lib/fortuneai'
import dayjs from 'dayjs'

export type Params = {
  code: string
}
export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { code } = params
  try {
    const { body: { hits: { hits = [] } = {} } = {} } = await os.client.search({
      index: os.index,
      body: { query: { bool: { filter: [{ term: { 'docType.keyword': 'user' } }, { term: { 'code.keyword': code } }] } } },
    })
    const { _id, _source } = hits?.[0] || {}
    const user = { _id, ..._source }
    if (user) {
      const { _id: userEsId, birth, birthTime, name, gender, fortuneTime } = user
      const prevDate = dayjs(fortuneTime)
      const curDate = dayjs()

      if (prevDate.isBefore(curDate, 'day')) {
        const fortuneai = new Fortuneai()
        const fortune = await fortuneai.tell({ birth, birthTime, name, gender, userMessage: '오늘의 운세' })

        await os.client.update({ index: os.index, id: userEsId, body: { doc: { fortune, fortuneTime: dayjs(curDate).format('YYYY-MM-DD') } } })

        Object.assign(user, { fortune, fortuneTime: dayjs(curDate).format('YYYY-MM-DD') })
      }
    }

    return NextResponse.json({ user })
  } catch (err: any) {
    throw new Error(err)
  }
}
export async function POST(req: NextRequest, { params }: { params: Params }) {
  const { birth, birthTime, name, gender } = await req.json()
  const { code } = params

  const { body: { hits: { total: { value = 0 } = {} } = {} } = {} } = await os.client.search({
    index: os.index,
    body: { query: { bool: { filter: [{ term: { 'docType.keyword': 'user' } }, { term: { 'code.keyword': code } }] } } },
  })

  if (value) return NextResponse.json({ result: `이미 등록된 code(${code})입니다.`, status: 409 })

  const fortuneai = new Fortuneai()
  const fortune = await fortuneai.tell({ birth, birthTime, name, gender, userMessage: '오늘의 운세' })
  const fortuneTime = dayjs().format('YYYY-MM-DD')
  await os.client.index({
    index: os.index,
    body: { docType: 'user', name, birth, birthTime, code, gender, fortune, fortuneTime },
    refresh: true,
  })

  return NextResponse.json({ result: 'ok' })
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  const { _id, birth, birthTime, name, gender } = await req.json()
  const { code } = params
  const fortuneai = new Fortuneai()
  const fortune = await fortuneai.tell({ birth, birthTime, name, gender, userMessage: '오늘의 운세' })
  const fortuneTime = dayjs().format('YYYY-MM-DD')

  await os.client.update({
    index: os.index,
    id: _id,
    body: { doc: { name, birth, birthTime, code, gender, fortune, fortuneTime } },
  })

  return NextResponse.json({ result: 'ok' })
}
