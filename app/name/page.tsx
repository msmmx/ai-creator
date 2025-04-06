"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import "./name.css"

export default function NamePage() {
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
    <div className="name-container">
      <button className="back-button" onClick={() => router.back()}>
        ← 뒤로
      </button>
      <div className="name-card">
        <h1>닉네임을 입력해주세요</h1>
        <p>꿈 해몽 결과에 사용될 닉네임을 입력해주세요</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            maxLength={10}
            onChange={(e) => setName(e.target.value)}
            placeholder="닉네임 (최대 10자)"
            required
          />
          <div className="char-count">{name.length}/10</div>
          <button type="submit" disabled={!name.trim()}>
            다음
          </button>
        </form>
      </div>
    </div>
  )
}
