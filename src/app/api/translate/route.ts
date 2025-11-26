import { NextRequest, NextResponse } from "next/server"

const GOOGLE_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY || ""

interface TranslateRequest {
  text: string
  targetLanguage: string
  sourceLanguage?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: TranslateRequest = await request.json()
    const { text, targetLanguage, sourceLanguage } = body

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    if (!targetLanguage || typeof targetLanguage !== "string") {
      return NextResponse.json({ error: "Target language is required" }, { status: 400 })
    }

    if (text.length > 2000) {
      return NextResponse.json({ error: "Text is too long (max 2000 characters)" }, { status: 400 })
    }

    if (!GOOGLE_API_KEY) {
      return NextResponse.json({
        translatedText: `[Demo mode - set GOOGLE_TRANSLATE_API_KEY]\n\n${text}`,
        isDemo: true,
      })
    }

    const url = new URL("https://translation.googleapis.com/language/translate/v2")
    url.searchParams.set("key", GOOGLE_API_KEY)

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        target: targetLanguage,
        source: sourceLanguage || undefined,
        format: "text",
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("Google Translate error:", data)
      return NextResponse.json({ error: "Translation failed" }, { status: 502 })
    }

    const translatedText = data.data?.translations?.[0]?.translatedText || text

    return NextResponse.json({
      translatedText: translatedText,
      sourceLanguage: data.data?.translations?.[0]?.detectedSourceLanguage || sourceLanguage,
      targetLanguage: targetLanguage,
    })
  } catch (error) {
    console.error("Translation error:", error)
    return NextResponse.json({ error: "Translation failed" }, { status: 500 })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}