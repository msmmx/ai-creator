"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import "./interpret.css"

export default function InterpretationPage() {
  const router = useRouter()
  const [dream, setDream] = useState<any>(null)

  useEffect(() => {
    const stored = localStorage.getItem("currentDream")
    if (stored) {
      setDream(JSON.parse(stored))
    } else {
      router.push("/dream")
    }
  }, [router])

  if (!dream) return null

  return (
    <div className="interpret-container">
      <div className="interpret-box">
        <h1 className="interpret-title">해몽 결과</h1>
        <p className="interpret-name">👤 {dream.userName} 님의 꿈</p>
        <p className="interpret-date">📅 {new Date(dream.date).toLocaleDateString("ko-KR")}</p>
        <p className="interpret-mood">😊 기분: {dream.mood}</p>

        <div className="interpret-section">
          <h2>🌙 꿈 내용</h2>
          <p>{dream.content}</p>
        </div>

        <div className="interpret-section">
          <h2>🔮 AI 해몽</h2>
          <p>{dream.interpretation}</p>
        </div>

        <div className="interpret-buttons">
          <Link href="/dream">
            <button className="btn">다시 기록하기</button>
          </Link>
          <Link href="/">
            <button className="btn">홈으로</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
