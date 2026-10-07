import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

// In-memory rate-limiter (per IP)
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

// Blacklist non-text / audio / guard / terms-restricted models
const NON_TEXT_KEYWORDS = [
  "orpheus",
  "canopylabs",
  "whisper",
  "guard",
  "audio",
  "tts",
  "speech",
  "embed",
  "vision",
  "moderation",
];

// Priority rankings for chat completion
const PRIORITY_FAMILIES = [
  "llama-3.3",
  "llama-3.2",
  "llama-3.1",
  "llama3",
  "llama",
  "qwen",
  "deepseek",
  "gemma-2",
  "gemma2",
  "gemma",
  "mixtral",
  "mistral",
];

let cachedWorkingModel: string | null = null;

async function getCandidateModels(): Promise<string[]> {
  if (process.env.GROQ_MODEL) {
    return [process.env.GROQ_MODEL];
  }

  if (cachedWorkingModel) {
    return [cachedWorkingModel];
  }

  try {
    const list = await groq.models.list();
    const allModelIds = (list.data || []).map((m: any) => m.id);

    // Filter to purely chat/text models
    const textModels = allModelIds.filter((id: string) => {
      const lower = id.toLowerCase();
      return !NON_TEXT_KEYWORDS.some((kw) => lower.includes(kw));
    });

    console.log("[Groq AI] Detected eligible text models on your key:", textModels);

    // Sort by preferred family
    const sorted: string[] = [];
    for (const fam of PRIORITY_FAMILIES) {
      for (const model of textModels) {
        if (model.toLowerCase().includes(fam) && !sorted.includes(model)) {
          sorted.push(model);
        }
      }
    }

    // Append any remaining text models
    for (const model of textModels) {
      if (!sorted.includes(model)) {
        sorted.push(model);
      }
    }

    return sorted.length > 0 ? sorted : ["llama3-8b-8192"];
  } catch (err) {
    console.warn("[Groq AI] Could not fetch models list:", err);
    return ["llama3-8b-8192", "llama-3.1-8b-instant", "llama3-70b-8192"];
  }
}

function parseJsonSafely(content: string) {
  try {
    const cleaned = content.replace(/```json\n?|\n?```/g, "").trim();
    return JSON.parse(cleaned);
  } catch {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch {}
    }
    return {
      message: content.replace(/```json\n?|\n?```/g, "").trim(),
      keyPoints: [],
      suggestedReplies: ["Explore Services", "Book Discovery"],
    };
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Groq API key not configured in .env.local" },
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
            "Rate limit exceeded. Please wait a few minutes or reach out directly on WhatsApp.",
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

    // Token optimization: Slice last 4 messages and cap each at 300 characters
    const trimmedHistory = messages.slice(-4).map((msg: { role: string; content: string }) => ({
      role: msg.role === "user" ? ("user" as const) : ("assistant" as const),
      content: String(msg.content).slice(0, 300).trim(),
    }));

    const candidates = await getCandidateModels();

    let completion = null;
    let successfulModel = "";

    // Candidate iteration loop: automatically skip terms-restricted or missing models
    for (const model of candidates) {
      try {
        completion = await groq.chat.completions.create({
          model,
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...trimmedHistory,
          ],
          temperature: 0.4,
          max_tokens: 300,
        });

        successfulModel = model;
        cachedWorkingModel = model;
        console.log(`[Groq AI] Successfully answered with model: ${model}`);
        break;
      } catch (err: any) {
        // If JSON mode is rejected by the model, try one more time without json_object constraint
        if (err?.error?.code === "invalid_request_error" && err?.message?.includes("response_format")) {
          try {
            completion = await groq.chat.completions.create({
              model,
              messages: [
                { role: "system", content: SYSTEM_PROMPT },
                ...trimmedHistory,
              ],
              temperature: 0.4,
              max_tokens: 300,
            });
            successfulModel = model;
            cachedWorkingModel = model;
            break;
          } catch {}
        }

        console.warn(`[Groq AI] Model "${model}" unavailable (${err?.error?.code || err?.message}). Trying next candidate...`);
      }
    }

    if (!completion) {
      throw new Error("No accessible chat models responded on this Groq API key.");
    }

    const rawContent = completion.choices[0]?.message?.content || "{}";
    const parsedData = parseJsonSafely(rawContent);

    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error("Groq Chat API Final Error:", error);
    return NextResponse.json(
      {
        message: "We're experiencing a brief API sync. Please connect with us directly on WhatsApp or book a discovery call.",
        keyPoints: ["Direct WhatsApp available", "Instant project intake"],
        suggestedReplies: ["Connect on WhatsApp", "Explore Services"],
      },
      { status: 200 }
    );
  }
}