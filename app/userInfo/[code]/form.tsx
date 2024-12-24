'use client'
import { FooterComponent } from '@/app/userInfo/[code]/footer'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
const Form = ({ code }: { code: string }) => {
  const [info, setInfo] = useState({})
  const handleInputChange = ({ e, key }: { e: any; key: string }) => {
    setInfo({ ...info, [key]: e.target.value })
  }

  return (
    <div className="h-full flex flex-col content-center items-center justify-center">
      <span className="text-xl font-bold">정확한 운세를 위해 정보를 입력해주세요.</span>
      <span className="text-neutral-600 mb-5">* 운세보기 외 정보를 사용하지 않습니다.</span>
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
