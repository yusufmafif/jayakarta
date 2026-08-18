// lib/format.ts
// Utility format angka / mata uang — murni, tanpa dependensi eksternal.

export function formatRp(n: number): string {
  if (!Number.isFinite(n)) return "";
  return `Rp ${n.toLocaleString("id-ID")}`;
}

/** Format nilai dari string (mis. query param Midtrans: "1110000.00") */
export function formatRpFromString(value: string | null): string | null {
  if (!value) return null;
  const n = Math.round(Number(value));
  if (Number.isNaN(n)) return null;
  return formatRp(n);
}

/** Format singkat dalam jutaan: Rp 1,11jt */
export function formatRpShort(n: number): string {
  return `Rp ${(n / 1_000_000).toLocaleString("id-ID")}jt`;
}
