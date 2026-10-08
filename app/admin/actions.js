"use server";

import { redirect } from "next/navigation";
import { createSessionClient } from "@/lib/supabase/session";
import { createClient } from "@/lib/supabase/server";

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

// US-08: Tambah produk
export async function tambahProduk(formData) {
  await requireAdmin();

  const nama = formData.get("nama")?.toString().trim() || "";
  const harga = parseInt(formData.get("harga")?.toString() || "0", 10);
  const kategori = formData.get("kategori")?.toString().trim() || "";
  const foto_url = formData.get("foto_url")?.toString().trim() || "";
  const deskripsi = formData.get("deskripsi")?.toString().trim() || "";

  if (!nama) {
    redirect(`/admin/produk/baru?error=${encodeURIComponent("Nama produk wajib diisi.")}`);
  }

  if (!harga || harga < 0) {
    redirect(`/admin/produk/baru?error=${encodeURIComponent("Harga produk wajib diisi dan tidak boleh negatif.")}`);
  }

  let errorMessage = null;

  try {
    const supabase = createClient();
    const { error } = await supabase.from("produk").insert({
      nama,
      harga,
      kategori,
      foto_url,
      deskripsi,
    });

    if (error) {
      errorMessage = error.message;
    }
  } catch (err) {
    errorMessage = err.message || "Terjadi kesalahan saat menyimpan produk.";
  }

  if (errorMessage) {
    redirect(`/admin/produk/baru?error=${encodeURIComponent(errorMessage)}`);
  }

  redirect("/admin");
}

// US-09: Ubah produk
export async function ubahProduk(formData) {
  await requireAdmin();

  const id = formData.get("id")?.toString();
  const nama = formData.get("nama")?.toString().trim() || "";
  const harga = parseInt(formData.get("harga")?.toString() || "0", 10);
  const kategori = formData.get("kategori")?.toString().trim() || "";
  const foto_url = formData.get("foto_url")?.toString().trim() || "";
  const deskripsi = formData.get("deskripsi")?.toString().trim() || "";

  if (!id) {
    redirect("/admin");
  }

  if (!nama) {
    redirect(`/admin/produk/${id}/ubah?error=${encodeURIComponent("Nama produk wajib diisi.")}`);
  }

  let errorMessage = null;

  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("produk")
      .update({ nama, harga, kategori, foto_url, deskripsi })
      .eq("id", id);

    if (error) {
      errorMessage = error.message;
    }
  } catch (err) {
    errorMessage = err.message || "Terjadi kesalahan saat menyimpan perubahan.";
  }

  if (errorMessage) {
    redirect(`/admin/produk/${id}/ubah?error=${encodeURIComponent(errorMessage)}`);
  }

  redirect("/admin");
}

// US-10: Hapus produk
export async function hapusProduk(formData) {
  await requireAdmin();

  const id = formData.get("id")?.toString();

  if (!id) {
    redirect("/admin");
  }

  let errorMessage = null;

  try {
    const supabase = createClient();
    const { error } = await supabase.from("produk").delete().eq("id", id);

    if (error) {
      errorMessage = error.message;
    }
  } catch (err) {
    errorMessage = err.message || "Terjadi kesalahan saat menghapus produk.";
  }

  if (errorMessage) {
    redirect(`/admin?error=${encodeURIComponent(errorMessage)}`);
  }

  redirect("/admin");
}
