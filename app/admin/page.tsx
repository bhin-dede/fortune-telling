'use client'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AdminSchema } from '@/lib/zod'
import { z } from 'zod'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
export type AdminFormData = z.infer<typeof AdminSchema>
const Admin = () => {
  const form = useForm<AdminFormData>({
    resolver: zodResolver(AdminSchema),
    mode: 'all',
    defaultValues: { nfcId: '', adminId: '', adminPw: '' },
  })
  const { handleSubmit } = form
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const onValid: SubmitHandler<AdminFormData> = async formData => {
    setLoading(true)

    try {
      await fetch(`/api/nfc`, {
        method: 'POST',
        body: JSON.stringify(formData),
      })

      setLoading(false)
      return router.push(`/${formData.nfcId}`)
    } catch (err) {
      console.info(err)
    }
  }
  const onInvalid: SubmitErrorHandler<AdminFormData> = invalid => {
    // 유효성 검사 실패시
    console.info('Invalid: ', invalid)
  }

  const onSubmit = handleSubmit(onValid, onInvalid)
  return (
    <div className="h-full flex flex-col content-center items-center justify-center">
      <span className="text-xl font-bold mb-10">NFC 등록</span>

      <Form {...form}>
        <form className="w-5/6 flex flex-col gap-2" onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="nfcId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="h-14 bg-white" placeholder="NFC 번호" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="adminId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="h-14 bg-white" placeholder="관리자 아이디" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="adminPw"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="h-14 bg-white" type="password" placeholder="관리자 비밀번호" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} type="submit" className="px-20 h-14 text-base absolute bottom-10 w-5/6">
            {loading ? '잠시만 기다려주세요..' : '저장하기'}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Admin
