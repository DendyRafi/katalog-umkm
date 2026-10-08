import NavAdmin from "@/components/NavAdmin";
import TabelProduk from "@/components/TabelProduk";
import Tombol from "@/components/Tombol";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HalamanAdmin({ searchParams }) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const error = resolvedSearchParams?.error;

  let daftarProduk = [];
  let pesanError = null;

  try {
    const supabase = createClient();
    const { data, error: dbError } = await supabase
      .from("produk")
      .select("*")
      .order("id", { ascending: true });

    if (dbError) {
      pesanError = dbError.message;
    } else {
      daftarProduk = data || [];
    }
  } catch (err) {
    pesanError = err.message || "Gagal memuat data produk.";
  }

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold">Produk</h1>
        <Tombol href="/admin/produk/baru">Tambah produk</Tombol>
      </div>
      {(error || pesanError) && (
        <p className="rounded-lg border border-garis bg-permukaan px-3 py-2 text-sm text-bahaya">
          {error || pesanError}
        </p>
      )}
      {daftarProduk.length === 0 && !pesanError ? (
        <p className="text-teks-lembut">Belum ada produk. Tambah produk pertamamu!</p>
      ) : (
        <TabelProduk daftarProduk={daftarProduk} />
      )}
    </div>
  );
}

