// domain/order.ts
// Tipe & konstanta seputar pesanan — mengikuti skema tabel `orders` di Turso.

export type OrderStatus = "pending" | "paid" | "failed";

export interface Order {
  id: number;
  user_id: number | null;
  order_id: string;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  business_name: string | null;
  plan_id: string | null;
  plan_name: string | null;
  amount: number;
  status: OrderStatus;
  midtrans_transaction_id: string | null;
  payment_type: string | null;
  created_at: string;
  paid_at: string | null;
}
