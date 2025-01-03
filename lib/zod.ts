import { z } from 'zod'

export const UserSchema = z.object({
  name: z.string({ required_error: '필수 입력 사항입니다.' }).min(1, '필수 입력 사항입니다.'),
  birth: z.string({ required_error: '필수 입력 사항입니다.' }).min(1, '필수 입력 사항입니다.'),
  birthTime: z.string({ required_error: '필수 입력 사항입니다. 모르면 "모름" 입력' }).min(1, '필수 입력 사항입니다. 모르면 "모름" 입력'),
  gender: z.string({ required_error: '필수 입력 사항입니다.' }).min(1, '필수 입력 사항입니다.'),
  nickname: z.string().optional(),
})