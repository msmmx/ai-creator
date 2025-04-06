"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import "./dream.css"

export default function DreamPage() {
  const [dreamContent, setDreamContent] = useState("")
  const [mood, setMood] = useState("")
  const [date, setDate] = useState("")
  const [userName, setUserName] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const storedName = localStorage.getItem("userName")
    if (storedName) {
      setUserName(storedName)
    } else {
      router.push("/name")
    }

    const today = new Date().toISOString().split("T")[0]
    setDate(today)
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!dreamContent || !mood || !date) {
      alert("모든 항목을 입력해주세요")
      return
    }

    const dreamData = {
      content: dreamContent,
      mood,
      date,
      userName,
    }

    try {
      setLoading(true)

      const response = await fetch("/api/interpret", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dreamData),
      })

      const data = await response.json()
      setLoading(false)

      if (!data.interpretation) {
        alert("AI 해몽을 받아오지 못했어요. 다시 시도해주세요!")
        return
      }

      localStorage.setItem(
        "currentDream",
        JSON.stringify({ ...dreamData, interpretation: data.interpretation })
      )

      router.push("/interpretation")
    } catch (err) {
      setLoading(false)
      alert("해몽 요청 중 오류가 발생했어요. 다시 시도해주세요.")
      console.error(err)
    }
  }

  return (
    <div className="dream-container">
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
        <Image src="/duck.gif" alt="꿈 아이콘" width={80} height={80} />
      </div>

      <h1 className="dream-title">{userName} 님의 꿈을 기록해주세요!</h1>

      <form onSubmit={handleSubmit} className="dream-form">
        <div className="form-group">
          <label>📅 날짜를 선택해주세요</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="dream-input"
          />
        </div>

        <div className="form-group">
          <label>😊 오늘의 기분은 어땠나요?</label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="dream-input"
          >
            <option value="">-- 기분을 선택해주세요 --</option>
            <option value="😊 행복해요 / 설레요">😊 행복해요 / 설레요</option>
            <option value="😔 우울해요">😔 우울해요</option>
            <option value="😡 화가 나요">😡 화가 나요</option>
            <option value="😱 무서웠어요">😱 무서웠어요</option>
            <option value="😌 편안해요">😌 편안해요</option>
            <option value="🤔 혼란스러워요">🤔 혼란스러워요</option>
            <option value="😆 신나요 / 흥분돼요">😆 신나요 / 흥분돼요</option>
            <option value="😐 그냥 그래요">😐 그냥 그래요</option>
          </select>
        </div>

        <div className="form-group">
          <label>🌙 꿈 내용을 기록해주세요</label>
          <textarea
            value={dreamContent}
            onChange={(e) => setDreamContent(e.target.value)}
            className="dream-textarea"
            rows={6}
            placeholder="꿈에서 어떤 일이 있었나요?"
          />
        </div>

        <button type="submit" className="dream-button" disabled={loading}>
          {loading ? "해몽 중..." : "해몽하기"}
        </button>
      </form>
    </div>
  )
}
