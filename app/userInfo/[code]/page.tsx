import React from 'react'
import { type Params } from '@/app/api/users/[code]/route'

import Form from './form'

export default async function UserInfoPage({ params }: { params: Promise<Params> }) {
  const { code } = await params
  const res = await fetch(`${process.env.BASE_URL}/api/users/${code}`)
  const result = await res.json()
  console.info(result)

  return (
    <Form code={code} />
  )
}
