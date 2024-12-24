'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'

import { useAtom } from 'jotai'
import { type User, responseUser } from '@/store/state'

export default function ResultPage() {
  const router = useRouter()
  const [user] = useAtom<User>(responseUser)
  const date = dayjs(user.fortuneTime).format('YYYY-MM-DD')

  return (
    <>
      <main className="h-full flex flex-col content-center items-center justify-center">
        <span className="text-neutral-600">{date}</span>
        <span className="text-xl font-bold mb-5">오늘 마음 먹은 때라면 과감히 실행하세요.</span>
        <p className="w-5/6">{user.fortune}</p>
        <Button onClick={() => router.push(`/${user.code}`)} className="px-20 h-14 text-base absolute bottom-10 w-5/6">
          돌아가기
        </Button>
      </main>
    </>
  )
}
