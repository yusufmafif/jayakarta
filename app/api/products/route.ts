// app/api/products/route.ts
// API publik untuk mengambil daftar produk aktif (dipakai PricingSection).

import { NextResponse } from "next/server";
import { listProducts } from "@/services/product.service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await listProducts();
    // Filter hanya produk aktif
    const activeProducts = products.filter((p) => p.active === 1);
    return NextResponse.json({ products: activeProducts });
  } catch {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
