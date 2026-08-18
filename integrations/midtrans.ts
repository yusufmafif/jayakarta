// integrations/midtrans.ts
// Klien Midtrans (Snap) — satu-satunya tempat SDK midtrans-client dipakai.

import Midtrans from "midtrans-client";
import type { SnapParam } from "midtrans-client";

const snap = new Midtrans.Snap({
  isProduction: process.env.ENVIRONMENT === "true",
  serverKey: process.env.SECRET,
  clientKey: process.env.NEXT_PUBLIC_CLIENT,
});

export async function createTransactionToken(
  parameter: SnapParam,
): Promise<string> {
  return snap.createTransactionToken(parameter);
}
