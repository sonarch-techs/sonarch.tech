import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

// In-memory rate-limiter (per IP) to prevent token abuse
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 15; // Max 15 messages per 10 mins

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

const SYSTEM_PROMPT = `You are the AI Systems Architect for SONARCHTECH, an elite agency engineering high-performance digital products, Next.js web applications, autonomous automation pipelines, Supabase architecture, and Answer Engine Optimization (AEO).

OUTPUT FORMAT:
You MUST respond with a strictly valid JSON object matching this schema:
{
  "message": "Clear, concise direct answer tailored to their project needs (max 2-3 short sentences).",
  "keyPoints": ["Optional key architectural advantage or recommendation", "Optional second point"],
  "suggestedReplies": ["Quick follow-up question 1", "Quick follow-up question 2"]
}

POLICIES:
1. Scope: Only discuss digital product development, tech stacks (Next.js, Three.js, Supabase, Tailwind), AEO, timeline estimates, and agency workflows.
2. Refusals: Politely refuse off-topic prompts (homework, general trivia, unrelated code). Keep responses focused on SONARCHTECH architecture.
3. Token Conservation: Keep "message" compact and crisp. Never output more than 2 keyPoints and 2 suggestedReplies.
4. Output raw JSON only. Do not wrap in markdown code blocks like \`\`\`json.`;

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Groq API key not configured." },
        { status: 500 }
      );
    }

    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "anonymous_client";

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          error:
            "Rate limit exceeded. Please wait a few minutes or message us directly on WhatsApp.",
        },
        { status: 429 }
      );
    }

    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid message payload." },
        { status: 400 }
      );
    }

    const trimmedHistory = messages.slice(-4).map((msg: { role: string; content: string }) => ({
      role: msg.role === "user" ? ("user" as const) : ("assistant" as const),
      content: String(msg.content).slice(0, 300).trim(),
    }));

    // Groq model supporting native JSON Mode
    const modelToUse = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

    const completion = await groq.chat.completions.create({
      model: modelToUse,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...trimmedHistory,
      ],
      temperature: 0.4,
      max_tokens: 300,
    });

    const rawContent = completion.choices[0]?.message?.content || "{}";

    let parsedData;
    try {
      parsedData = JSON.parse(rawContent);
    } catch {
      parsedData = {
        message: rawContent,
        keyPoints: [],
        suggestedReplies: ["Explore Services", "Book Discovery"],
      };
    }

    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error("Groq Chat API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Assistant temporary outage. Please try again shortly." },
      { status: 500 }
    );
  }
}