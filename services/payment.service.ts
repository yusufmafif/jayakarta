// services/payment.service.ts
// Logika aplikasi seputar pembayaran — mengorkestrasi integrasi Midtrans, order & purchase.

import type { SnapParam } from "midtrans-client";
import { createTransactionToken } from "@/integrations/midtrans";
import { classifyPaymentOutcome } from "@/domain/payment";
import type { PaymentOutcome } from "@/domain/payment";
import { TAX_RATE } from "@/domain/plan";
import { findProductBySlug } from "@/repositories/products.repository";
import {
  createOrderRecord,
  createPurchaseRecord,
  setOrderStatus,
} from "@/services/order.service";

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  business: string;
}

export interface CreatePaymentTokenInput {
  id: string;
  productName: string;
  quantity: number;
  planId?: string;
  basePrice?: number; // harga dasar sebelum PPN
  userId?: number | null;
  customer?: CustomerInfo;
}

export class CheckoutError extends Error {}

export async function initiateCheckout(
  input: CreatePaymentTokenInput,
  origin: string,
): Promise<string> {
  const { id, productName, quantity, planId } = input;

  // Checkout butuh user login (tabel orders: user_id NOT NULL)
  if (!input.userId) {
    throw new CheckoutError("Silakan login terlebih dahulu untuk checkout");
  }

  // Produk harus terdaftar di tabel products (FK product_id)
  const product = await findProductBySlug(planId ?? "");
  if (!product) {
    throw new CheckoutError("Paket tidak ditemukan");
  }

  // Total dihitung server-side agar konsisten di order, invoice, dan Midtrans
  const basePrice = input.basePrice ?? product.price;
  const tax = Math.round(basePrice * TAX_RATE);
  const total = basePrice + tax;

  // Catat pesanan (orders) + invoice (purchases) sebelum membuat token
  if (input.customer) {
    await createOrderRecord({
      userId: input.userId,
      productId: product.id,
      orderId: id,
      planId: planId ?? null,
      planName: productName,
      customerName: input.customer.name,
      customerEmail: input.customer.email,
      customerPhone: input.customer.phone,
      businessName: input.customer.business,
      amount: total,
    });

    await createPurchaseRecord({
      invoiceNumber: `INV-${id.replace("ORDER-", "").slice(0, 8).toUpperCase()}`,
      customerName: input.customer.name,
      customerEmail: input.customer.email,
      customerPhone: input.customer.phone,
      businessName: input.customer.business,
      productName,
      quantity,
      price: basePrice,
      subtotal: basePrice,
      tax,
      total,
      orderId: id,
    });
  }

  const parameter: SnapParam = {
    item_details: {
      id,
      name: productName,
      price: total,
      quantity,
    },
    transaction_details: {
      order_id: id,
      gross_amount: total * quantity,
    },
    callbacks: {
      finish: `${origin}/thanks`,
      error: `${origin}/thanks?status=error`,
      pending: `${origin}/thanks?status=pending`,
    },
  };

  return createTransactionToken(parameter);
}

export interface PaymentNotification {
  order_id?: string;
  transaction_status?: string;
  fraud_status?: string;
  gross_amount?: string;
  payment_type?: string;
  transaction_id?: string;
}

export interface PaymentNotificationResult {
  outcome: PaymentOutcome;
  orderId: string | null;
  grossAmount: string | null;
  paymentType: string | null;
}

export async function handlePaymentNotification(
  body: PaymentNotification,
): Promise<PaymentNotificationResult> {
  const outcome = classifyPaymentOutcome(body.transaction_status ?? null);

  if (body.order_id) {
    if (outcome === "success") {
      await setOrderStatus(
        body.order_id,
        "paid",
        body.payment_type ?? null,
        body.transaction_id ?? null,
      );
    } else if (outcome === "failed") {
      await setOrderStatus(
        body.order_id,
        "failed",
        body.payment_type ?? null,
        body.transaction_id ?? null,
      );
    }
  }

  return {
    outcome,
    orderId: body.order_id ?? null,
    grossAmount: body.gross_amount ?? null,
    paymentType: body.payment_type ?? null,
  };
}
