import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log("📥 받은 데이터:", body)

    // content로 온 값을 dreamContent로 받기
    const { content: dreamContent, mood, userName } = body

    // 필수 입력값 확인
    if (!dreamContent || !mood || !userName) {
      return NextResponse.json({ error: "입력값 부족" }, { status: 400 })
    }

    // OpenAI API 호출
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "너는 사용자의 꿈을 친절하게 해석해주는 해몽 AI야.",
        },
        {
          role: "user",
          content: `꿈 내용: ${dreamContent}, 기분: ${mood}, 사용자 이름: ${userName} 해몽 부탁해.`,
        },
      ],
    })

    const result = completion.choices[0]?.message?.content

    return NextResponse.json({
      interpretation: result,
    })
  } catch (error) {
    console.error("🔴 OpenAI 호출 에러:", error)
    return NextResponse.json({ error: "해몽 실패" }, { status: 500 })
  }
}
