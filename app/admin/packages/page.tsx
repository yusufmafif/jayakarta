"use client";

import { useState, useEffect } from "react";
import ErrorState from "@/components/ErrorState";

interface Product {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  price: number;
  active: number;
  features: string[];
}

export default function AdminPackagesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<{
    name: string;
    description: string;
    price: number;
    features: string[];
  }>({ name: "", description: "", price: 0, features: [] });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      setProducts(data.products || []);
    } catch {
      setError("Gagal memuat paket produk");
    } finally {
      setLoading(false);
    }
  }

  function startEditing(product: Product) {
    setEditingId(product.id);
    setEditForm({
      name: product.name,
      description: product.description || "",
      price: product.price,
      features: [...product.features],
    });
  }

  function cancelEditing() {
    setEditingId(null);
    setEditForm({ name: "", description: "", price: 0, features: [] });
  }

  function addFeature() {
    setEditForm((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  }

  function updateFeature(index: number, value: string) {
    setEditForm((prev) => ({
      ...prev,
      features: prev.features.map((f, i) => (i === index ? value : f)),
    }));
  }

  function removeFeature(index: number) {
    setEditForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  }

  async function saveProduct() {
    if (!editingId) return;

    setSaving(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingId,
          name: editForm.name,
          description: editForm.description,
          price: editForm.price,
          features: editForm.features.filter((f) => f.trim() !== ""),
        }),
      });

      if (!res.ok) {
        throw new Error("Gagal menyimpan");
      }

      await fetchProducts();
      cancelEditing();
    } catch (err) {
      setError("Gagal menyimpan perubahan");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="text-gray-600">Memuat paket...</div>;
  }

  if (error && products.length === 0) {
    return <ErrorState message={error} />;
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Paket Produk</h1>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl bg-white p-6 shadow-sm"
          >
            {editingId === product.id ? (
              /* Edit Mode */
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Nama Paket
                    </label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Harga (Rp)
                    </label>
                    <input
                      type="number"
                      value={editForm.price}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          price: Number(e.target.value),
                        }))
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Deskripsi
                  </label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows={2}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Fitur
                  </label>
                  <div className="space-y-2">
                    {editForm.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updateFeature(index, e.target.value)}
                          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                          placeholder={`Fitur ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="rounded-lg px-3 py-2 text-red-500 hover:bg-red-50"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addFeature}
                      className="rounded-lg border border-dashed border-gray-300 px-4 py-2 text-sm text-gray-600 hover:border-gray-400 hover:bg-gray-50"
                    >
                      + Tambah Fitur
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={saveProduct}
                    disabled={saving}
                    className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50"
                  >
                    {saving ? "Menyimpan..." : "Simpan"}
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Batal
                  </button>
                </div>
              </div>
            ) : (
              /* View Mode */
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                      {product.slug}
                    </span>
                    {!product.active && (
                      <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-600">
                        Nonaktif
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    {product.description}
                  </p>
                  <p className="mt-2 text-lg font-bold text-gray-900">
                    Rp {product.price.toLocaleString("id-ID")}
                  </p>
                  {product.features.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {product.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
                          <span className="text-green-500">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <button
                  onClick={() => startEditing(product)}
                  className="ml-4 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}

        {products.length === 0 && (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <p className="text-gray-600">Belum ada paket produk.</p>
          </div>
        )}
      </div>
    </div>
  );
}
