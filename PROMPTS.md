# Jurnal Prompt

Catat prompt penting selama membangun aplikasi: apa yang kamu minta, hasilnya, dan perbaikan yang dilakukan. Beri tanda **[SENDIRI]** untuk prompt yang kamu tulis sendiri (bukan dari lembar kerja).

## US-01 Katalog dari database

**Prompt:**
Baca AGENTS.md dan docs/user-stories.md bagian US-01.

Ubah app/page.jsx supaya daftar produk diambil dari tabel "produk" di Supabase, di sisi server, memakai SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable. Buat koneksi Supabase untuk server di folder lib/supabase.

Tampilkan produk dengan komponen KartuProduk yang sudah ada, tanpa mengubah tampilannya. Kalau gagal mengambil data, tampilkan pesan error yang jelas di halaman. Kalau tabel kosong, tampilkan tulisan "Belum ada produk". Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
- Berhasil membuat koneksi Supabase di sisi server pada `lib/supabase/server.js` dan re-export di `lib/supabase/index.js`.
- Halaman `app/page.jsx` berhasil mengambil data langsung dari tabel `produk` di Supabase secara dinamis di server.
- Menampilkan pesan error jika query/koneksi gagal, dan menampilkan tulisan "Belum ada produk" jika tabel kosong.
- Komponen `CatatanBelumAktif` berhasil dihapus dan tampilan `KartuProduk` dipertahankan.

**Perbaikan:**
Tidak ada perbaikan yang diperlukan, kode langsung berhasil dan lolos build.

## US-02 Detail produk

**Prompt:**
Baca docs/user-stories.md bagian US-02.

Ubah app/produk/[id]/page.jsx supaya mengambil satu produk dari tabel "produk" di Supabase berdasarkan id di URL, di sisi server, memakai koneksi Supabase yang sudah dibuat di lib/supabase. Kalau produk tidak ditemukan, panggil notFound(). Jangan ubah tampilannya. Hapus CatatanBelumAktif dari halaman ini, tapi biarkan tombol WhatsApp.

**Hasil:**
- Halaman `app/produk/[id]/page.jsx` mengambil produk berdasarkan parameter `id` di URL dari Supabase di sisi server.
- Memanggil fungsi `notFound()` untuk menampilkan halaman 404 jika produk tidak ditemukan atau terjadi kesalahan query.
- Komponen `CatatanBelumAktif` dihapus, tombol WhatsApp dan tampilan tata letak halaman tetap dipertahankan.

**Perbaikan:**
Tidak ada perbaikan yang diperlukan, kode langsung berhasil dan lolos build.

## US-03 Pesan via WhatsApp

**Prompt:**
Baca docs/rancangan-teknis.md bagian "Pesan WhatsApp (US-03)".

Ubah components/TombolWhatsApp.jsx menjadi tautan yang membuka https://wa.me/ ke nomor di lib/toko.js, dengan pesan otomatis berisi nama dan harga produk dalam format rupiah. Pesan di-encode dengan encodeURIComponent dan dibuka di tab baru. Pertahankan tampilan tombolnya. Hapus CatatanBelumAktif yang menyebut US-03 di halaman detail produk.

**Hasil:**
- Mengubah `components/TombolWhatsApp.jsx` menjadi elemen tautan (`<a>`) yang mengarah ke `https://wa.me/<nomorWhatsApp>`.
- Pesan otomatis diformat dengan nama produk dan harga rupiah (`formatRupiah`), di-encode dengan `encodeURIComponent`, serta membuka di tab baru (`target="_blank"`).
- Tampilan tombol tetap sama dengan kelas styling sebelumnya.

**Perbaikan:**
Tidak ada perbaikan yang diperlukan, kode langsung berhasil dan lolos build.

## US-04 Login admin

**Prompt:**
Baca AGENTS.md bagian aturan keamanan dan docs/user-stories.md bagian US-04.

Buat login admin memakai Supabase Auth (email dan password) dengan @supabase/ssr dan cookie, memakai SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY. Login diproses dengan Server Action di app/admin/actions.js dan disambungkan ke form di app/admin/login/page.jsx. Login berhasil diarahkan ke /admin; login gagal menampilkan pesan error yang jelas di halaman login. Buat juga tombol "Keluar" di components/NavAdmin.jsx berfungsi: mengakhiri sesi lalu kembali ke /admin/login. Jangan ubah tampilan. Hapus CatatanBelumAktif dari halaman login.

**Hasil:**
- Membuat koneksi sesi admin berbasis cookie dengan `@supabase/ssr` di `lib/supabase/session.js`.
- Membuat Server Action `login` dan `keluar` di `app/admin/actions.js`.
- Menghubungkan form di `app/admin/login/page.jsx` dengan Server Action `login`, menampilkan pesan error jika login gagal, serta mengarahkan ke `/admin` jika berhasil.
- Mengaktifkan tombol "Keluar" di `components/NavAdmin.jsx` untuk mengakhiri sesi auth dan mengarahkan kembali ke `/admin/login`.
- Menghapus komponen `CatatanBelumAktif` dari halaman login.

**Perbaikan:**
Menambahkan impor aksi `keluar` di `components/NavAdmin.jsx` yang sempat terlewat agar build Next.js sukses.

## US-05 Ganti password

**Prompt:**
Baca docs/user-stories.md bagian US-05.

Buat Server Action ganti password di app/admin/actions.js untuk admin yang sedang login, memakai Supabase Auth. Validasi di server: password baru minimal 8 karakter dan harus sama dengan konfirmasi. Tampilkan pesan berhasil atau pesan error yang jelas di halaman. Sambungkan ke form di app/admin/password/page.jsx tanpa mengubah tampilannya. Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
- Membuat Server Action `gantiPassword` di `app/admin/actions.js` dengan validasi server: minimal 8 karakter dan kecocokan password konfirmasi.
- Memastikan admin sedang login sebelum memperbarui password (`supabase.auth.updateUser`).
- Menghubungkan form di `app/admin/password/page.jsx` dan menampilkan feedback berupa pesan sukses atau error.
- Menghapus komponen `CatatanBelumAktif` dari halaman ganti password.

**Perbaikan:**
Tidak ada perbaikan yang diperlukan, kode langsung berhasil dan lolos build.

## US-06 Proteksi halaman admin

**Prompt:**
Baca AGENTS.md aturan keamanan nomor 3 dan 4, dan docs/user-stories.md bagian US-06.

Buat file proxy.js di root proyek (Next.js 16). Semua rute /admin kecuali /admin/login wajib login dengan Supabase Auth; kalau belum login, alihkan ke /admin/login. Pastikan juga setiap Server Action yang mengubah data memeriksa login di server. Hapus CatatanBelumAktif dari halaman /admin.

**Hasil:**
- Membuat `proxy.js` di root proyek sebagai proxy middleware Next.js 16 untuk memvalidasi sesi admin menggunakan Supabase Auth.
- Mengalihkan semua kunjungan ke `/admin/*` (kecuali `/admin/login`) ke `/admin/login` jika belum terautentikasi.
- Menambahkan fungsi helper `requireAdmin()` di `app/admin/actions.js` untuk memastikan aksi pengubah data di sisi server terlindungi.
- Menghapus komponen `CatatanBelumAktif` dari `app/admin/page.jsx`.

**Perbaikan:**
Tidak ada perbaikan yang diperlukan, kode langsung berhasil dan lolos build.

## Debugging dan fitur bonus

Tambahkan bagian baru untuk setiap error yang kamu perbaiki atau fitur bonus yang kamu kerjakan.

### [SENDIRI] Penyesuaian Data Contoh Produk Warung Indomie

**Prompt:**
sekarang anda baca file lib/data-contoh.js

isi produknya kan masih contoh, coba sekarang anda ubah keseluruhannya menjadi jika jual produk di warung indomie sesuai dengan tokonya yaitu warung indomie, coba anda ubah misal indomie goreng yang rasa lain, tolong ubah nama, harga, dekripsi, foto url, dan kategori, sesuai dengan produk indomie untuk warung indomie, dan kalau bisa anda tolong tambahkan juga gambarnya, karena gambarnya masih contoh, dan langsung masukkan lnknya di foto_url kalau bisa

**Hasil:**
- Mengubah seluruh produk di `lib/data-contoh.js` menjadi menu khas Warung Makan Indomie (Indomie Goreng Telur, Internet Telur Kornet, Indomie Goreng Aceh, Indomie Soto, Indomie Kari Ayam, Es Teh Manis, dan Es Jeruk).
- Melengkapi data dengan nama, kategori, harga wajar, deskripsi menarik, dan link gambar langsung berkualitas tinggi dari Unsplash CDN yang siap di-load tanpa pembatasan rate limit.

**Perbaikan:**
Tidak ada perbaikan yang diperlukan, kode langsung berhasil dan lolos build.
