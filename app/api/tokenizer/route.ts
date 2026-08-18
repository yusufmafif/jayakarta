// app/api/tokenizer/route.ts
// Handler HTTP tipis — logika pembuatan token ada di services/payment.service.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { initiateCheckout, CheckoutError } from "@/services/payment.service";
import { authOptions } from "@/services/auth.config";
import { findUserByEmail } from "@/repositories/users.repository";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Ambil origin (dev tunnel / domain) untuk URL callback Snap
  const origin = request.headers.get("origin") || "http://localhost:3000";

  // Checkout butuh login (tabel orders: user_id NOT NULL)
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Silakan login terlebih dahulu untuk checkout" },
      { status: 401 },
    );
  }

  const user = await findUserByEmail(session.user.email);

  try {
    const token = await initiateCheckout(
      { ...body, userId: user?.id ?? null },
      origin,
    );
    return NextResponse.json({ token });
  } catch (err) {
    if (err instanceof CheckoutError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    throw err;
  }
}
