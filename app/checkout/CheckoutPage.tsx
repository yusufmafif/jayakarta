"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useSession, signIn, signOut } from "next-auth/react";

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 1000000,
    color: "#10b981",
    desc: "Cocok untuk UMKM yang baru mulai online. Website simpel, cepat jadi, dan langsung bisa dipakai jualan.",
    features: [
      "1 halaman landing page",
      "Desain modern & mobile friendly",
      "Gratis domain .com (1 tahun)",
      "Setup cepat 3-5 hari",
    ],
    image: "/assets.webp",
  },
  {
    id: "standard",
    name: "Bisnis",
    price: 1700000,
    color: "#3b82f6",
    desc: "Untuk bisnis yang ingin tampil profesional dan meningkatkan kepercayaan pelanggan.",
    features: [
      "Semua fitur Starter",
      "Hingga 3 halaman website",
      "Domain .com gratis 1 tahun",
      "Google Maps",
      "Galeri foto",
      "Revisi 3x",
    ],
    image: "/assets.webp",
  },
  {
    id: "premium",
    name: "Pro",
    price: 2500000,
    color: "#440a5f",
    desc: "Solusi lengkap untuk bisnis serius.",
    features: [
      "Semua fitur Bisnis",
      "10 Halaman & katalog produk 50+",
      "Update konten",
      "Revisi 5x",
    ],
    image: "/assets.webp",
  },
];

function formatRp(n: number) {
  return `Rp ${(n / 1_000_000).toLocaleString("id-ID")}jt`;
}

type Step = "detail" | "payment" | "done";
type Method = "transfer" | "qris" | "va";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const router = useRouter();
  const planId = searchParams.get("plan");

  const [plan, setPlan] = useState(() => {
    return plans.find((p) => p.id === planId) ?? plans[0];
  });

  const checkout = async () => {
    const data = {
      id: `ORDER-${uuidv4()}`,
      productName: plan.name,
      price: plan.price + plan.price * 0.11,
      quantity: 1,
    };
    console.log(plans);
    const response = await fetch("/api/tokenizer", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const requestData = await response.json();
    console.log({ requestData });

    window.snap.pay(requestData.token);
  };

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_CLIENT;

    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey!);
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  });

  const [step, setStep] = useState<Step>("detail");
  const [method, setMethod] = useState<Method>("transfer");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const total = Math.round(plan.price * 1.11);
  const acc = plan.color;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Wajib diisi";
    if (!form.email.includes("@")) e.email = "Email tidak valid";
    if (form.phone.length < 9) e.phone = "Nomor tidak valid";
    if (!form.business.trim()) e.business = "Wajib diisi";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const field = (
    key: keyof typeof form,
    label: string,
    placeholder: string,
    type = "text",
  ) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "#64748b",
          letterSpacing: ".04em",
        }}
      >
        {label.toUpperCase()}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[key]}
        onChange={(e) => setForm((v) => ({ ...v, [key]: e.target.value }))}
        style={{
          padding: "12px 14px",
          borderRadius: 12,
          fontSize: 14,
          border: `1.5px solid ${errors[key] ? "#ef4444" : "#e2e8f0"}`,
          background: "#fff",
          fontFamily: "inherit",
          outline: "none",
          color: "#0f172a",
          width: "100%",
          boxShadow: errors[key] ? "0 0 0 3px #ef444420" : "none",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = acc;
          e.currentTarget.style.boxShadow = `0 0 0 3px ${acc}20`;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = errors[key]
            ? "#ef4444"
            : "#e2e8f0";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
      {errors[key] && (
        <span style={{ fontSize: 11, color: "#ef4444" }}>{errors[key]}</span>
      )}
    </div>
  );
  return (
    <div
      className="flex sm:flex-row px-10 flex-col min-h-[calc(100vh-64px)] items-center justify-center font-sans bg-blue-50 rounded-tl-4xl rounded-tr-4xl text-black"
      style={{ alignItems: "flex-start", padding: "24px 16px" }}
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
        {/* ── STEP INDICATOR ── */}
        {step !== "done" && (
          <div
            className="fu"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 20,
            }}
          >
            {(["detail", "payment"] as Step[]).map((s, i) => {
              const done = step === "payment" && s === "detail";
              const active = step === s;
              return (
                <div
                  key={s}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    flex: i === 0 ? "none" : 1,
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 700,
                      background: done ? acc : active ? acc : "#e2e8f0",
                      color: done || active ? "#fff" : "#94a3b8",
                      transition: "all .3s",
                    }}
                  >
                    {done ? "✓" : i + 1}
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: active ? "#0f172a" : "#94a3b8",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {s === "detail" ? "Data Diri" : "Pembayaran"}
                  </span>
                  {i === 0 && (
                    <div
                      style={{
                        flex: 1,
                        height: 1,
                        background: done ? acc : "#e2e8f0",
                        transition: "background .3s",
                        margin: "0 4px",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ══════════ STEP 1 ══════════ */}
        {step === "detail" && (
          <div
            className="fu"
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
          >
            {/* Order summary pill */}
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: 16,
                display: "flex",
                gap: 12,
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              <img
                src={plan.image}
                alt={plan.name}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 12,
                  objectFit: "cover",
                }}
              />

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 800 }}>
                  Paket {plan.name}
                </div>

                <div
                  style={{ fontSize: 11, color: "#64748b", margin: "4px 0" }}
                >
                  {plan.desc}
                </div>

                <ul style={{ fontSize: 11, color: "#94a3b8" }}>
                  {plan.features.slice(0, 2).map((f) => (
                    <li key={f}>• {f}</li>
                  ))}
                </ul>
              </div>

              <div style={{ fontWeight: 800, color: plan.color }}>
                {formatRp(plan.price)}
              </div>
            </div>

            {/* Plan picker */}
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: 16,
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#94a3b8",
                  letterSpacing: ".08em",
                  marginBottom: 10,
                }}
              >
                GANTI PAKET
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {plans.map((p) => (
                  <button
                    key={p.id}
                    className="tap"
                    onClick={() => {
                      setPlan(p);
                      const params = new URLSearchParams(searchParams);

                      params.set("plan", p.id);

                      router.replace(`?${params.toString()}`);
                    }}
                    style={{
                      flex: 1,
                      padding: "9px 4px",
                      borderRadius: 10,
                      border: "none",
                      background: plan.id === p.id ? p.color : "#f1f5f9",
                      color: plan.id === p.id ? "#fff" : "#64748b",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 14,
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#94a3b8",
                  letterSpacing: ".08em",
                }}
              >
                DATA PEMESAN
              </div>
              {field("name", "Nama Lengkap", session?.user?.name)}
              {field("business", "Nama Usaha", session?.user?.name)}
              {field("email", "Email", session?.user?.email, "email")}
              {field("phone", "Nomor HP", "08xxxxxxxxxx", "tel")}
            </div>

            {/* Guarantees */}
            <div style={{ display: "flex", gap: 6 }}>
              {["✓ Setup gratis", "✓ Garansi 14 hari", "✓ Support WA"].map(
                (t) => (
                  <div
                    key={t}
                    style={{
                      flex: 1,
                      background: `${acc}10`,
                      border: `1px solid ${acc}25`,
                      borderRadius: 10,
                      padding: "8px 4px",
                      fontSize: 10,
                      fontWeight: 600,
                      color: "#475569",
                      textAlign: "center",
                    }}
                  >
                    {t}
                  </div>
                ),
              )}
            </div>

            {/* CTA */}
            <button
              className="tap"
              onClick={() => {
                if (validate()) setStep("payment");
              }}
              style={{
                width: "100%",
                padding: 15,
                borderRadius: 14,
                border: "none",
                background: acc,
                color: "#fff",
                fontSize: 15,
                fontWeight: 700,
                boxShadow: `0 8px 24px ${acc}40`,
              }}
            >
              Lanjut ke Pembayaran →
            </button>
          </div>
        )}

        {/* ══════════ STEP 2 ══════════ */}
        {step === "payment" && (
          <div
            className="fu"
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
          >
            <button
              onClick={() => setStep("detail")}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                fontSize: 12,
                color: "#94a3b8",
                fontFamily: "inherit",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              ← Kembali
            </button>

            {/* Amount */}
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: 18,
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#94a3b8",
                  letterSpacing: ".08em",
                  marginBottom: 4,
                }}
              >
                TOTAL PEMBAYARAN
              </div>
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 800,
                  color: acc,
                  letterSpacing: "-.03em",
                }}
              >
                {formatRp(total)}
              </div>
              <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>
                Paket {plan.name} · sudah termasuk PPN 11%
              </div>
            </div>

            <button
              className="tap"
              onClick={() => checkout()}
              style={{
                width: "100%",
                padding: 15,
                borderRadius: 14,
                border: "none",
                background: acc,
                color: "#fff",
                fontSize: 15,
                fontWeight: 700,
                boxShadow: `0 8px 24px ${acc}40`,
              }}
            >
              Bayar Sekarang
            </button>
            <p
              style={{
                fontSize: 11,
                color: "#94a3b8",
                textAlign: "center",
                margin: 0,
              }}
            >
              Konfirmasi otomatis · Verifikasi dalam 1×24 jam
            </p>
          </div>
        )}

        {/* ══════════ STEP 3 ══════════ */}
        {step === "done" && (
          <div
            className="fu"
            style={{ textAlign: "center", padding: "32px 0" }}
          >
            <div
              className="pop"
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: `${acc}18`,
                border: `2px solid ${acc}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M7 16l6 6 12-12"
                  stroke={acc}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h2
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: "#0f172a",
                letterSpacing: "-.03em",
                marginBottom: 8,
              }}
            >
              Pesanan Diterima!
            </h2>
            <p
              style={{
                fontSize: 13,
                color: "#64748b",
                lineHeight: 1.7,
                marginBottom: 24,
                maxWidth: 320,
                margin: "0 auto 24px",
              }}
            >
              Terima kasih <strong>{form.name}</strong>! Kami akan menghubungi{" "}
              <strong>{form.email}</strong> dalam 1×24 jam untuk setup website{" "}
              <em>{form.business}</em>.
            </p>

            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: 18,
                marginBottom: 20,
                textAlign: "left",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              {[
                ["Paket", `Website ${plan.name}`],
                ["Total dibayar", formatRp(total)],
                ["No. Order", `#WEB-${Date.now().toString().slice(-6)}`],
              ].map(([l, v]) => (
                <div
                  key={l}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 13,
                    padding: "8px 0",
                    borderBottom: "1px solid #f8fafc",
                  }}
                >
                  <span style={{ color: "#94a3b8" }}>{l}</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>{v}</span>
                </div>
              ))}
            </div>

            <button
              className="tap"
              onClick={() => {
                setStep("detail");
                setForm({ name: "", email: "", phone: "", business: "" });
              }}
              style={{
                width: "100%",
                padding: 15,
                borderRadius: 14,
                border: "none",
                background: acc,
                color: "#fff",
                fontSize: 15,
                fontWeight: 700,
                boxShadow: `0 8px 24px ${acc}40`,
              }}
            >
              Kembali ke Beranda
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
