import Image from "next/image";
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="h-full flex flex-col content-center items-center justify-center">
        <span className="text-2xl font-bold">수빈님</span>
        <span className="text-2xl font-bold">오늘도 럭키비키잖아? </span>
        <Image
            className="dark:invert"
            src="/giphy.gif"
            alt="giphy"
            width={300}
            height={300}
          />
       <Button className="px-20 h-14 text-base">오늘의 운세보기</Button>
    </div>
  );
}
