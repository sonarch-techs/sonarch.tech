"use server";

import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// Initialize high-privilege client on the server
function getAdminSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !serviceKey) {
    throw new Error("Missing Supabase credentials for admin access.");
  }

  return createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });
}

// Check session cookie
export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("sonarch_admin_token")?.value;
  const adminSecret = process.env.ADMIN_SECRET_KEY || "sonarch_admin_secret_2026";
  return token === adminSecret;
}

// Login verification
export async function loginAdminAction(passcode: string) {
  const adminSecret = process.env.ADMIN_SECRET_KEY || "sonarch_admin_secret_2026";
  if (passcode === adminSecret) {
    const cookieStore = await cookies();
    cookieStore.set("sonarch_admin_token", adminSecret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
      sameSite: "lax",
    });
    return { success: true };
  }
  return { success: false, error: "Invalid admin authentication key." };
}

// Logout action
export async function logoutAdminAction() {
  const cookieStore = await cookies();
  cookieStore.delete("sonarch_admin_token");
  return { success: true };
}

// Fetch leads from Supabase
export async function getLeadsAction() {
  const isAuthenticated = await verifyAdminSession();
  if (!isAuthenticated) {
    return { success: false, error: "Unauthorized access.", leads: [] };
  }

  try {
    const supabase = getAdminSupabaseClient();
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return { success: false, error: error.message, leads: [] };
    }

    return { success: true, leads: data || [] };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to load leads.";
    return { success: false, error: msg, leads: [] };
  }
}

// Update lead status (e.g. new -> contacted -> qualified -> closed)
export async function updateLeadStatusAction(leadId: string, newStatus: string) {
  const isAuthenticated = await verifyAdminSession();
  if (!isAuthenticated) {
    return { success: false, error: "Unauthorized access." };
  }

  try {
    const supabase = getAdminSupabaseClient();
    const { error } = await supabase
      .from("leads")
      .update({ status: newStatus })
      .eq("id", leadId);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/admin");
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update status.";
    return { success: false, error: msg };
  }
}