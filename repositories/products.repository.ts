// repositories/products.repository.ts
// Akses data tabel `products` — satu-satunya tempat query produk ke Turso.

import { db } from "@/integrations/turso";

export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  price: number;
  active: number;
}

export async function findProductBySlug(
  slug: string,
): Promise<Product | null> {
  const result = await db.execute({
    sql: "SELECT * FROM products WHERE slug = ? AND active = 1",
    args: [slug],
  });

  if (!result.rows[0]) return null;
  return result.rows[0] as unknown as Product;
}
