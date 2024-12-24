import { atom } from 'jotai'

export interface User {
  name?: string
  fortuneTime?: string
  fortune?: string
  code?: string
}

export const responseUser = atom<User>({})
