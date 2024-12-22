import React from 'react'
import { type Params } from '@/app/api/users/[code]/route'

import { Input } from '@/components/ui/input'
import { FooterComponent } from '@/components/footer'

export default async function UserInfoPage({ params }: { params: Promise<Params> }) {
  const { code } = await params
  console.info(code)

  return (
    <div className="h-full flex flex-col content-center items-center justify-center">
      <span className="text-neutral-600">2024년 12월 22일</span>
      <span className="text-xl font-bold mb-5">오늘 마음 먹은 때라면 과감히 실행하세요.</span>
      <div className="w-5/6 flex flex-col gap-2">
        <Input className="h-14 bg-white" placeholder="이름" />
        <Input className="h-14 bg-white" placeholder="19940101" />
        <Input className="h-14 bg-white" placeholder="태어난시간" />
        <Input className="h-14 bg-white" placeholder="여성" />
      </div>
      <FooterComponent />
    </div>
  )
}
