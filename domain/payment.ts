// domain/payment.ts
// Konstanta & tipe seputar pembayaran Midtrans — data murni, tanpa dependensi eksternal.

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  bank_transfer: "Transfer Bank",
  qris: "QRIS",
  credit_card: "Kartu Kredit",
  gopay: "GoPay",
  shopeepp: "ShopeePay",
  dana: "DANA",
  ovo: "OVO",
  cstore: "Convenience Store",
  echannel: "E-Channel",
  akulaku: "Akulaku",
};

export const SUCCESS_TRANSACTION_STATUSES = [
  "settlement",
  "capture",
] as const;

export const PENDING_TRANSACTION_STATUSES = ["pending", "challenge"] as const;

export const FAILED_TRANSACTION_STATUSES = [
  "deny",
  "cancel",
  "expire",
  "failure",
] as const;

export type PaymentOutcome = "success" | "pending" | "failed" | "unknown";

export function classifyPaymentOutcome(
  transactionStatus: string | null,
): PaymentOutcome {
  if (!transactionStatus) return "unknown";
  if (
    (SUCCESS_TRANSACTION_STATUSES as readonly string[]).includes(
      transactionStatus,
    )
  ) {
    return "success";
  }
  if (
    (PENDING_TRANSACTION_STATUSES as readonly string[]).includes(
      transactionStatus,
    )
  ) {
    return "pending";
  }
  if (
    (FAILED_TRANSACTION_STATUSES as readonly string[]).includes(
      transactionStatus,
    )
  ) {
    return "failed";
  }
  return "unknown";
}
