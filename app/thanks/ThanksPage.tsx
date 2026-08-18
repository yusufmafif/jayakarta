"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  classifyPaymentOutcome,
  PAYMENT_METHOD_LABELS,
} from "@/domain/payment";
import { formatRpFromString } from "@/lib/format";

type Status = "success" | "pending" | "failed" | "unknown";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 12,
        fontSize: 13,
        padding: "10px 0",
        borderBottom: "1px solid #eef2f7",
      }}
    >
      <span style={{ color: "#94a3b8", whiteSpace: "nowrap" }}>{label}</span>
      <span
        style={{
          fontWeight: 700,
          color: "#0f172a",
          textAlign: "right",
          wordBreak: "break-all",
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default function ThanksPage() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("order_id");
  const transactionStatus = searchParams.get("transaction_status");
  const paymentType = searchParams.get("payment_type");
  const grossAmount = searchParams.get("gross_amount");
  const fallback = searchParams.get("status");

  let status: Status;
  const outcome = classifyPaymentOutcome(transactionStatus);
  if (outcome !== "unknown") {
    status = outcome;
  } else if (fallback === "failed" || fallback === "error") {
    status = "failed";
  } else if (fallback === "pending") {
    status = "pending";
  } else if (transactionStatus || orderId) {
    // Transaksi ada tapi statusnya tak dikenal → anggap masih diverifikasi
    status = "pending";
  } else {
    status = "unknown";
  }

  const color =
    status === "success"
      ? "#10b981"
      : status === "failed"
        ? "#ef4444"
        : status === "pending"
          ? "#f59e0b"
          : "#3b82f6";

  const icon =
    status === "failed" ? (
      <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
        <path
          d="M9 9l14 14M23 9L9 23"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ) : status === "pending" ? (
      <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke={color} strokeWidth="2.5" />
        <path
          d="M16 10v6l4 3"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : (
      <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
        <path
          d="M7 16l6 6 12-12"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

  const title =
    status === "success"
      ? "Pembayaran Berhasil!"
      : status === "pending"
        ? "Menunggu Pembayaran"
        : status === "failed"
          ? "Pembayaran Gagal"
          : "Terima Kasih!";

  const desc =
    status === "success"
      ? "Terima kasih! Pembayaran untuk pesananmu sudah kami terima. Tim kami akan segera menghubungimu."
      : status === "pending"
        ? "Pembayaranmu belum selesai atau sedang diverifikasi. Jika kamu sudah transfer, pembayaran akan terkonfirmasi otomatis maks. 1×24 jam."
        : status === "failed"
          ? "Pembayaranmu gagal, dibatalkan, atau kedaluwarsa. Jangan khawatir — kamu belum dikenakan biaya apa pun, silakan coba bayar lagi."
          : "Pesananmu sudah kami terima. Tim kami akan segera menghubungimu untuk langkah selanjutnya.";

  const steps = [
    "Verifikasi pembayaran — Tim kami mengecek pembayaranmu (maks. 1×24 jam).",
    "Konfirmasi data — Kami hubungi kamu via email/WhatsApp untuk detail website.",
    "Website dikerjakan — Progress pembuatan dikirim lewat WhatsApp.",
  ];

  const amount = formatRpFromString(grossAmount);

  return (
    <div
      className="flex sm:flex-row px-10 flex-col min-h-[calc(100vh-64px)] items-center justify-center font-sans bg-blue-50 rounded-tl-4xl rounded-tr-4xl text-black"
      style={{ alignItems: "center", padding: "24px 16px" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');
        .co * { font-family: 'Sora', sans-serif; box-sizing: border-box; }
        @keyframes fu { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pop { 0%{transform:scale(0)} 70%{transform:scale(1.15)} 100%{transform:scale(1)} }
        .fu  { animation: fu  .4s ease both; }
        .pop { animation: pop .5s cubic-bezier(.34,1.56,.64,1) both; }
        .tap { transition: transform .15s, opacity .15s; cursor: pointer; }
        .tap:active { transform: scale(.97); opacity: .8; }
      `}</style>

      <div
        className="co"
        style={{ width: "100%", maxWidth: 480, margin: "0 auto" }}
      >
        <div
          className="fu"
          style={{
            background: "#fff",
            borderRadius: 20,
            padding: "32px 24px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          {/* ── ICON ── */}
          <div
            className="pop"
            style={{
              width: 88,
              height: 88,
              borderRadius: "50%",
              background: `${color}18`,
              border: `2px solid ${color}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            {icon}
          </div>

          <h1
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "#0f172a",
              letterSpacing: "-.03em",
              margin: "0 0 8px",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "#64748b",
              lineHeight: 1.7,
              margin: "0 0 24px",
            }}
          >
            {desc}
          </p>

          {/* ── RINGKASAN PESANAN ── */}
          {status !== "unknown" && (orderId || amount || paymentType) && (
            <div
              style={{
                background: "#f8fafc",
                borderRadius: 16,
                padding: "6px 18px",
                marginBottom: 20,
                textAlign: "left",
              }}
            >
              {orderId && <Row label="No. Order" value={orderId} />}
              {amount && <Row label="Total dibayar" value={amount} />}
              {paymentType && (
                <Row
                  label="Metode"
                  value={PAYMENT_METHOD_LABELS[paymentType] ?? paymentType}
                />
              )}
            </div>
          )}

          {/* ── LANGKAH SELANJUTNYA (sukses) ── */}
          {status === "success" && (
            <div style={{ textAlign: "left", marginBottom: 24 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#94a3b8",
                  letterSpacing: ".08em",
                  marginBottom: 14,
                }}
              >
                APA SELANJUTNYA?
              </div>
              {steps.map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: `${color}18`,
                      color,
                      fontSize: 11,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div style={{ fontSize: 12.5, color: "#475569", lineHeight: 1.6 }}>
                    {s}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── TOMBOL ── */}
          {status === "failed" && (
            <Link
              href="/checkout"
              className="tap"
              style={{
                display: "block",
                width: "100%",
                padding: 15,
                borderRadius: 14,
                border: "none",
                background: color,
                color: "#fff",
                fontSize: 15,
                fontWeight: 700,
                boxShadow: `0 8px 24px ${color}40`,
                textDecoration: "none",
                marginBottom: 10,
              }}
            >
              Coba Bayar Lagi
            </Link>
          )}

          <Link
            href="/"
            className="tap"
            style={{
              display: "block",
              width: "100%",
              padding: 15,
              borderRadius: 14,
              border:
                status === "failed" ? "1.5px solid #e2e8f0" : "none",
              background: status === "failed" ? "#fff" : color,
              color: status === "failed" ? "#0f172a" : "#fff",
              fontSize: 15,
              fontWeight: 700,
              boxShadow:
                status === "failed" ? "none" : `0 8px 24px ${color}40`,
              textDecoration: "none",
            }}
          >
            Kembali ke Beranda
          </Link>

          {status === "success" && (
            <Link
              href="/#portofolio"
              className="tap"
              style={{
                display: "block",
                width: "100%",
                marginTop: 10,
                padding: 12,
                borderRadius: 14,
                border: "1.5px solid #e2e8f0",
                background: "#fff",
                color: "#0f172a",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Lihat Portofolio Kami
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
