import Link from "next/link"
import "./splash.css"
import Image from "next/image"

export default function SplashScreen() {
  return (
    <div className="splash-container">
      {/* 메인 내용 */}
      <div className="splash-content">
        <div className="moon-icon"><Image src="/space.gif" alt="우주 아이콘" width={100} height={100} /></div>
        <h1 className="splash-title">꿈해몽 AI</h1>
        <p className="splash-subtitle">당신의 꿈을 기록하고 해몽해보세요</p>

        <Link href="/name" className="start-button-wrapper">
          <button className="start-button">시작하기</button>
        </Link>
      </div>

      <div className="splash-footer">
        {`Powered by OpenAI | ${new Date().getFullYear()}`}
      </div>
    </div>
  )
}
