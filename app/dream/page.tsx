"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { CalendarIcon, BookOpen } from "lucide-react"

type Mood = {
  emoji: string
  label: string
}

const moods: Mood[] = [
  { emoji: "😊", label: "행복해요 / 설레요" },
  { emoji: "😔", label: "우울해요" },
  { emoji: "😡", label: "화가 나요" },
  { emoji: "😳", label: "창피해요 / 민망해요" },
  { emoji: "😢", label: "슬퍼요" },
  { emoji: "😆", label: "신나요 / 흥분돼요" },
  { emoji: "😐", label: "그냥 그래요 / 평범해요" },
  { emoji: "😨", label: "불안해요" },
  { emoji: "😱", label: "무서웠어요" },
  { emoji: "🤔", label: "혼란스러워요" },
  { emoji: "😍", label: "사랑스러워요" },
  { emoji: "😌", label: "편안해요" },
  { emoji: "😴", label: "피곤해요" },
]

export default function DreamRecordScreen() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [mood, setMood] = useState<string>("")
  const [dreamContent, setDreamContent] = useState("")
  const [userName, setUserName] = useState("")
  const router = useRouter()

  useEffect(() => {
    const storedName = localStorage.getItem("userName")
    if (storedName) {
      setUserName(storedName)
    } else {
      router.push("/name")
    }
  }, [router])

  // ✅ 여기를 async로 바꿔줘야 함!
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!date || !mood || !dreamContent.trim()) return

    const dreamData = {
      date: date.toISOString(),
      mood,
      content: dreamContent.trim(),
      userName,
    }

    try {
      const response = await fetch('/api/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dreamContent: dreamContent.trim(),
          mood,
          userName,
        }),
      })

      const data = await response.json()

      if (!data.interpretation) {
        alert("AI 해몽 결과를 가져오지 못했습니다.")
        return
      }

      localStorage.setItem("currentDream", JSON.stringify({
        ...dreamData,
        interpretation: data.interpretation
      }))

      router.push("/interpretation")
    } catch (error) {
      alert("API 호출 중 오류 발생!")
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-950 to-purple-900 text-white p-4">
      <div className="max-w-md mx-auto w-full py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-purple-700/30 p-4 rounded-full">
              <BookOpen className="h-12 w-12 text-purple-200" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">꿈 기록하기</h1>
          <p className="text-purple-200 mt-2">{userName}님의 꿈을 기록해주세요</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* 1. 날짜 선택 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-purple-200">꿈을 꾼 날짜</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-purple-800/30 border-purple-600 text-white hover:bg-purple-700/50"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP", { locale: ko }) : <span>날짜 선택</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-purple-800 border-purple-600">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  locale={ko}
                  className="bg-purple-800 text-white"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* 2. 기분 선택 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-purple-200">꿈에서 느낀 기분</label>
            <Select onValueChange={setMood} value={mood}>
              <SelectTrigger className="w-full bg-purple-800/30 border-purple-600 text-white">
                <SelectValue placeholder="기분을 선택해주세요" />
              </SelectTrigger>
              <SelectContent className="bg-purple-800 border-purple-600 text-white">
                {moods.map((moodOption) => (
                  <SelectItem
                    key={moodOption.emoji}
                    value={moodOption.emoji}
                    className="focus:bg-purple-700 focus:text-white"
                  >
                    <div className="flex items-center">
                      <span className="mr-2 text-xl">{moodOption.emoji}</span>
                      <span>{moodOption.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 3. 꿈 내용 입력 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-purple-200">꿈 내용</label>
            <Textarea
              value={dreamContent}
              onChange={(e) => setDreamContent(e.target.value)}
              maxLength={300}
              placeholder="꿈에서 어떤 일이 있었나요? (최대 300자)"
              className="min-h-[150px] bg-purple-800/30 border-purple-600 text-white placeholder:text-purple-300"
            />
            <div className="text-right text-sm text-purple-300">{dreamContent.length}/300</div>
          </div>

          {/* 4. 해몽하기 버튼 */}
          <Button
            type="submit"
            disabled={!date || !mood || !dreamContent.trim()}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            해몽하기
          </Button>
        </form>
      </div>

      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 text-purple-300 hover:text-white transition-colors"
      >
        ← 뒤로
      </button>
    </div>
  )
}
