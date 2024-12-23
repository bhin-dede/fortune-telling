'use client'
import { FooterComponent } from '@/components/footer'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
const Form = ({ code }: { code: string }) => {
  const [info, setInfo] = useState({})
  const handleInputChange = ({ e, key }: { e: any; key: string }) => {
    setInfo({ ...info, [key]: e.target.value })
  }

  return (
    <div className="h-full flex flex-col content-center items-center justify-center">
      <span className="text-neutral-600">2024년 12월 22일</span>
      <span className="text-xl font-bold mb-5">오늘 마음 먹은 때라면 과감히 실행하세요.</span>
      <div className="w-5/6 flex flex-col gap-2">
        <Input className="h-14 bg-white" placeholder="이름" onChange={e => handleInputChange({ e, key: 'name' })} />
        <Input className="h-14 bg-white" placeholder="19940101" onChange={e => handleInputChange({ e, key: 'birth' })} />
        <Input className="h-14 bg-white" placeholder="태어난시간" onChange={e => handleInputChange({ e, key: 'birthTime' })} />
        <Input className="h-14 bg-white" placeholder="여성" onChange={e => handleInputChange({ e, key: 'gender' })} />
      </div>
      <FooterComponent info={{ ...info, code }} />
    </div>
  )
}

export default Form
