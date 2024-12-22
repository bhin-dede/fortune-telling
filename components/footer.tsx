'use client'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

type FooterComponentProps = {
  info: Record<string, any>
}
export function FooterComponent({ info }: FooterComponentProps) {
  const router = useRouter()
  const handleClickButton = async () => {
    const { code, ...user } = info
    await fetch(`/api/users/${info.code}`, {
      method: 'POST',
      body: JSON.stringify(user)
    })
    router.push(`/result`)
  }
  return (
    <Button onClick={handleClickButton} className="px-20 h-14 text-base absolute bottom-10 w-5/6">
      저장하기
    </Button>
  )
}
