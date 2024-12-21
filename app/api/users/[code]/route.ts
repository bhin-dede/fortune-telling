import { NextRequest, NextResponse } from 'next/server'
import { os } from '@/lib/opensearch'

type Params = {
  code: string
}
export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { code } = params
  try {
    const { body: { hits: { hits } = {} } = {} } = await os.client.search({
      index: os.index,
      body: { query: { bool: { filter: [{ term: { 'docType.keyword': 'user' } }, { term: { 'code.keyword': code } }] } } },
    })
    return NextResponse.json({ hits })
  } catch (err: any) {
    throw new Error(err)
  }
}
export async function POST(req: NextRequest) {
  const { birth, birthTime, name, code, gender } = await req.json()

  await os.client.index({
    index: os.index,
    body: { docType: 'user', name, birth, birthTime, code, gender },
    refresh: true,
  })

  return NextResponse.json({ result: 'ok' })
}
