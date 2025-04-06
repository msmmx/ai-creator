import { NextResponse } from "next/server"
import OpenAI from "openai"

// 🔐 환경변수에 저장된 OpenAI API 키를 사용합니다
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// POST 요청 처리
export async function POST(req: Request) {
  try {
    const { dreamContent, mood, userName } = await req.json()

    // 필수 입력값 확인
    if (!dreamContent || !mood || !userName) {
      return NextResponse.json({ error: "입력값 부족" }, { status: 400 })
    }

    // 🔥 OpenAI API 호출
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "너는 사용자의 꿈을 친절하고 공감 가게 해석해주는 AI야. 부드러운 말투로 해몽해줘.",
        },
        {
          role: "user",
          content: `꿈 내용: ${dreamContent}\n기분: ${mood}\n사용자 이름: ${userName}\n이 꿈을 해몽해줘.`,
        },
      ],
    })

    const result = completion.choices[0]?.message?.content

    return NextResponse.json({ interpretation: result })
  } catch (error) {
    console.error("🔴 OpenAI 호출 에러:", error)
    return NextResponse.json({ error: "해몽 실패" }, { status: 500 })
  }
}
