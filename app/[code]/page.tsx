import { type Params } from '@/app/api/users/[code]/route'

import { MainPageClient } from './mainPageClient'

export default async function Home({ params }: { params: Promise<Params> }) {
  const { code } = await params

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <MainPageClient code={code} />
    </div>
  )
}
