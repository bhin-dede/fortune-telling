import { atom } from 'jotai'

export interface User {
  _id?: string
  name?: string
  nickname?: string
  birth?: string
  birthTime?: string
  gender?: string
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
  nfcId?: string
}

export const responseUser = atom<User | null>(null)
