import NavAdmin from "@/components/NavAdmin";
import FormProduk from "@/components/FormProduk";
import { tambahProduk } from "@/app/admin/actions";

export default async function HalamanTambahProduk({ searchParams }) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const error = resolvedSearchParams?.error;

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <div>
        <h1 className="text-2xl font-extrabold">Tambah produk</h1>
      </div>
      {error && (
        <p className="max-w-xl rounded-lg border border-garis bg-permukaan px-3 py-2 text-sm text-bahaya">
          {error}
        </p>
      )}
      <FormProduk action={tambahProduk} labelTombol="Simpan produk" />
    </div>
  );
}
