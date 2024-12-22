'use client'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  return (
    <div className="h-full flex flex-col content-center items-center justify-center">
        <span className="text-neutral-600">2024년 12월 22일</span>
        <span className="text-xl font-bold mb-5">오늘 마음 먹은 때라면 과감히 실행하세요.</span>
        <p className="w-4/5">현재 대운: 丙寅 (2018~2027)

        이 시기는 직업적으로 중요한 시기로, 새로운 사업이나 프로젝트를 시작하기에 적합합니다.
        사람들과의 협업에서 좋은 결과를 얻을 가능성이 높으며, 재물운도 상승세에 있습니다.
        단, 지나친 야망은 피하고 장기적인 목표를 세우는 것이 중요합니다.
        2024년 운세:

        2024년(甲辰): 노력의 결과가 서서히 나타나는 해로, 새로운 기회와 도전이 다가올 것입니다.
        상반기에는 재정적으로 안정적이나 하반기에는 투기성 있는 결정은 피하는 것이 좋습니다.
        </p>
       <Button onClick={() => router.push(`/`)} className="px-20 h-14 text-base mt-5">돌아가기</Button>
    </div>
  );
}
