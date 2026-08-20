// repositories/products.repository.ts
// Akses data tabel `products` + `product_features` — satu-satunya tempat query produk ke Turso.

import { db } from "@/integrations/turso";

export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  price: number;
  active: number;
  features?: string[];
}

export interface ProductRow {
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

export async function findAllProducts(): Promise<Product[]> {
  const result = await db.execute(
    "SELECT * FROM products ORDER BY price ASC",
  );

  const products = result.rows as unknown as ProductRow[];

  // Fetch features for each product
  const productsWithFeatures = await Promise.all(
    products.map(async (product) => {
      const featuresResult = await db.execute({
        sql: "SELECT feature FROM product_features WHERE product_id = ? ORDER BY sort_order ASC",
        args: [product.id],
      });
      const features = featuresResult.rows.map((r) => r.feature as string);
      return { ...product, features };
    }),
  );

  return productsWithFeatures;
}

export async function findProductById(
  id: number,
): Promise<Product | null> {
  const result = await db.execute({
    sql: "SELECT * FROM products WHERE id = ?",
    args: [id],
  });

  if (!result.rows[0]) return null;

  const product = result.rows[0] as unknown as ProductRow;
  const featuresResult = await db.execute({
    sql: "SELECT feature FROM product_features WHERE product_id = ? ORDER BY sort_order ASC",
    args: [id],
  });
  const features = featuresResult.rows.map((r) => r.feature as string);

  return { ...product, features };
}

export async function updateProduct(
  id: number,
  data: { name?: string; description?: string; price?: number; slug?: string; active?: number },
): Promise<void> {
  const fields: string[] = [];
  const args: (string | number)[] = [];

  if (data.name !== undefined) { fields.push("name = ?"); args.push(data.name); }
  if (data.description !== undefined) { fields.push("description = ?"); args.push(data.description); }
  if (data.price !== undefined) { fields.push("price = ?"); args.push(data.price); }
  if (data.slug !== undefined) { fields.push("slug = ?"); args.push(data.slug); }
  if (data.active !== undefined) { fields.push("active = ?"); args.push(data.active); }

  if (fields.length === 0) return;

  args.push(id);
  await db.execute({
    sql: `UPDATE products SET ${fields.join(", ")} WHERE id = ?`,
    args,
  });
}

export async function updateProductFeatures(
  productId: number,
  features: string[],
): Promise<void> {
  // Delete existing features
  await db.execute({
    sql: "DELETE FROM product_features WHERE product_id = ?",
    args: [productId],
  });

  // Insert new features
  for (let i = 0; i < features.length; i++) {
    await db.execute({
      sql: "INSERT INTO product_features (product_id, feature, sort_order) VALUES (?, ?, ?)",
      args: [productId, features[i], i + 1],
    });
  }
}

export async function createProduct(
  data: { slug: string; name: string; description?: string; price: number },
): Promise<number> {
  const result = await db.execute({
    sql: "INSERT INTO products (slug, name, description, price) VALUES (?, ?, ?, ?)",
    args: [data.slug, data.name, data.description ?? null, data.price],
  });
  return Number(result.lastInsertRowid);
}
