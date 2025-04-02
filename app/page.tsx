"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MoonStar } from "lucide-react"

export default function SplashScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-6 relative overflow-hidden">

      {/* 빛나는 별 배경 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(249,40%,15%)] to-[hsl(249,40%,10%)] opacity-80"></div>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,hsl(280,60%,40%)_0%,transparent_60%)] opacity-20"></div>

      {/* 메인 내용 */}
      <div className="z-10 flex flex-col items-center justify-center space-y-8 max-w-md text-center">
        <div className="animate-float">
          <MoonStar className="h-28 w-28 text-secondary drop-shadow-xl" />
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight drop-shadow-md">꿈해몽 AI</h1>
        <p className="text-lg text-muted-foreground">당신의 꿈을 기록하고 해몽해보세요</p>

        <Link href="/name" className="w-full max-w-xs">
          <Button className="w-full bg-primary text-primary-foreground hover:brightness-110 py-5 text-lg rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl font-semibold">
            시작하기
          </Button>
        </Link>
      </div>

      {/* footer */}
      <div className="absolute bottom-6 text-muted-foreground text-sm z-10">
        {`Powered by OpenAI | ${new Date().getFullYear()}`}
      </div>
    </div>
  )
}
