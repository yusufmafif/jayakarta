// services/order.service.ts
// Logika aplikasi seputar pesanan — mengorkestrasi repository orders & purchases.

import {
  createOrder,
  findAllOrders,
  findOrdersByUserId,
  getOrderStats,
  updateOrderStatus,
  type CreateOrderInput,
  type OrderWithInvoice,
} from "@/repositories/orders.repository";
import {
  createPurchase,
  updatePurchaseStatusByOrderId,
  type CreatePurchaseInput,
} from "@/repositories/purchases.repository";
import { countUsers } from "@/repositories/users.repository";
import type { Order, OrderStatus } from "@/domain/order";

export async function createOrderRecord(input: CreateOrderInput): Promise<void> {
  await createOrder(input);
}

export async function createPurchaseRecord(
  input: CreatePurchaseInput,
): Promise<void> {
  await createPurchase(input);
}

export async function listOrders(): Promise<Order[]> {
  return findAllOrders();
}

export async function listOrdersForUser(
  userId: number,
): Promise<OrderWithInvoice[]> {
  return findOrdersByUserId(userId);
}

export async function getAdminStats() {
  const [orderStats, totalUsers] = await Promise.all([
    getOrderStats(),
    countUsers(),
  ]);
  return { ...orderStats, totalUsers };
}

export async function setOrderStatus(
  orderId: string,
  status: OrderStatus,
  paymentType?: string | null,
  midtransTransactionId?: string | null,
): Promise<void> {
  await updateOrderStatus(orderId, status, paymentType, midtransTransactionId);
  await updatePurchaseStatusByOrderId(orderId, status);
}
