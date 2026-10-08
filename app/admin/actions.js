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

export async function requireAdmin() {
  const supabase = await createSessionClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect(`/admin/login?error=${encodeURIComponent("Silakan login terlebih dahulu.")}`);
  }

  return { supabase, user };
}

export async function gantiPassword(formData) {
  const { supabase } = await requireAdmin();

  const passwordBaru = formData.get("password_baru")?.toString() || "";
  const konfirmasiPassword = formData.get("konfirmasi_password")?.toString() || "";

  if (!passwordBaru || !konfirmasiPassword) {
    redirect(`/admin/password?error=${encodeURIComponent("Semua kolom wajib diisi.")}`);
  }

  if (passwordBaru.length < 8) {
    redirect(`/admin/password?error=${encodeURIComponent("Password baru minimal 8 karakter.")}`);
  }

  if (passwordBaru !== konfirmasiPassword) {
    redirect(`/admin/password?error=${encodeURIComponent("Password baru dan konfirmasi tidak sama.")}`);
  }

  let errorMessage = null;

  try {
    const { error } = await supabase.auth.updateUser({
      password: passwordBaru,
    });

    if (error) {
      errorMessage = error.message;
    }
  } catch (err) {
    errorMessage = err.message || "Terjadi kesalahan saat mengganti password.";
  }

  if (errorMessage) {
    redirect(`/admin/password?error=${encodeURIComponent(errorMessage)}`);
  }

  redirect(`/admin/password?berhasil=${encodeURIComponent("Password berhasil diganti.")}`);
}


