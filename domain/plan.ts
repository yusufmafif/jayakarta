// domain/plan.ts
// Katalog produk (paket website) — data murni, tanpa dependensi eksternal.

export interface Plan {
  id: string;
  name: string;
  price: number;
  color: string;
  desc: string;
  features: string[];
  image: string;
}

export const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 1000000,
    color: "#10b981",
    desc: "Cocok untuk UMKM yang baru mulai online. Website simpel, cepat jadi, dan langsung bisa dipakai jualan.",
    features: [
      "1 halaman landing page",
      "Desain modern & mobile friendly",
      "Gratis domain .com (1 tahun)",
      "Setup cepat 3-5 hari",
    ],
    image: "/assets.webp",
  },
  {
    id: "standard",
    name: "Bisnis",
    price: 1700000,
    color: "#3b82f6",
    desc: "Untuk bisnis yang ingin tampil profesional dan meningkatkan kepercayaan pelanggan.",
    features: [
      "Semua fitur Starter",
      "Hingga 3 halaman website",
      "Domain .com gratis 1 tahun",
      "Google Maps",
      "Galeri foto",
      "Revisi 3x",
    ],
    image: "/assets.webp",
  },
  {
    id: "premium",
    name: "Pro",
    price: 2500000,
    color: "#440a5f",
    desc: "Solusi lengkap untuk bisnis serius.",
    features: [
      "Semua fitur Bisnis",
      "10 Halaman & katalog produk 50+",
      "Update konten",
      "Revisi 5x",
    ],
    image: "/assets.webp",
  },
];

export const TAX_RATE = 0.11;

export function getPlanById(id: string | null): Plan {
  return plans.find((p) => p.id === id) ?? plans[0];
}
