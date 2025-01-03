'use client'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserSchema } from '@/lib/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useAtom } from 'jotai'
import { responseUser } from '@/store/state'
import { useRouter } from 'next/navigation'

export type UserFormData = z.infer<typeof UserSchema>
const UserForm = ({ nfcId }: { nfcId: string }) => {
  const [user, setUser] = useAtom(responseUser)
  const form = useForm<UserFormData>({
    resolver: zodResolver(UserSchema),
    mode: 'all',
    defaultValues: { name: user?.name || '', birth: user?.birth || '', birthTime: user?.birthTime || '', gender: user?.gender || '' },
  })
  const { handleSubmit } = form
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  if (!user) {
    const onValid: SubmitHandler<UserFormData> = async formData => {
      setLoading(true)

      try {
        const res = await fetch(`/api/users/${nfcId}`, {
          method: 'POST',
          body: JSON.stringify(formData),
        })
        const result = await res.json()
        if (Object.keys(result.user).length) setUser(result.user)

        setLoading(false)
        return router.push(`/${nfcId}/result`)
      } catch (err) {
        console.info(err)
      }
    }
    const onInvalid: SubmitErrorHandler<UserFormData> = invalid => {
      // 유효성 검사 실패시
      console.info('Invalid: ', invalid)
    }
    const onSubmit = handleSubmit(onValid, onInvalid)
    return (
      <div className="h-full flex flex-col content-center items-center justify-center">
        <span className="text-xl font-bold">정확한 운세를 위해 정보를 입력해주세요.</span>
        <span className="text-neutral-600 mb-5">* 운세보기 외 정보를 사용하지 않습니다.</span>
        <Form {...form}>
          <form className="w-5/6 flex flex-col gap-2" onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="h-14 bg-white" placeholder="이름" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birth"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="h-14 bg-white" placeholder="19940101" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthTime"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="h-14 bg-white" placeholder="태어난시간" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="h-14 bg-white" placeholder="성별" {...field} />
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
  } else {
    const onValid: SubmitHandler<UserFormData> = async formData => {
      setLoading(true)

      try {
        const res = await fetch(`/api/users/${nfcId}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        })
        const { updated } = await res.json()
        setUser({ ...user, ...updated })

        setLoading(false)
        return router.push(`/${nfcId}`)
      } catch (err) {
        console.info(err)
      }
    }
    const onInvalid: SubmitErrorHandler<UserFormData> = invalid => {
      // 유효성 검사 실패시
      console.info('Invalid: ', invalid)
    }
    const onSubmit = handleSubmit(onValid, onInvalid)
    return (
      <div className="h-full flex flex-col content-center items-center justify-center">
        <span className="text-xl font-bold">변경할 정보를 입력해주세요.</span>
        <span className="text-neutral-600 mb-5">* 다음날 부터 변경된 정보로 운세를 볼 수 있습니다.</span>

        <Form {...form}>
          <form className="w-5/6 flex flex-col gap-2" onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="h-14 bg-white" placeholder="이름" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birth"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="h-14 bg-white" placeholder="19940101" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthTime"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="h-14 bg-white" placeholder="태어난시간" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="h-14 bg-white" placeholder="성별" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full gap-2">
              <Button disabled={loading} type="button" variant="outline" className="flex-1 h-14" onClick={() => router.push(`/${nfcId}`)}>
                취소
              </Button>
              <Button disabled={loading} type="submit" className="text-base flex-1 h-14">
                {loading ? '잠시만 기다려주세요..' : '저장하기'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    )
  }
}

export default UserForm
