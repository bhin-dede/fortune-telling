import { atom } from 'jotai'

export interface User {
  name?: string
  nickname?: string
  fortuneTime?: string
  fortune?: {
    summary?: string
    tell?: string
    numbers?: string
    colors?: string
    wealth?: string
    health?: string
    studies?: string
    business?: string
    love?: string
    totalScore?: number
    wealthScore?: number
    healthScore?: number
    studiesScore?: number
    businessScore?: number
    loveScore?: number
  }
  code?: string
}

export const responseUser = atom<User>({})
