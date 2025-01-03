import { NextRequest, NextResponse } from 'next/server'
import { os } from '@/lib/opensearch'
import Fortuneai from '@/lib/fortuneai'
import dayjs from 'dayjs'

type Params = {
  userId: string
}

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { userId } = await params

  try {
    const { body: { _id, _source } = {} } = await os.client.get({ index: os.index, id: userId })

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

    // const fortune = await fortuneai.tell({ birth, birthTime, name, gender, userMessage: '오늘의 종합 운세' })

    return NextResponse.json({ user })
  } catch (err: any) {
    throw new Error(err)
  }
}
