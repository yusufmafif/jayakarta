// scripts/migrate.mjs
// Migrasi database Turso — idempotent, aman dijalankan berulang kali.
// Jalankan: node --env-file=.env scripts/migrate.mjs

import { createClient } from "@libsql/client";

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Kolom tambahan yang mungkin belum ada (skema lama tidak punya data customer & plan)
const ORDER_EXTRA_COLUMNS = [
  ["customer_name", "TEXT"],
  ["customer_email", "TEXT"],
  ["customer_phone", "TEXT"],
  ["business_name", "TEXT"],
  ["plan_id", "TEXT"],
  ["plan_name", "TEXT"],
];

// Katalog paket — disinkronkan dengan domain/plan.ts (harga dasar sebelum PPN)
const PRODUCT_SEEDS = [
  {
    slug: "basic",
    name: "Basic",
    description: "Cocok untuk UMKM yang baru mulai online. Website simpel, cepat jadi.",
    price: 1000000,
  },
  {
    slug: "standard",
    name: "Standard",
    description: "Untuk bisnis yang ingin tampil profesional dan meningkatkan kepercayaan pelanggan.",
    price: 1700000,
  },
  {
    slug: "premium",
    name: "Pro",
    description: "Solusi lengkap untuk bisnis serius.",
    price: 2500000,
  },
];

async function ensureColumns(table, columns) {
  const info = await db.execute(`PRAGMA table_info(${table})`);
  const existing = new Set(info.rows.map((col) => col.name));

  for (const [name, type] of columns) {
    if (!existing.has(name)) {
      await db.execute(`ALTER TABLE ${table} ADD COLUMN ${name} ${type}`);
      console.log(`✓ Kolom ${table}.${name} ditambahkan`);
    }
  }
}

async function main() {
  console.log("Migrasi dimulai...");

  // ── users ──
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      email TEXT PRIMARY KEY,
      name TEXT NOT NULL DEFAULT '',
      image TEXT NOT NULL DEFAULT '',
      role TEXT NOT NULL DEFAULT 'user'
    )
  `);
  await ensureColumns("users", [["role", "TEXT NOT NULL DEFAULT 'user'"]]);

  // ── products ──
  await db.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      description TEXT,
      price INTEGER NOT NULL,
      active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
  for (const p of PRODUCT_SEEDS) {
    const result = await db.execute({
      sql: "INSERT OR IGNORE INTO products (slug, name, description, price, active) VALUES (?, ?, ?, ?, 1)",
      args: [p.slug, p.name, p.description, p.price],
    });
    if (result.rowsAffected > 0) {
      console.log(`✓ Produk ${p.slug} ditambahkan`);
    }
  }

  // ── orders ──
  await db.execute(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      order_id TEXT NOT NULL UNIQUE,
      amount INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      midtrans_transaction_id TEXT,
      payment_type TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      paid_at TEXT
    )
  `);
  await ensureColumns("orders", ORDER_EXTRA_COLUMNS);

  // ── purchases (invoice) ──
  await db.execute(`
    CREATE TABLE IF NOT EXISTS purchases (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      invoice_number TEXT NOT NULL UNIQUE,
      customer_name TEXT NOT NULL,
      customer_email TEXT,
      customer_phone TEXT,
      business_name TEXT,
      product_name TEXT NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      price INTEGER NOT NULL,
      subtotal INTEGER NOT NULL,
      tax INTEGER NOT NULL DEFAULT 0,
      total INTEGER NOT NULL,
      payment_method TEXT,
      payment_status TEXT NOT NULL DEFAULT 'pending',
      notes TEXT,
      order_id TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await ensureColumns("purchases", [
    ["business_name", "TEXT"],
    ["order_id", "TEXT"],
  ]);

  console.log("✓ Tabel users, products, orders, purchases siap");
  console.log("Migrasi selesai.");
}

main().catch((err) => {
  console.error("Migrasi gagal:", err);
  process.exit(1);
});
