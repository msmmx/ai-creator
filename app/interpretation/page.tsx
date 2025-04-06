"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import html2canvas from "html2canvas"
import "./interpret.css"

export default function InterpretationPage() {
  const router = useRouter()
  const [dream, setDream] = useState<any>(null)
  const captureRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stored = localStorage.getItem("currentDream")
    if (stored) {
      setDream(JSON.parse(stored))
    } else {
      router.push("/dream")
    }
  }, [router])

  const handleDownload = async () => {
    if (!captureRef.current) return
    const canvas = await html2canvas(captureRef.current)
    const dataUrl = canvas.toDataURL("image/png")

    const link = document.createElement("a")
    link.href = dataUrl
    link.download = `${dream?.userName}_꿈해몽.png`
    link.click()
  }

  if (!dream) return null

  return (
    <div className="interpret-container">
      <div className="interpret-box" ref={captureRef}>
        <h1 className="interpret-title">🔮 해몽 결과</h1>
        <p className="interpret-name">👤 {dream.userName} 님의 꿈</p>
        <p className="interpret-date">📅 {new Date(dream.date).toLocaleDateString("ko-KR")}</p>
        <p className="interpret-mood">😊 기분: {dream.mood}</p>

        <div className="interpret-section">
          <h2>🌙 꿈 내용</h2>
          <p>{dream.dreamContent}</p>
        </div>

        <div className="interpret-section">
          <h2>💬 AI 해몽</h2>
          <p>{dream.interpretation}</p>
        </div>
      </div>

      <div className="interpret-buttons">
        <button className="btn" onClick={handleDownload}>이미지 저장</button>
        <Link href="/">
          <button className="btn">홈으로</button>
        </Link>
      </div>
    </div>
  )
}
