'use client'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

export function FooterComponent() {
  const router = useRouter()
  return (
    <Button onClick={() => router.push(`/result`)} className="px-20 h-14 text-base absolute bottom-10 w-5/6">
      저장하기
    </Button>
  )
}
