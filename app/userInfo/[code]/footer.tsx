'use client'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { useAtom } from 'jotai'
import { type User, responseUser } from '@/store/state'

type FooterComponentProps = {
  info: Record<string, any>
}
export function FooterComponent({ info }: FooterComponentProps) {
  const router = useRouter()
  const [, setUser] = useAtom<User>(responseUser)

  const handleClickButton = async () => {
    const { code, ...user } = info
    try {
      const res = await fetch(`/api/users/${code}`, {
        method: 'POST',
        body: JSON.stringify(user),
      })
      const result = await res.json()
      if (Object.keys(result.user).length) setUser(result.user)

      await router.push(`/result`)
    } catch (err) {
      console.info(err)
    }
  }
  return (
    <Button onClick={handleClickButton} className="px-20 h-14 text-base absolute bottom-10 w-5/6">
      저장하기
    </Button>
  )
}
