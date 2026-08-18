// repositories/orders.repository.ts
// Akses data tabel `orders` — satu-satunya tempat query order ke Turso.

import { db } from "@/integrations/turso";
import type { Order, OrderStatus } from "@/domain/order";

export interface CreateOrderInput {
  userId: number;
  productId: number;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  businessName: string;
  planId: string | null;
  planName: string;
  amount: number;
}

export async function createOrder(input: CreateOrderInput): Promise<void> {
  await db.execute({
    sql: `
      INSERT INTO orders (
        user_id,
        product_id,
        order_id,
        customer_name,
        customer_email,
        customer_phone,
        business_name,
        plan_id,
        plan_name,
        amount,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `,
    args: [
      input.userId,
      input.productId,
      input.orderId,
      input.customerName,
      input.customerEmail,
      input.customerPhone,
      input.businessName,
      input.planId,
      input.planName,
      input.amount,
    ],
  });
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  paymentType?: string | null,
  midtransTransactionId?: string | null,
): Promise<void> {
  await db.execute({
    sql: `
      UPDATE orders
      SET status = ?,
          payment_type = COALESCE(?, payment_type),
          midtrans_transaction_id = COALESCE(?, midtrans_transaction_id),
          paid_at = COALESCE(paid_at, CASE WHEN ? = 'paid' THEN ? END)
      WHERE order_id = ?
    `,
    args: [
      status,
      paymentType ?? null,
      midtransTransactionId ?? null,
      status,
      status === "paid" ? new Date().toISOString() : null,
      orderId,
    ],
  });
}

export async function findAllOrders(): Promise<Order[]> {
  const result = await db.execute(
    "SELECT * FROM orders ORDER BY id DESC",
  );
  return result.rows as unknown as Order[];
}

export async function getOrderStats(): Promise<{
  totalOrders: number;
  paidOrders: number;
  revenue: number;
}> {
  const total = await db.execute("SELECT COUNT(*) AS total FROM orders");
  const paid = await db.execute(
    "SELECT COUNT(*) AS total FROM orders WHERE status = 'paid'",
  );
  const revenue = await db.execute(
    "SELECT COALESCE(SUM(amount), 0) AS total FROM orders WHERE status = 'paid'",
  );

  return {
    totalOrders: Number(total.rows[0]?.total ?? 0),
    paidOrders: Number(paid.rows[0]?.total ?? 0),
    revenue: Number(revenue.rows[0]?.total ?? 0),
  };
}
