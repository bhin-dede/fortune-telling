import React from 'react'
import { type Params } from '@/app/api/users/[code]/route'

import Form from './form'

export default async function UserInfoPage({ params }: { params: Promise<Params> }) {
  const { code } = await params

  return <Form code={code} />
}
