"use server";

import { redirect } from "next/navigation";
import { createSessionClient } from "@/lib/supabase/session";

export async function login(formData) {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    redirect(`/admin/login?error=${encodeURIComponent("Email dan password wajib diisi.")}`);
  }

  let errorMessage = null;

  try {
    const supabase = await createSessionClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Email atau password salah. Silakan coba lagi.";
      } else {
        errorMessage = error.message;
      }
    }
  } catch (err) {
    errorMessage = err.message || "Terjadi kesalahan saat memproses login.";
  }

  if (errorMessage) {
    redirect(`/admin/login?error=${encodeURIComponent(errorMessage)}`);
  }

  redirect("/admin");
}

export async function keluar() {
  try {
    const supabase = await createSessionClient();
    await supabase.auth.signOut();
  } catch {
    // Abaikan error saat proses keluar
  }

  redirect("/admin/login");
}

export const logout = keluar;

