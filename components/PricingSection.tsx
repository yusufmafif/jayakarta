"use client";

import { useState } from "react";
import Link from "next/link";
const plans = [
  {
    id: "basic",
    name: "Basic",
    tagline: "Mulai go digital",
    monthly: 1000000,
    yearly: 4900000,
    color: "#6EE7B7",
    accent: "#059669",
    features: [
      { text: "Landing page 1 halaman", included: true },
      { text: "Hosting gratis 6 bulan", included: true },
      { text: "Desain simple & modern", included: true },
      { text: "Tombol WhatsApp & kontak", included: true },
      { text: "Mobile friendly", included: true },
      { text: "Revisi 1x", included: true },
    ],
  },
  {
    id: "standard",
    name: "Standard",
    tagline: "Jualan online serius",
    monthly: 1700000,
    yearly: 11500000,
    color: "#93C5FD",
    accent: "#2563EB",
    popular: true,
    features: [
      { text: "Semua fitur Starter", included: true },
      { text: "Hingga 3 halaman website", included: true },
      { text: "Domain .com gratis 1 tahun", included: true },
      { text: "Google Maps", included: true },
      { text: "Galeri foto", included: true },
      { text: "Revisi 3x", included: true },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Skala bisnis penuh",
    monthly: 2500000,
    yearly: 24000000,
    color: "#F9A8D4",
    accent: "#DB2777",
    features: [
      { text: "Semua fitur Bisnis", included: true },
      { text: "10 Halaman & katalog produk 50+", included: true },
      { text: "Update konten", included: true },
      { text: "Revisi 5x", included: true },
    ],
  },
];

function formatRupiah(n: number) {
  if (n >= 1_000_000)
    return `Rp ${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}jt`;
  return `Rp ${(n / 1000).toFixed(0)}rb`;
}

export default function PricingSection() {
  const [yearly, setYearly] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0px 0px",
        fontFamily: "'Sora', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        .plan-card {
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1),
                      box-shadow 0.35s ease;
        }
        .plan-card:hover {
          transform: translateY(-10px) scale(1.02);
        }
        .toggle-pill {
          transition: background 0.25s ease, transform 0.25s ease;
        }
        .feature-row {
          animation: fadeUp 0.5s ease both;
        }
      `}</style>

      {/* Background blobs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div
          className="pricing-wrapper"
          style={{
            position: "absolute",
            top: "-10%",
            left: "-5%",
            //   width: 500, height: 500, borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)",
            filter: "blur(40px)",
            animation: "float 8s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-15%",
            right: "-5%",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(219,39,119,0.12) 0%, transparent 70%)",
            filter: "blur(50px)",
            animation: "float 10s ease-in-out infinite reverse",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "40%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(5,150,105,0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Header */}
      <div
        className="mt-14 md:mt-0"
        style={{
          textAlign: "center",
          marginBottom: 56,
          animation: "fadeUp 0.6s ease both",
          position: "relative",
          zIndex: 0,
        }}
      >
        <h1
          className="mt-5"
          style={{
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 800,
            lineHeight: 1.05,
            color: "#ffffff",
            letterSpacing: "-0.03em",
            margin: "10px 0 16px",
          }}
        >
          Paket
          <span style={{ color: "#93C5FD" }}> Website</span>
        </h1>
        <p
          style={{
            color: "#6b7280",
            fontSize: 16,
            maxWidth: 700,
            margin: "0 auto 0px",
            lineHeight: 1.3,
          }}
        >
          Tampil lebih profesional, meyakinkan di mata pelanggan.
        </p>
      </div>

      {/* Cards */}
      <div
        className="pricing-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
          width: "100%",
          maxWidth: 1200,
          position: "relative",
          zIndex: 0,
        }}
      >
        {plans.map((plan, i) => {
          const price = yearly ? plan.yearly : plan.monthly;
          const isHovered = hovered === plan.id;

          return (
            <div
              key={plan.id}
              className="plan-card sm:mx-0 mx-5"
              onMouseEnter={() => setHovered(plan.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: plan.popular
                  ? "linear-gradient(145deg, rgba(37,99,235,0.18) 0%, rgba(15,15,15,1) 50%)"
                  : "#111111",
                border: plan.popular
                  ? `1px solid rgba(147,197,253,0.35)`
                  : isHovered
                    ? `1px solid rgba(255,255,255,0.15)`
                    : `1px solid rgba(255,255,255,0.07)`,
                borderRadius: 24,
                padding: "15px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 28,
                position: "relative",
                overflow: "hidden",
                animation: `fadeUp 0.6s ease ${0.1 + i * 0.12}s both`,
                boxShadow: plan.popular
                  ? `0 0 60px rgba(37,99,235,0.15), 0 20px 60px rgba(0,0,0,0.5)`
                  : isHovered
                    ? `0 20px 60px rgba(0,0,0,0.4)`
                    : "0 8px 32px rgba(0,0,0,0.3)",
              }}
            >
              {/* Decorative top glow */}
              <div
                style={{
                  position: "absolute",
                  top: -60,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 200,
                  height: 120,
                  background: `radial-gradient(ellipse, ${plan.color}22 0%, transparent 70%)`,
                  pointerEvents: "none",
                  transition: "opacity 0.3s",
                  opacity: isHovered ? 1 : 0.5,
                }}
              />

              {/* Popular badge */}
              {plan.popular && (
                <div
                  style={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    color: "#93C5FD",
                    background: "rgba(37,99,235,0.25)",
                    border: "1px solid rgba(147,197,253,0.3)",
                    padding: "4px 12px",
                    borderRadius: 999,
                    textTransform: "uppercase",
                  }}
                >
                  Populer
                </div>
              )}

              {/* Plan header */}
              <div>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: `${plan.color}20`,
                    border: `1px solid ${plan.color}40`,
                    marginBottom: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: plan.color,
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#f9fafb",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {plan.name}
                </div>
                <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
                  {plan.tagline}
                </div>
              </div>

              {/* Price */}
              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                  paddingTop: 24,
                }}
              >
                <div
                  style={{
                    fontSize: 40,
                    fontWeight: 800,
                    color: "#ffffff",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    transition: "color 0.2s",
                  }}
                >
                  <span style={{ color: plan.color }}>
                    {formatRupiah(price)}
                  </span>
                  <span
                    style={{ fontSize: 14, fontWeight: 400, color: "#6b7280" }}
                  >
                    /{yearly ? "thn" : "bln"}
                  </span>
                </div>
                {yearly && (
                  <div style={{ fontSize: 12, color: "#4b5563", marginTop: 0 }}>
                    setara {formatRupiah(Math.round(price / 12))}/bln
                  </div>
                )}
              </div>

              {/* Features */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  flex: 1,
                }}
              >
                {plan.features.map((f, fi) => (
                  <div
                    key={fi}
                    className="feature-row"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: 13,
                      color: f.included ? "#d1d5db" : "#374151",
                      animationDelay: `${0.1 + i * 0.12 + fi * 0.04}s`,
                    }}
                  >
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: f.included
                          ? `${plan.color}20`
                          : "rgba(255,255,255,0.04)",
                      }}
                    >
                      {f.included ? (
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                        >
                          <path
                            d="M2 5l2 2 4-4"
                            stroke={plan.color}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <div
                          style={{
                            width: 6,
                            height: 1,
                            background: "#374151",
                            borderRadius: 1,
                          }}
                        />
                      )}
                    </div>
                    <span
                      style={{
                        textDecoration: f.included ? "none" : "line-through",
                        textDecorationColor: "#374151",
                      }}
                    >
                      {f.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link href={`/checkout?plan=${plan.id}`}>
                <button
                  style={{
                    width: "100%",
                    padding: "14px 0",
                    borderRadius: 12,
                    border: plan.popular
                      ? "none"
                      : `1px solid rgba(255,255,255,0.12)`,
                    background: plan.popular
                      ? `linear-gradient(135deg, #2563EB, #1d4ed8)`
                      : "rgba(255,255,255,0.05)",
                    color: plan.popular ? "#ffffff" : "#d1d5db",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    letterSpacing: "0.02em",
                    transition: "all 0.2s ease",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    const btn = e.currentTarget;
                    if (!plan.popular) {
                      btn.style.background = "rgba(255,255,255,0.1)";
                      btn.style.borderColor = "rgba(255,255,255,0.2)";
                    } else {
                      btn.style.background =
                        "linear-gradient(135deg, #1d4ed8, #1e40af)";
                    }
                    btn.style.transform = "scale(0.99)";
                  }}
                  onMouseLeave={(e) => {
                    const btn = e.currentTarget;
                    if (!plan.popular) {
                      btn.style.background = "rgba(255,255,255,0.05)";
                      btn.style.borderColor = "rgba(255,255,255,0.12)";
                    } else {
                      btn.style.background =
                        "linear-gradient(135deg, #2563EB, #1d4ed8)";
                    }
                    btn.style.transform = "scale(1)";
                  }}
                >
                  Mulai dengan {plan.name} →
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
