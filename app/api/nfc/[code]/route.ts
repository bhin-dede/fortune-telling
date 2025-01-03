import { NextRequest, NextResponse } from 'next/server'
import { os } from '@/lib/opensearch'

import { NFCSchema } from '@/lib/zod'
import { ZodError } from 'zod'

type Params = {
  code: string
}

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { code } = await params

  try {
    NFCSchema.parse({ code })
    const { body: { _id, _source } = {} } = await os.client.get({ index: os.index, id: code })

    if (_id) return NextResponse.json({ _id, ..._source })
    else return NextResponse.json({ message: '등록되지 않은 NFC입니다.', status: 404 })
  } catch (err: any) {
    if (err instanceof ZodError) return NextResponse.json({ error: { message: 'Validation error', errors: err.errors } })

    throw new Error(err)
  }
}
