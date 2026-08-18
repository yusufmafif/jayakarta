// repositories/purchases.repository.ts
// Akses data tabel `purchases` (invoice) — satu-satunya tempat query pembelian ke Turso.

import { db } from "@/integrations/turso";

export interface CreatePurchaseInput {
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  businessName: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
  tax: number;
  total: number;
  orderId: string;
}

export async function createPurchase(input: CreatePurchaseInput): Promise<void> {
  await db.execute({
    sql: `
      INSERT INTO purchases (
        invoice_number,
        customer_name,
        customer_email,
        customer_phone,
        business_name,
        product_name,
        quantity,
        price,
        subtotal,
        tax,
        total,
        payment_status,
        order_id
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)
    `,
    args: [
      input.invoiceNumber,
      input.customerName,
      input.customerEmail,
      input.customerPhone,
      input.businessName,
      input.productName,
      input.quantity,
      input.price,
      input.subtotal,
      input.tax,
      input.total,
      input.orderId,
    ],
  });
}

export async function updatePurchaseStatusByOrderId(
  orderId: string,
  status: string,
): Promise<void> {
  await db.execute({
    sql: "UPDATE purchases SET payment_status = ?, updated_at = CURRENT_TIMESTAMP WHERE order_id = ?",
    args: [status, orderId],
  });
}
