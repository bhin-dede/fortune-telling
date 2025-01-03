import { NextRequest, NextResponse } from 'next/server'
import { os } from '@/lib/opensearch'
import dayjs from 'dayjs'

import { AdminSchema } from '@/lib/zod'
import { ZodError } from 'zod'

export async function POST(req: NextRequest) {
  const { nfcId, adminId, adminPw } = await req.json()

  if (adminId === process.env.ADMIN_ID && adminPw === process.env.ADMIN_PW) {
    try {
      AdminSchema.parse({ nfcId, adminId, adminPw })
      const { body: { _id } = {} } = await os.client.get({ index: os.index, id: nfcId })

      if (_id) return NextResponse.json({ result: `이미 등록된 정보입니다.`, status: 409 })
    } catch (err: any) {
      if (err instanceof ZodError) return NextResponse.json({ error: { message: 'Validation error', errors: err.errors } })

      const { meta: { body: { found } = {} } = {} } = err
      if (!found) {
        try {
          await os.client.index({
            index: os.index,
            id: nfcId,
            body: { docType: 'nfc', createdAt: dayjs().toISOString() },
            refresh: true,
          })

          return NextResponse.json({ result: 'ok' })
        } catch (err: any) {
          throw new Error(err)
        }
      }
    }
  } else {
    return NextResponse.json({ status: 401, message: '계정정보가 맞지 않습니다.' })
  }
}
