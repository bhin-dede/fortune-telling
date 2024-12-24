'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useAtom } from 'jotai'
import { type User, responseUser } from '@/store/state'

export function MainPageClient({ code }: { code: string }) {
  const router = useRouter()
  const [user, setUser] = useAtom<User>(responseUser)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/users/${code}`)
        const result = await res.json()
        if (Object.keys(result.user)) return setUser(result.user)
      } catch (err) {
        console.info(err)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <span className="text-2xl font-bold">오늘 운세</span>
      <span className="text-2xl font-bold">완전 럭키{user.name}잖아? </span>
      <Image className="dark:invert" src="/giphy.gif" alt="giphy" width={300} height={300} />
      <Button
        onClick={() => (Object.keys(user).length ? router.push(`/result`) : router.push(`/userInfo/${code}`))}
        className="px-20 h-14 text-base absolute bottom-10 w-5/6"
      >
        오늘의 운세보기
      </Button>
    </>
  )
}
