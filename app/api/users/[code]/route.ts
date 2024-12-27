import { NextRequest, NextResponse } from 'next/server'
import { os } from '@/lib/opensearch'
import Fortuneai from '@/lib/fortuneai'
import dayjs from 'dayjs'

export type Params = {
  code: string
}
export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { code } = await params
  try {
    const { body: { _id, _source } = {} } = await os.client.get({ index: os.index, id: code })

    const user = { _id, ..._source }

    const { _id: userEsId, birth, birthTime, name, gender, fortuneTime } = user
    const prevDate = dayjs(fortuneTime)
    const curDate = dayjs()

    if (prevDate.isBefore(curDate, 'day')) {
      const fortuneai = new Fortuneai()
      const fortune = await fortuneai.tell({ birth, birthTime, name, gender, userMessage: '오늘의 종합 운세' })

      await os.client.update({ index: os.index, id: userEsId, body: { doc: { fortune, fortuneTime: dayjs(curDate).format('YYYY-MM-DD') } } })

      Object.assign(user, { fortune, fortuneTime: dayjs(curDate).format('YYYY-MM-DD') })
    }

    return NextResponse.json({ user })
  } catch (err: any) {
    const { meta: { body: { found } = {} } = {} } = err
    if (!found) return NextResponse.json({ user: null })

    throw new Error(err)
  }
}
export async function POST(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { birth, birthTime, name, nickname, gender } = await req.json()
  const { code } = await params

  try {
    const { body: { _id } = {} } = await os.client.get({ index: os.index, id: code })

    if (_id) return NextResponse.json({ result: `이미 등록된 정보입니다.`, status: 409 })
  } catch (err: any) {
    const { meta: { body: { found } = {} } = {} } = err
    if (!found) {
      try {
        const fortuneai = new Fortuneai()
        const fortune = await fortuneai.tell({ birth, birthTime, name, gender, userMessage: '오늘의 종합 운세' })
        const fortuneTime = dayjs().format('YYYY-MM-DD')
        await os.client.index({
          index: os.index,
          id: code,
          body: { docType: 'user', name, nickname, birth, birthTime, code, gender, fortune, fortuneTime },
          refresh: true,
        })

        return NextResponse.json({ result: 'ok', user: { _id: code, name, nickname, birth, birthTime, code, gender, fortune, fortuneTime } })
      } catch (err: any) {
        throw new Error(err)
      }
    }
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { birth, birthTime, name, nickname, gender } = await req.json()
  const { code } = await params
  // const fortuneai = new Fortuneai()
  // const fortune = await fortuneai.tell({ birth, birthTime, name, gender, userMessage: '오늘의 종합 운세' })
  // const fortuneTime = dayjs().format('YYYY-MM-DD')

  await os.client.update({
    index: os.index,
    id: code,
    body: { doc: { name, nickname, birth, birthTime, code, gender } },
  })

  return NextResponse.json({ result: 'ok', updated: { name, nickname, birth, birthTime, gender }, message: '운세정보는 다음날부터 갱신됩니다.' })
}
