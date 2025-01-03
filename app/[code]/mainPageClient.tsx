'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useAtom } from 'jotai'
import { type User, responseUser } from '@/store/state'
import { CircleUserRound } from 'lucide-react'

export function MainPageClient({ nfcId }: { nfcId: string }) {
  const router = useRouter()
  const [user, setUser] = useAtom<User | null>(responseUser)
  const [src, setSrc] = useState('/giphy.gif')
  const fallbackSrc = '/spongebob-84333.png'

  const handleError = () => {
    setSrc(fallbackSrc)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/users/${nfcId}`)
        const { user } = await res.json()

        if (!!user) return setUser(user)
      } catch (err) {
        console.info(err)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      {user && (
        <div className="w-5/6 flex justify-end pb-10">
          <CircleUserRound className="cursor-pointer" onClick={() => router.push(`/${nfcId}/userInfo`)} />
        </div>
      )}
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold">오늘 운세</span>
        <span className="text-2xl font-bold">완전 럭키{user?.name}잖아? </span>
      </div>
      <Image className="dark:invert" src={src} onError={handleError} alt="럭키운세" width={300} height={300} priority />
      <Button onClick={() => (!!user ? router.push(`/${nfcId}/result`) : router.push(`/${nfcId}/userInfo`))} className="px-20 h-14 text-base w-5/6">
        오늘의 운세보기
      </Button>
    </>
  )
}
