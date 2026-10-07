import { NextRequest, NextResponse } from "next/server";

// Rate limiting map for lead submissions (max 5 submissions per 15 min per IP)
const leadRateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const MAX_LEADS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = leadRateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    leadRateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (record.count >= MAX_LEADS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "anonymous_ip";

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: "Too many submission attempts. Please reach out directly on WhatsApp." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, projectType, addons, timelineSpeed, estimatedWeeks, notes } = body;

    // 1. Strict validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Valid name or organization required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json({ error: "Valid work email required." }, { status: 400 });
    }

    const leadPayload = {
      name: name.trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 120),
      project_type: String(projectType || "General Web Application").slice(0, 80),
      addons: Array.isArray(addons) ? addons.slice(0, 10) : [],
      velocity: timelineSpeed === "accelerated" ? "Accelerated" : "Standard",
      estimated_weeks: Number(estimatedWeeks) || 3,
      notes: notes ? String(notes).trim().slice(0, 1000) : "No specific requirements provided.",
      ip_address: clientIp,
      created_at: new Date().toISOString(),
    };

    // 2. Optional: Supabase Database Storage
    if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(
          process.env.SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        );
        const { error: dbError } = await supabase.from("leads").insert([leadPayload]);
        if (dbError) console.error("[Leads DB Error]:", dbError);
      } catch (err) {
        console.warn("[Leads DB Sync Skipped]:", err);
      }
    }

    // 3. Optional: Instant Telegram Notification to your phone/team
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      const telegramMessage = `🚀 *NEW INBOUND SCOPE INTAKE*\n\n` +
        `👤 *Client*: ${leadPayload.name}\n` +
        `📧 *Email*: ${leadPayload.email}\n` +
        `🛠 *Project*: ${leadPayload.project_type}\n` +
        `⚡ *Velocity*: ${leadPayload.velocity} (~${leadPayload.estimated_weeks} weeks)\n` +
        `🧩 *Add-ons*: ${leadPayload.addons.join(", ") || "None"}\n\n` +
        `📝 *Brief*:\n${leadPayload.notes}`;

      fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: "Markdown",
        }),
      }).catch((err) => console.warn("[Telegram Notification Skipped]:", err));
    }

    return NextResponse.json(
      {
        success: true,
        message: "Parameters registered successfully. Architecture review initiated.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Leads API Error]:", error);
    return NextResponse.json(
      { error: "Internal processing error. Please connect via WhatsApp." },
      { status: 500 }
    );
  }
}