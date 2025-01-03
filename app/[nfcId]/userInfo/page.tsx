import React from 'react'
import { type Params } from '@/app/api/users/[nfcId]/route'
import Form from './form'

export default async function UserInfoPage({ params }: { params: Promise<Params> }) {
  const { nfcId } = await params

  return <Form nfcId={nfcId} />
}
