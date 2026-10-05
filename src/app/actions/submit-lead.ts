"use server";

import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const leadSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please provide a valid business email"),
  companyName: z.string().optional(),
  services: z.array(z.string()).min(1, "Select at least one service"),
  budgetRange: z.string().min(1, "Select a target investment range"),
  projectDetails: z.string().min(10, "Please provide brief project details (min 10 chars)"),
  // Invisible Bot Defenses
  botField: z.string().optional(), // Honeypot
  formRenderTime: z.number().optional(), // Time-trap
});

export type LeadInput = z.infer<typeof leadSchema>;

export async function submitLeadAction(data: LeadInput) {
  try {
    const validatedData = leadSchema.parse(data);

    // 1. Silent Bot Traps
    // Trap A: Honeypot field filled
    if (validatedData.botField && validatedData.botField.trim() !== "") {
      console.warn("[Bot Defense] Honeypot triggered. Silently dropping payload.");
      return { success: true }; // Return fake success to prevent bot retry
    }

    // Trap B: Form submitted in under 2.5 seconds
    if (validatedData.formRenderTime) {
      const elapsedSeconds = (Date.now() - validatedData.formRenderTime) / 1000;
      if (elapsedSeconds < 2.5) {
        console.warn(`[Bot Defense] Inhuman submission speed (${elapsedSeconds.toFixed(2)}s). Dropping.`);
        return { success: true };
      }
    }

    // 2. Initialize Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return { success: false, error: "Database configuration missing." };
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    });

    // 3. Database Insertion
    const { error: dbError } = await supabase.from("leads").insert([
      {
        full_name: validatedData.fullName,
        email: validatedData.email,
        company_name: validatedData.companyName || null,
        service_category: validatedData.services.join(", "),
        budget_range: validatedData.budgetRange,
        project_details: validatedData.projectDetails,
        status: "new",
      },
    ]);

    if (dbError) {
      console.error("[submitLeadAction] Supabase error:", dbError);
      return { success: false, error: `Database error: ${dbError.message}` };
    }

    // 4. Automated Resend Email Pipeline
    const resendApiKey = process.env.RESEND_API_KEY;
    const agencyEmail = process.env.AGENCY_NOTIFICATION_EMAIL || "sonarchtechs@gmail.com";
    const customFromDomain = process.env.RESEND_FROM_EMAIL;

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const fromAddress = customFromDomain || "SONARCHTECH <onboarding@resend.dev>";
      const isSandbox = !customFromDomain || fromAddress.includes("onboarding@resend.dev");

      // Founder Alert
      try {
        await resend.emails.send({
          from: fromAddress,
          to: agencyEmail,
          subject: `⚡ New Enterprise Lead: ${validatedData.fullName} (${validatedData.budgetRange})`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #040404; color: #ffffff; padding: 28px; border-radius: 12px; border: 1px solid #1f1f1f;">
              <h2 style="color: #00c896; margin-top: 0;">Inbound Scope Transmitted</h2>
              <hr style="border: 0; border-top: 1px solid #1f1f1f; margin: 18px 0;" />
              <p><strong>Client Name:</strong> ${validatedData.fullName}</p>
              <p><strong>Email:</strong> <a href="mailto:${validatedData.email}" style="color: #00c896;">${validatedData.email}</a></p>
              <p><strong>Company / Domain:</strong> ${validatedData.companyName || "N/A"}</p>
              <p><strong>Target Capabilities:</strong> ${validatedData.services.join(", ")}</p>
              <p><strong>Investment Range:</strong> <span style="background: #1f1f1f; padding: 2px 8px; border-radius: 4px; color: #00c896;">${validatedData.budgetRange}</span></p>
              <div style="margin-top: 20px; padding: 16px; background-color: #1f1f1f; border-radius: 8px;">
                <strong>Project Objectives:</strong>
                <p style="color: #d4d4d4; margin-top: 6px; white-space: pre-wrap;">${validatedData.projectDetails}</p>
              </div>
            </div>
          `,
        });
      } catch (err) {
        console.error("[submitLeadAction] Founder notification error:", err);
      }

      // Client Auto-Responder
      const canSendToClient = !isSandbox || validatedData.email.toLowerCase() === agencyEmail.toLowerCase();
      if (canSendToClient) {
        try {
          await resend.emails.send({
            from: fromAddress,
            to: validatedData.email,
            subject: "Your Project Architecture Scope Has Been Received // SONARCHTECH",
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #040404; color: #f5f5f5; padding: 32px; border-radius: 12px; border: 1px solid #1f1f1f; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #ffffff; margin-top: 0; font-weight: 700;">Scope Transmitted Successfully</h2>
                <p style="color: #a3a3a3; font-size: 15px; line-height: 1.6;">Hello ${validatedData.fullName},</p>
                <p style="color: #a3a3a3; font-size: 15px; line-height: 1.6;">
                  Thank you for submitting your project parameters for <strong>${validatedData.services.join(", ")}</strong>. Our systems engineering team has received your brief and is evaluating initial technical architecture requirements.
                </p>
                <div style="margin: 24px 0; padding: 18px; border-left: 3px solid #00c896; background-color: #1f1f1f; border-radius: 4px;">
                  <p style="margin: 0; color: #ffffff; font-size: 14px;"><strong>Next Protocol Milestone:</strong></p>
                  <p style="margin: 6px 0 0 0; color: #a3a3a3; font-size: 14px;">A technical partner will review your requirements and reach out within 24 hours with architectural recommendations.</p>
                </div>
                <p style="color: #737373; font-size: 12px; margin-top: 32px; border-top: 1px solid #1f1f1f; padding-top: 16px;">
                  SONARCHTECH // High-Performance Systems, Web Apps & AEO Engine Architecture
                </p>
              </div>
            `,
          });
        } catch (err) {
          console.error("[submitLeadAction] Client auto-responder error:", err);
        }
      }
    }

    return { success: true };
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return { success: false, error: err.issues[0]?.message || "Validation failed." };
    }
    const message = err instanceof Error ? err.message : "An unexpected error occurred.";
    return { success: false, error: message };
  }
}