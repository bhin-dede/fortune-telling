import { NextRequest, NextResponse } from 'next/server'
import Fortuneai from '@/lib/fortuneai'
const fortuneai = new Fortuneai()

export async function POST(req: NextRequest) {
  const { birth, birthTime, name, gender, userMessage } = await req.json()
  const fortune = await fortuneai.tell({ birth, birthTime, name, gender, userMessage: userMessage || '오늘의 종합 운세' })

  return NextResponse.json({ fortune })
}
