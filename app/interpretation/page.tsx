"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { Home, MoonStar, Sparkles } from "lucide-react"

type DreamData = {
  date: string
  mood: string
  content: string
  userName: string
  interpretation?: string // ✨ 해몽 결과도 받기!
}

export default function InterpretationScreen() {
  const [dreamData, setDreamData] = useState<DreamData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const storedDream = localStorage.getItem("currentDream")

    if (storedDream) {
      const parsed = JSON.parse(storedDream)
      setDreamData(parsed)
      setLoading(false)
    } else {
      router.push("/dream")
    }
  }, [router])

  const goToHome = () => {
    router.push("/")
  }

  if (!dreamData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-950 to-purple-900 text-white">
        <div className="text-center">
          <MoonStar className="h-12 w-12 text-purple-300 mx-auto animate-pulse" />
          <p className="mt-4">꿈 데이터를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-950 to-purple-900 text-white p-4">
      <div className="max-w-md mx-auto w-full py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-purple-700/30 p-4 rounded-full">
              <Sparkles className="h-12 w-12 text-yellow-300" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">꿈 해몽 결과</h1>
          <p className="text-purple-200 mt-2">{dreamData.userName}님의 꿈을 해석했어요</p>
        </div>

        {/* 1. 사용자가 입력한 정보 */}
        <Card className="mb-6 bg-purple-800/30 border-purple-600 text-white">
          <CardContent className="p-4 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-purple-300">꿈을 꾼 날짜</h3>
              <p>{format(new Date(dreamData.date), "PPP", { locale: ko })}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-purple-300">꿈에서 느낀 기분</h3>
              <p className="flex items-center text-2xl">{dreamData.mood}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-purple-300">꿈 내용</h3>
              <p className="whitespace-pre-wrap text-sm">{dreamData.content}</p>
            </div>
          </CardContent>
        </Card>

        {/* 2. AI 해몽 결과 표시 */}
        <Card className="mb-6 bg-gradient-to-br from-purple-700/40 to-indigo-700/40 border-purple-500 text-white">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <MoonStar className="h-5 w-5 mr-2 text-yellow-300" />
              AI 해몽 결과
            </h2>

            {loading ? (
              <div className="py-8 text-center space-y-4">
                <div className="flex justify-center">
                  <div className="animate-spin h-8 w-8 border-4 border-purple-300 rounded-full border-t-transparent"></div>
                </div>
                <p className="text-purple-200">해몽 결과를 불러오고 있어요...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-purple-100 whitespace-pre-wrap">
                  {dreamData.interpretation || "해몽 결과를 가져오지 못했습니다."}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 3. 홈으로 가기 버튼 */}
        <Button
          onClick={goToHome}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
        >
          <Home className="mr-2 h-5 w-5" />
          홈으로 가기
        </Button>
      </div>
    </div>
  )
}
