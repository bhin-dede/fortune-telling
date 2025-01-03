'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import Image from 'next/image'

import { useAtom } from 'jotai'
import { responseUser } from '@/store/state'
import { useEffect, useState } from 'react'

export default function ResultPage() {
  const router = useRouter()
  const [user, setUser] = useAtom(responseUser)
  const [loading, setLoading] = useState(false)
  const date = dayjs(user?.fortuneTime).format('YYYY-MM-DD')
  useEffect(() => {
    const getFortune = async () => {
      setLoading(true)
      if (user?._id) {
        const res = await fetch(`/api/fortune/${user._id}`)
        const { user: _user } = await res.json()
        setUser(_user)
      }
      setLoading(false)
    }
    getFortune()
  }, [])

  return (
    <>
      {loading ? (
        <main className="h-full flex flex-col content-center items-center justify-center">
          <Image className="dark:invert" src="/fortune-cookie.gif" alt="fortune-cookie" width={300} height={300} priority />
          <span className="text-xl mt-10 font-bold w-5/6 text-center">운세 보는중...</span>
        </main>
      ) : (
        <main className="h-full flex flex-col content-center items-center justify-center">
          <span className="text-xl font-bold w-5/6 text-center">{user?.name}님의 오늘 운세</span>
          <span className="text-neutral-600">{date}</span>
          <span className="text-neutral-600 text-7xl mt-4 mb-10 font-bold">{user?.fortune?.totalScore}</span>
          {/* <span className="text-neutral-600 text-4xl mt-4 mb-10 font-bold">오늘 럭키 점수 : {user?.fortune?.totalScore}점</span> */}
          <span className="text-md font-bold mb-5 w-5/6 text-center">🔮 {user?.fortune?.summary}</span>
          <p className="w-5/6">{user?.fortune?.tell}</p>
          <div className="bg-white w-5/6 mt-5 rounded-md p-2">
            <div className="font-bold text-lime-700"> 오늘의 색 : {user?.fortune?.colors} </div>
            <p className="font-bold text-lime-700">오늘의 숫자 : {user?.fortune?.numbers}</p>
          </div>
          <Button onClick={() => router.push(`/${user?.nfcId}`)} className="px-20 h-14 text-base absolute bottom-10 w-5/6">
            돌아가기
          </Button>
        </main>
      )}
    </>
  )
}
