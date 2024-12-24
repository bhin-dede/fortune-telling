import { atom } from 'jotai'

export interface User {
  name?: string
  fortuneTime?: string
  fortune?: {
    summary?: string
    tell?: string
    numbers?: string
    colors?: string
  }
  code?: string
}

export const responseUser = atom<User>({})
