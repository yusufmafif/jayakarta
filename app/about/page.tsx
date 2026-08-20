import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/nav/Footer";
import Link from "next/link";

export const metadata = {
  title: "Tentang Kami - Jayakarta",
  description:
    "Kenali Jayakarta, tim web developer profesional yang membantu bisnis Anda go digital dengan website modern dan berkualitas.",
};

export default function AboutPage() {
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
        .hover-lift:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
      `}</style>

      <Navbar />

      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ position: "fixed" }}>
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "-5%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
            filter: "blur(50px)",
            animation: "float 8s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            right: "-5%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(219,39,119,0.1) 0%, transparent 70%)",
            filter: "blur(50px)",
            animation: "float 10s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Hero */}
      <section className="relative pt-24 pb-16 text-center" style={{ position: "relative", zIndex: 1 }}>
        <div className="mx-auto max-w-4xl px-6 fade-in">
          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Tentang <span style={{ color: "#93C5FD" }}>Jayakarta</span>
          </h1>
          <p className="mt-5 text-lg" style={{ color: "#6b7280", maxWidth: 600, margin: "20px auto 0" }}>
            Tim web developer profesional yang membantu bisnis Anda go digital
            dengan website modern dan berkualitas.
          </p>
        </div>
      </section>

      {/* Cerita Kami + Stats */}
      <section className="relative pb-20">
        <div className="mx-auto max-w-6xl px-6" style={{ position: "relative", zIndex: 1 }}>
          <div className="grid gap-12 md:grid-cols-2 items-center">
            {/* Cerita */}
            <div className="fade-in" style={{ animationDelay: "0.1s" }}>
              <h2 className="mb-6 text-3xl font-bold" style={{ letterSpacing: "-0.02em" }}>
                Cerita Kami
              </h2>
              <div className="space-y-4" style={{ color: "#9ca3af" }}>
                <p>
                  Jayakarta lahir dari keprihatinan melihat banyak UMKM dan bisnis
                  kecil yang kesulitan memiliki website profesional. Harga mahal,
                  proses ribet, dan hasil yang tidak memuaskan.
                </p>
                <p>
                  Kami percaya setiap bisnis berhak memiliki website yang modern,
                  profesional, dan terjangkau. Bukan sekadar{" "}
                  <span className="text-white font-medium">ada di internet</span>, tapi
                  benar-benar membantu meningkatkan kepercayaan pelanggan.
                </p>
                <p>
                  Dengan pendekatan yang simpel dan transparan, kami membantu
                  bisnis Anda go digital tanpa ribet.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="fade-in flex justify-center" style={{ animationDelay: "0.2s" }}>
              <div
                className="rounded-3xl p-8"
                style={{
                  background: "linear-gradient(145deg, rgba(37,99,235,0.12) 0%, rgba(17,17,17,1) 50%)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div className="grid grid-cols-2 gap-8">
                  {[
                    { value: "50+", label: "Website Dibuat", color: "#93C5FD" },
                    { value: "100%", label: "Kepuasan", color: "#6EE7B7" },
                    { value: "3+", label: "Tahun Pengalaman", color: "#F9A8D4" },
                    { value: "24/7", label: "Support", color: "#FCD34D" },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-4xl font-extrabold" style={{ color: stat.color }}>
                        {stat.value}
                      </div>
                      <div className="mt-1 text-sm" style={{ color: "#6b7280" }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nilai Kami */}
      <section className="relative pb-20">
        <div className="mx-auto max-w-6xl px-6" style={{ position: "relative", zIndex: 1 }}>
          <h2
            className="mb-12 text-center text-3xl font-bold fade-in"
            style={{ letterSpacing: "-0.02em", animationDelay: "0.1s" }}
          >
            Nilai <span style={{ color: "#93C5FD" }}>Kami</span>
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Simpel & Transparan",
                desc: "Tanpa biaya tersembunyi. Harga jelas, proses jelas, hasil jelas.",
                color: "#93C5FD",
              },
              {
                number: "02",
                title: "Cepat & Profesional",
                desc: "Website selesai 3–14 hari sesuai paket. Kualitas tidak dikorbankan.",
                color: "#6EE7B7",
              },
              {
                number: "03",
                title: "Support Berkelanjutan",
                desc: "Kami tidak tinggalkan setelah website selesai. Support selalu ada.",
                color: "#F9A8D4",
              },
            ].map((value, i) => (
              <div
                key={i}
                className="hover-lift rounded-2xl p-8"
                style={{
                  background: "#111111",
                  border: "1px solid rgba(255,255,255,0.07)",
                  animation: `fadeUp 0.5s ease ${0.1 + i * 0.1}s both`,
                }}
              >
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold"
                  style={{
                    background: `${value.color}15`,
                    border: `1px solid ${value.color}30`,
                    color: value.color,
                  }}
                >
                  {value.number}
                </div>
                <h3 className="mb-2 text-xl font-bold">{value.title}</h3>
                <p style={{ color: "#9ca3af" }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cara Kerja */}
      <section className="relative pb-20">
        <div className="mx-auto max-w-4xl px-6" style={{ position: "relative", zIndex: 1 }}>
          <h2
            className="mb-12 text-center text-3xl font-bold fade-in"
            style={{ letterSpacing: "-0.02em", animationDelay: "0.1s" }}
          >
            Cara <span style={{ color: "#93C5FD" }}>Kerja</span>
          </h2>
          <div className="space-y-4">
            {[
              {
                step: "01",
                title: "Pilih Paket",
                desc: "Pilih paket yang sesuai kebutuhan bisnis Anda. Basic, Standard, atau Premium.",
                color: "#6EE7B7",
              },
              {
                step: "02",
                title: "Isi Data & Bayar",
                desc: "Isi informasi bisnis Anda, lalu bayar dengan metode yang nyaman.",
                color: "#93C5FD",
              },
              {
                step: "03",
                title: "Website Dikerjakan",
                desc: "Tim kami mulai mengerjakan website Anda. Progress bisa dipantau.",
                color: "#F9A8D4",
              },
              {
                step: "04",
                title: "Revisi & Launch",
                desc: "Review hasilnya, minta revisi jika perlu, lalu website resmi online!",
                color: "#FCD34D",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="hover-lift flex gap-6 rounded-2xl p-6"
                style={{
                  background: "#111111",
                  border: "1px solid rgba(255,255,255,0.07)",
                  animation: `fadeUp 0.5s ease ${0.1 + i * 0.08}s both`,
                }}
              >
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold"
                  style={{
                    background: `${item.color}15`,
                    border: `1px solid ${item.color}30`,
                    color: item.color,
                  }}
                >
                  {item.step}
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold">{item.title}</h3>
                  <p style={{ color: "#9ca3af" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative pb-20">
        <div className="mx-auto max-w-3xl px-6 text-center" style={{ position: "relative", zIndex: 1 }}>
          <div
            className="rounded-3xl p-12"
            style={{
              background: "linear-gradient(145deg, rgba(37,99,235,0.15) 0%, rgba(17,17,17,1) 60%)",
              border: "1px solid rgba(147,197,253,0.2)",
            }}
          >
            <h2 className="mb-3 text-3xl font-bold" style={{ letterSpacing: "-0.02em" }}>
              Siap Go Digital?
            </h2>
            <p className="mb-8" style={{ color: "#9ca3af" }}>
              Konsultasi gratis tentang kebutuhan website bisnis Anda
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-xl px-8 py-3 font-semibold transition hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, #2563EB, #1d4ed8)",
                  color: "#ffffff",
                }}
              >
                Hubungi Kami
              </Link>
              <Link
                href="/checkout?plan=standard"
                className="rounded-xl px-8 py-3 font-semibold transition hover:scale-[1.02]"
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#d1d5db",
                  background: "rgba(255,255,255,0.05)",
                }}
              >
                Lihat Paket
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
