-- Schema database Jayakarta (Turso / libSQL)
-- Jalankan migrasi otomatis: node --env-file=.env scripts/migrate.mjs

-- ── users ──────────────────────────────────────────────
-- id INTEGER PRIMARY KEY AUTOINCREMENT
-- email TEXT UNIQUE
-- name TEXT
-- image TEXT
-- role TEXT DEFAULT 'user'          (dijaga oleh migrate script)

-- ── products ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ── orders (pembayaran Midtrans) ───────────────────────
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
  paid_at TEXT,
  -- kolom denormalisasi (ditambahkan migrate script)
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  business_name TEXT,
  plan_id TEXT,
  plan_name TEXT
);

-- ── purchases (invoice) ────────────────────────────────
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
);
