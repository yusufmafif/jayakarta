// services/product.service.ts
// Logika aplikasi seputar produk — mengorkestrasi repository products.

import {
  findAllProducts,
  findProductById,
  findProductBySlug,
  updateProduct,
  updateProductFeatures,
  createProduct,
  type Product,
} from "@/repositories/products.repository";

export type { Product };

export async function listProducts(): Promise<Product[]> {
  return findAllProducts();
}

export async function getProductById(id: number): Promise<Product | null> {
  return findProductById(id);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return findProductBySlug(slug);
}

export async function updateProductData(
  id: number,
  data: { name?: string; description?: string; price?: number; slug?: string; active?: number },
): Promise<void> {
  await updateProduct(id, data);
}

export async function updateProductFeaturesList(
  productId: number,
  features: string[],
): Promise<void> {
  await updateProductFeatures(productId, features);
}

export async function addProduct(
  data: { slug: string; name: string; description?: string; price: number },
): Promise<number> {
  return createProduct(data);
}
