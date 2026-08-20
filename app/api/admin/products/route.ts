// app/api/admin/products/route.ts
// API route untuk admin mengelola paket produk (CRUD).

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/services/auth.config";
import {
  listProducts,
  updateProductData,
  updateProductFeaturesList,
} from "@/services/product.service";

// GET /api/admin/products - List all products
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const products = await listProducts();
    return NextResponse.json({ products });
  } catch {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// PUT /api/admin/products - Update product
export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, name, description, price, slug, features } = body;

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    // Update product data
    await updateProductData(id, {
      name,
      description,
      price: price ? Number(price) : undefined,
      slug,
    });

    // Update features if provided
    if (Array.isArray(features)) {
      await updateProductFeaturesList(id, features);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}
