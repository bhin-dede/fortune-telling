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
        <span className="text-xl font-bold mb-5 w-5/6">{user.fortune?.summary}</span>
        <p className="w-5/6">{user.fortune?.tell}</p>
        <div className="bg-white w-5/6 mt-5 rounded-md p-2">
          <p className="font-bold text-lime-700">오늘의 색 : {user.fortune?.colors}</p>
          <p className="font-bold text-lime-700">오늘의 숫자 : {user.fortune?.numbers}</p>
        </div>
        <Button onClick={() => router.push(`/${user.code}`)} className="px-20 h-14 text-base absolute bottom-10 w-5/6">
          돌아가기
        </Button>
      </main>
    </>
  )
}
