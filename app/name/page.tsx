"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import "./name.css"

export default function NamePage() {
  const [name, setName] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      alert("닉네임을 입력해주세요!")
      return
    }
    localStorage.setItem("userName", name.trim())
    router.push("/dream")
  }

  return (
    <div className="name-container">
      <h1 className="name-title">닉네임을 입력해주세요</h1>
      <form onSubmit={handleSubmit} className="name-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="최대 10자"
          maxLength={10}
          className="name-input"
        />
        <div className="name-length">{name.length}/10</div>
        <button type="submit" className="name-button" disabled={!name.trim()}>
          다음
        </button>
      </form>
    </div>
  )
}
