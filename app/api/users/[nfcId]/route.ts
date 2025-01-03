import { NextRequest, NextResponse } from 'next/server'
import { os } from '@/lib/opensearch'
import Fortuneai from '@/lib/fortuneai'
import dayjs from 'dayjs'

import { UserSchema } from '@/lib/zod'
import { ZodError } from 'zod'

export type Params = {
  nfcId: string
}

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { nfcId } = await params

  try {
    const { body: { hits: { hits = [], total: { value: total = 0 } = {} } = {} } = {} } = await os.client.search({
      index: os.index,
      body: { query: { bool: { filter: [{ term: { 'docType.keyword': 'user' } }, { term: { 'nfcId.keyword': nfcId } }] } } },
    })

    if (!total) return NextResponse.json({ user: null })

    const { _id, _source } = hits[0]

    const user = { _id, ..._source }

    // const { _id: userEsId, birth, birthTime, name, gender, fortuneTime } = user
    // const prevDate = dayjs(fortuneTime)
    // const curDate = dayjs()

    // if (prevDate.isBefore(curDate, 'day')) {
    //   const fortuneai = new Fortuneai()
    //   const fortune = await fortuneai.tell({ birth, birthTime, name, gender, userMessage: '오늘의 종합 운세' })

    //   await os.client.update({ index: os.index, id: userEsId, body: { doc: { fortune, fortuneTime: dayjs(curDate).format('YYYY-MM-DD') } } })

    //   Object.assign(user, { fortune, fortuneTime: dayjs(curDate).format('YYYY-MM-DD') })
    // }

    return NextResponse.json({ user })
  } catch (err: any) {
    const { meta: { body: { found } = {} } = {} } = err
    if (!found) return NextResponse.json({ user: null })

    throw new Error(err)
  }
}
export async function POST(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { birth, birthTime, name, nickname, gender } = await req.json()
  const { nfcId } = await params

  try {
    UserSchema.parse({ birth, birthTime, name, nickname, gender })
    const { body: { count: total } = {} } = await os.client.count({
      index: os.index,
      body: { query: { bool: { filter: [{ term: { 'docType.keyword': 'user' } }, { term: { 'nfcId.keyword': nfcId } }] } } },
    })

    if (total) return NextResponse.json({ result: `이미 등록된 정보입니다.`, status: 409 })
    else {
      const fortuneai = new Fortuneai()
      const fortune = await fortuneai.tell({ birth, birthTime, name, gender, userMessage: '오늘의 종합 운세' })
      const fortuneTime = dayjs().format('YYYY-MM-DD')
      const { body: { _id: createdId } = {} } = await os.client.index({
        index: os.index,
        body: { docType: 'user', name, nickname, birth, birthTime, nfcId, gender, fortune, fortuneTime },
        refresh: true,
      })

      return NextResponse.json({ result: 'ok', user: { _id: createdId, name, nickname, birth, birthTime, nfcId, gender, fortune, fortuneTime } })
    }
  } catch (err: any) {
    if (err instanceof ZodError) return NextResponse.json({ error: { message: 'Validation error', errors: err.errors } })

    throw new Error(err)
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { birth, birthTime, name, nickname, gender, _id } = await req.json()
  const { nfcId } = await params
  // const fortuneai = new Fortuneai()
  // const fortune = await fortuneai.tell({ birth, birthTime, name, gender, userMessage: '오늘의 종합 운세' })
  // const fortuneTime = dayjs().format('YYYY-MM-DD')

  try {
    UserSchema.parse({ birth, birthTime, name, nickname, gender })

    await os.client.update({
      index: os.index,
      id: _id,
      body: { doc: { name, nickname, birth, birthTime, nfcId, gender } },
    })

    return NextResponse.json({ result: 'ok', updated: { name, nickname, birth, birthTime, gender }, message: '운세정보는 다음날부터 갱신됩니다.' })
  } catch (err: any) {
    if (err instanceof ZodError) return NextResponse.json({ error: { message: 'Validation error', errors: err.errors } })

    throw new Error(err)
  }
}
