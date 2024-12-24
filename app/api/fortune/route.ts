import { NextRequest, NextResponse } from 'next/server'
import Fortuneai from '@/lib/fortuneai'
const fortuneai = new Fortuneai()

export async function POST(req: NextRequest) {
  const { birth, birthTime, name, gender } = await req.json()
  const fortune = await fortuneai.tell({ birth, birthTime, name, gender, userMessage: '오늘의 운세' })

  return NextResponse.json({ fortune })
}
