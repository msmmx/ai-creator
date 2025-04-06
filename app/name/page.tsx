"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserRound } from "lucide-react"

export default function NameInputScreen() {
  const [name, setName] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      localStorage.setItem("userName", name.trim())
      router.push("/dream")
    }
  }

  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-b from-indigo-950 to-purple-900 text-white p-4">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 text-purple-300 hover:text-white transition-colors z-10"
      >
        ← 뒤로
      </button>

      <div className="flex flex-col items-center justify-center flex-1">
        <div className="text-center space-y-4 mb-8">
          <div className="flex justify-center">
            <div className="bg-purple-700/30 p-4 rounded-full">
              <UserRound className="h-12 w-12 text-purple-200" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">닉네임을 입력해주세요</h1>
          <p className="text-purple-200">꿈 해몽 결과에 사용될 닉네임을 입력해주세요</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 w-80">
          <div className="space-y-2">
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={10}
              placeholder="닉네임 (최대 10자)"
              className="w-full h-16 bg-purple-800/30 border-purple-600 text-white placeholder:text-purple-300 h-14 text-base"
            />
            <div className="text-right text-sm text-purple-300">{name.length}/10</div>
          </div>

          <Button
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            다음
          </Button>
        </form>
      </div>
    </div>
  )
}
