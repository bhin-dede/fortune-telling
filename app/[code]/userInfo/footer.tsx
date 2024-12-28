'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAtom } from 'jotai'
import { type User, responseUser } from '@/store/state'

type FooterComponentProps = {
  info: Record<string, any>
}
export function FooterComponent({ info }: FooterComponentProps) {
  const router = useRouter()
  const [, setUser] = useAtom<User>(responseUser)
  const [isLoading, setIsLoading] = useState(false)

  const handleClickButton = async () => {
    setIsLoading(true)
    const { code, ...user } = info
    try {
      const res = await fetch(`/api/users/${code}`, {
        method: 'POST',
        body: JSON.stringify(user),
      })
      const result = await res.json()
      if (Object.keys(result.user).length) setUser(result.user)

      await router.push(`/${code}/result`)
    } catch (err) {
      console.info(err)
    }
    setIsLoading(false)
  }
  return (
    <Button onClick={handleClickButton} className="px-20 h-14 text-base absolute bottom-10 w-5/6">
      {isLoading ? '잠시만 기다려주세요..' : '저장하기'}
    </Button>
  )
}
