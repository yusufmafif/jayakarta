// app/api/midtrans/notification/route.ts
// Handler HTTP tipis — klasifikasi status ada di services/payment.service.ts

import { NextRequest, NextResponse } from "next/server";
import { handlePaymentNotification } from "@/services/payment.service";

export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log("MIDTRANS NOTIFICATION:");
  console.log(body);

  const result = await handlePaymentNotification(body);

  console.log({
    outcome: result.outcome,
    order_id: result.orderId,
    gross_amount: result.grossAmount,
    payment_type: result.paymentType,
  });

  if (result.outcome === "success") {
    console.log("PAYMENT SUCCESS:", result.orderId);
  }

  if (result.outcome === "failed") {
    console.log("PAYMENT FAILED:", result.orderId);
  }

  return NextResponse.json({ success: true });
}
