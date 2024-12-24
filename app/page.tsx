'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="h-full flex flex-col content-center items-center justify-center">
      <span className="text-2xl font-bold">오늘의 운세</span>
      <span className="text-2xl font-bold">태그하고 안들어 와쨔냐?</span>
      <Image className="dark:invert" src="/giphy.gif" alt="giphy" width={300} height={300} />
      <Button disabled className="px-20 h-14 text-base absolute bottom-10 w-5/6">
        태그하고 들어오쇼
      </Button>
    </div>
  )
}
