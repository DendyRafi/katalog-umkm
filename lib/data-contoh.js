// DATA CONTOH: Produk Warung Makan Indomie
// Nama kolom sama persis dengan tabel "produk" di database.

export const produkContoh = [
  {
    id: 1,
    nama: "Indomie Goreng Spesial Telur",
    harga: 12000,
    deskripsi:
      "Indomie goreng original legendaris disajikan dengan telur mata sapi ceplok, sawi hijau segar, dan taburan bawang goreng renyah.",
    foto_url:
      "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80",
    kategori: "Indomie Goreng",
  },
  {
    id: 2,
    nama: "Indomie Goreng Internet (Telur Kornet)",
    harga: 16000,
    deskripsi:
      "Menu favorit khas warmindo! Indomie goreng komplit dengan perpaduan topping kornet gurih lezat dan telur ceplok mantap.",
    foto_url:
      "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80",
    kategori: "Indomie Goreng",
  },
  {
    id: 3,
    nama: "Indomie Goreng Aceh Pedas Mantap",
    harga: 14000,
    deskripsi:
      "Indomie goreng rasa mie Aceh dengan bumbu rempah pekat aromatik, mie tebal kenyal, dan sensasi pedas yang nendang di lidah.",
    foto_url:
      "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=800&q=80",
    kategori: "Indomie Goreng",
  },
  {
    id: 4,
    nama: "Indomie Kuah Soto Telur Rebus",
    harga: 12000,
    deskripsi:
      "Indomie rebus rasa soto dengan kuah kaldu hangat beraroma jeruk nipis segar, disajikan lengkap dengan telur rebus lembut dan sayur sawi.",
    foto_url:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    kategori: "Indomie Kuah",
  },
  {
    id: 5,
    nama: "Indomie Kuah Kari Ayam Komplit",
    harga: 14000,
    deskripsi:
      "Indomie kuah kari ayam bumbu kental kaya rempah yang gurih sedap, dipadukan dengan telur rebus dan irisan cabai rawit pedas.",
    foto_url:
      "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80",
    kategori: "Indomie Kuah",
  },
  {
    id: 6,
    nama: "Es Teh Manis Jumbo",
    harga: 5000,
    deskripsi:
      "Teh melati seduh wangi dengan manis gula pasir asli dan es batu dingin melimpah, teman paling pas menikmati seporsi Indomie.",
    foto_url:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80",
    kategori: "Minuman",
  },
  {
    id: 7,
    nama: "Es Jeruk Peras Segar",
    harga: 7000,
    deskripsi:
      "Jeruk peras asli dengan rasa manis asam segar alami yang disajikan dingin pelepas dahaga seketika.",
    foto_url:
      "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80",
    kategori: "Minuman",
  },
];

export function cariProdukContoh(id) {
  return produkContoh.find((produk) => String(produk.id) === String(id));
}
