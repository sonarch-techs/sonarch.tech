import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

// In-memory rate-limiter (per IP) to prevent token misuse
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 20; // 20 messages per window

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

// Contact configuration
const WHATSAPP_DISPLAY = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+1 (234) 567-890";
const CONTACT_EMAIL = "team@sonarchtech.com";

// Refined Web Bot System Prompt
const SYSTEM_PROMPT = `You are "Sonar", the friendly, perceptive AI web bot for SONARCHTECH (a modern digital product & web agency).

VIBE & PERSONA:
- You are a modern, smart web bot — NOT an overly technical academic engineer or robot.
- Speak conversationally, warmly, and clearly. Be direct and helpful.
- Understand what the user actually wants and reply like a friendly tech studio concierge.

CORE RULES:
1. PROJECT PLANNING (OVERVIEWS ONLY):
   - When a user shares an idea or asks how to build something, provide ONLY a high-level project overview.
   - Mention: (a) The core concept in 1 sentence, (b) Recommended stack at a glance (e.g., Next.js, Supabase, Tailwind), and (c) Estimated delivery phase (e.g., 2-4 weeks).
   - DO NOT dump long code blocks, architectural essays, or unnecessary technical filler.

2. EXPLICIT CONTACT INFO:
   - If the user asks for contact info, hiring, pricing, talking to a human, or how to get started, EXPLICITLY provide:
     • WhatsApp: Direct chat via the floating green button or ${WHATSAPP_DISPLAY}
     • Email: ${CONTACT_EMAIL}
     • Discovery Form: The "Book Discovery" section below on this page (#contact)

3. STRICT DOMAIN GUARDRAILS:
   - ONLY discuss topics within our agency domain: web applications, digital products, UI/UX design, modern tech stacks, automation workflows, and SONARCHTECH services.
   - If the user asks ANYTHING outside this domain (e.g. homework, politics, recipes, general trivia, gaming, unrelated code), politely refuse:
     "I'm dedicated specifically to helping you plan digital products and web projects for SONARCHTECH! Tell me about an idea or website you'd like to build."

4. JSON OUTPUT FORMAT:
You MUST respond with a strictly valid JSON object matching this schema:
{
  "message": "Your conversational, direct answer (max 2-3 short sentences).",
  "keyPoints": ["High-level feature or project highlight 1", "Highlight 2"],
  "suggestedReplies": ["Quick suggestion 1", "Quick suggestion 2"]
}
Never output more than 2 keyPoints and 3 suggestedReplies. Output raw JSON only.`;

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
  "mixtral",
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

    const textModels = allModelIds.filter((id: string) => {
      const lower = id.toLowerCase();
      return !NON_TEXT_KEYWORDS.some((kw) => lower.includes(kw));
    });

    const sorted: string[] = [];
    for (const fam of PRIORITY_FAMILIES) {
      for (const model of textModels) {
        if (model.toLowerCase().includes(fam) && !sorted.includes(model)) {
          sorted.push(model);
        }
      }
    }

    for (const model of textModels) {
      if (!sorted.includes(model)) {
        sorted.push(model);
      }
    }

    return sorted.length > 0 ? sorted : ["llama3-8b-8192"];
  } catch {
    return ["llama3-8b-8192", "llama-3.1-8b-instant", "llama-3.3-70b-versatile"];
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
      suggestedReplies: ["Plan a project", "Get contact info"],
    };
  }
}

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
            "Rate limit reached. Feel free to connect directly with us on WhatsApp!",
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

    // Token optimization: Keep last 4 messages, capped to 300 chars each
    const trimmedHistory = messages.slice(-4).map((msg: { role: string; content: string }) => ({
      role: msg.role === "user" ? ("user" as const) : ("assistant" as const),
      content: String(msg.content).slice(0, 300).trim(),
    }));

    const candidates = await getCandidateModels();

    let completion = null;

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
          max_tokens: 280,
        });

        cachedWorkingModel = model;
        break;
      } catch (err: any) {
        if (err?.error?.code === "invalid_request_error" && err?.message?.includes("response_format")) {
          try {
            completion = await groq.chat.completions.create({
              model,
              messages: [
                { role: "system", content: SYSTEM_PROMPT },
                ...trimmedHistory,
              ],
              temperature: 0.4,
              max_tokens: 280,
            });
            cachedWorkingModel = model;
            break;
          } catch {}
        }
      }
    }

    if (!completion) {
      throw new Error("Chat model temporarily unavailable.");
    }

    const rawContent = completion.choices[0]?.message?.content || "{}";
    const parsedData = parseJsonSafely(rawContent);

    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error("Groq Chat Error:", error);
    return NextResponse.json(
      {
        message: `I'm having a quick connection hiccup! Reach us directly on WhatsApp or email ${CONTACT_EMAIL}.`,
        keyPoints: ["Direct WhatsApp available", "Email response in <2 hrs"],
        suggestedReplies: ["Contact details", "Book discovery"],
      },
      { status: 200 }
    );
  }
}