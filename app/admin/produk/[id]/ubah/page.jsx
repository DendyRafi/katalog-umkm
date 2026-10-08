import { notFound } from "next/navigation";
import NavAdmin from "@/components/NavAdmin";
import FormProduk from "@/components/FormProduk";
import { ubahProduk } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HalamanUbahProduk({ params, searchParams }) {
  const { id } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const error = resolvedSearchParams?.error;

  let produk = null;

  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("produk")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    produk = data;
  } catch {
    // fallthrough to notFound
  }

  if (!produk) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <div>
        <h1 className="text-2xl font-extrabold">Ubah produk</h1>
      </div>
      {error && (
        <p className="max-w-xl rounded-lg border border-garis bg-permukaan px-3 py-2 text-sm text-bahaya">
          {error}
        </p>
      )}
      <FormProduk produk={produk} action={ubahProduk} labelTombol="Simpan perubahan" />
    </div>
  );
}
