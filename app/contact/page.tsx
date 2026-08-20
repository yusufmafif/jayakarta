import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/nav/Footer";
import Link from "next/link";

export const metadata = {
  title: "Kontak - Jayakarta",
  description:
    "Hubungi Jayakarta untuk konsultasi gratis tentang pembuatan website bisnis Anda.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        .fade-in { animation: fadeUp 0.5s ease both; }
        .hover-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .hover-lift:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.4); }
        .contact-input {
          width: 100%;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          padding: 12px 16px;
          font-size: 14px;
          color: #f9fafb;
          outline: none;
          transition: border-color 0.2s;
        }
        .contact-input:focus { border-color: #2563EB; }
        .contact-input::placeholder { color: #4b5563; }
      `}</style>

      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ position: "fixed" }}>
        <div
          style={{
            position: "absolute",
            top: "5%",
            right: "10%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)",
            filter: "blur(50px)",
            animation: "float 8s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "5%",
            width: 350,
            height: 350,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(5,150,105,0.08) 0%, transparent 70%)",
            filter: "blur(50px)",
            animation: "float 10s ease-in-out infinite reverse",
          }}
        />
      </div>

      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-12 text-center" style={{ position: "relative", zIndex: 1 }}>
        <div className="mx-auto max-w-4xl px-6 fade-in">
          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Hubungi <span style={{ color: "#6EE7B7" }}>Kami</span>
          </h1>
          <p className="mt-5 text-lg" style={{ color: "#6b7280", maxWidth: 550, margin: "20px auto 0" }}>
            Konsultasi gratis tentang kebutuhan website bisnis Anda.
          </p>
        </div>
      </section>

      {/* Konten Utama */}
      <section className="relative pb-20">
        <div className="mx-auto max-w-6xl px-6" style={{ position: "relative", zIndex: 1 }}>
          <div className="grid gap-10 md:grid-cols-2">
            {/* Kiri — Info Kontak */}
            <div className="space-y-4 fade-in" style={{ animationDelay: "0.1s" }}>
              <h2 className="mb-2 text-2xl font-bold" style={{ letterSpacing: "-0.02em" }}>
                Mari Berbicara
              </h2>
              <p className="mb-4" style={{ color: "#9ca3af" }}>
                Kami siap membantu Anda membangun website yang profesional.
                Konsultasi awal gratis tanpa komitmen.
              </p>

              {/* WhatsApp */}
              <a
                href="https://wa.me/6281234567890?text=Halo%20Jayakarta%2C%20saya%20tertarik%20dengan%20paket%20website"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-lift flex items-center gap-4 rounded-2xl p-5"
                style={{
                  background: "rgba(5,150,105,0.08)",
                  border: "1px solid rgba(110,231,183,0.15)",
                }}
              >
                <div
                  className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold"
                  style={{ background: "rgba(5,150,105,0.2)", border: "1px solid rgba(110,231,183,0.3)", color: "#6EE7B7" }}
                >
                  WA
                </div>
                <div>
                  <div className="font-semibold">WhatsApp</div>
                  <div className="text-sm" style={{ color: "#9ca3af" }}>
                    Chat langsung untuk respons cepat
                  </div>
                  <div className="mt-1 text-sm font-medium" style={{ color: "#6EE7B7" }}>
                    0812-3456-7890
                  </div>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:halo@jayakarta.id"
                className="hover-lift flex items-center gap-4 rounded-2xl p-5"
                style={{
                  background: "rgba(37,99,235,0.06)",
                  border: "1px solid rgba(147,197,253,0.15)",
                }}
              >
                <div
                  className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold"
                  style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(147,197,253,0.3)", color: "#93C5FD" }}
                >
                  @
                </div>
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-sm" style={{ color: "#9ca3af" }}>
                    Untuk pertanyaan bisnis & penawaran
                  </div>
                  <div className="mt-1 text-sm font-medium" style={{ color: "#93C5FD" }}>
                    halo@jayakarta.id
                  </div>
                </div>
              </a>

              {/* Lokasi */}
              <div
                className="hover-lift flex items-center gap-4 rounded-2xl p-5"
                style={{
                  background: "#111111",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", color: "#d1d5db" }}
                >
                  ID
                </div>
                <div>
                  <div className="font-semibold">Lokasi</div>
                  <div className="text-sm" style={{ color: "#9ca3af" }}>
                    Jakarta, Indonesia
                  </div>
                  <div className="text-sm" style={{ color: "#6b7280" }}>
                    Remote-first, melayani seluruh Indonesia
                  </div>
                </div>
              </div>
            </div>

            {/* Kanan — Formulir */}
            <div
              className="fade-in rounded-3xl p-8"
              style={{
                background: "#111111",
                border: "1px solid rgba(255,255,255,0.07)",
                animationDelay: "0.2s",
              }}
            >
              <h3 className="mb-2 text-xl font-bold">Kirim Pesan Cepat</h3>
              <p className="mb-6 text-sm" style={{ color: "#6b7280" }}>
                Isi formulir singkat ini, pesan akan langsung terkirim ke WhatsApp kami.
              </p>

              <form
                action="https://wa.me/6281234567890"
                method="GET"
                target="_blank"
                className="space-y-4"
              >
                <div>
                  <label className="mb-1 block text-sm font-medium" style={{ color: "#d1d5db" }}>
                    Nama Anda
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Contoh: Budi Santoso"
                    className="contact-input"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium" style={{ color: "#d1d5db" }}>
                    Nama Usaha
                  </label>
                  <input
                    type="text"
                    name="business"
                    placeholder="Contoh: Toko Berkah"
                    className="contact-input"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium" style={{ color: "#d1d5db" }}>
                    Paket yang Diminati
                  </label>
                  <select name="plan" className="contact-input" style={{ color: "#9ca3af" }}>
                    <option value="">Pilih paket (opsional)</option>
                    <option value="basic">Basic - Rp 1jt</option>
                    <option value="standard">Standard - Rp 1.7jt</option>
                    <option value="premium">Premium - Rp 2.5jt</option>
                    <option value="custom">Konsultasi Kebutuhan</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium" style={{ color: "#d1d5db" }}>
                    Pesan
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Ceritakan kebutuhan website Anda..."
                    className="contact-input"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl py-3 font-semibold transition hover:scale-[1.01]"
                  style={{
                    background: "linear-gradient(135deg, #059669, #047857)",
                    color: "#ffffff",
                  }}
                >
                  Kirim via WhatsApp
                </button>

                <p className="text-center text-xs" style={{ color: "#4b5563" }}>
                  Biasanya kami merespon dalam 1×24 jam
                </p>
              </form>

              {/* CTA */}
              <div
                className="mt-8 pt-6 text-center"
                style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
              >
                <p className="mb-3 text-sm" style={{ color: "#6b7280" }}>
                  Sudah yakin dengan paketnya?
                </p>
                <Link
                  href="/checkout?plan=standard"
                  className="inline-block rounded-xl px-6 py-3 text-sm font-semibold transition hover:scale-[1.02]"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#d1d5db",
                  }}
                >
                  Langsung Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative pb-20">
        <div className="mx-auto max-w-3xl px-6" style={{ position: "relative", zIndex: 1 }}>
          <h2
            className="mb-8 text-center text-2xl font-bold fade-in"
            style={{ letterSpacing: "-0.02em", animationDelay: "0.1s" }}
          >
            Pertanyaan <span style={{ color: "#93C5FD" }}>Umum</span>
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Berapa lama website selesai?",
                a: "Basic 3–5 hari kerja, Standard 5–7 hari, Premium 7–14 hari. Waktu bisa berubah sesuai kompleksitas.",
                color: "#93C5FD",
              },
              {
                q: "Apakah sudah termasuk hosting?",
                a: "Ya, hosting gratis termasuk. Basic 6 bulan, Standard & Premium 1 tahun. Setelah itu biaya perpanjangan terjangkau.",
                color: "#6EE7B7",
              },
              {
                q: "Bisa revisi kalau kurang cocok?",
                a: "Tentu! Basic 1x revisi, Standard 3x, Premium 5x revisi gratis.",
                color: "#F9A8D4",
              },
              {
                q: "Metode pembayaran apa yang diterima?",
                a: "Transfer bank (BCA, BRI, Mandiri), QRIS, kartu kredit, GoPay, ShopeePay, dan e-wallet lainnya.",
                color: "#FCD34D",
              },
              {
                q: "Apakah bisa custom desain?",
                a: "Bisa! Hubungi kami untuk konsultasi kebutuhan spesifik bisnis Anda.",
                color: "#6EE7B7",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="hover-lift rounded-2xl p-6"
                style={{
                  background: "#111111",
                  border: "1px solid rgba(255,255,255,0.07)",
                  animation: `fadeUp 0.5s ease ${0.1 + i * 0.08}s both`,
                }}
              >
                <h3 className="mb-2 font-semibold">{faq.q}</h3>
                <p className="text-sm" style={{ color: "#9ca3af" }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
