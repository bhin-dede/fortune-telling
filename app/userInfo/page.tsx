'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'

export default function UserInfoPage() {
  const router = useRouter()
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
      <Button onClick={() => router.push(`/result`)} className="px-20 h-14 text-base absolute bottom-10 w-5/6">
        저장하기
      </Button>
    </div>
  )
}
