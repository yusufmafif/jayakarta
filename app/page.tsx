import Image from "next/image";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/nav/Footer";
import { Lato } from "next/font/google";
import Link from "next/link";
import PricingSection from "@/components/PricingSection";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300"],
});

export default function Home() {
  return (
    <div className="bg-white">
      <Navbar />
      <div className="flex sm:flex-row flex-col min-h-[calc(100vh-64px)] items-center justify-center bg-zinc-50 font-sans ">
        <div className="flex  min-h-[calc(100vh-64px)] w-full flex-col items-center justify-center  bg-white">
          <h1 className="text-white font-medium text-xl mb-5 bg-gray-900 px-5 rounded-full">
            Our Web Services
          </h1>
          <div className="flex flex-col items-center gap-6 text-center text-center">
            <Image
              className="md:hidden h-full object-cover animate-fade-in lg:mr-25 mr-0 -mb-10"
              src="/assets1.png"
              alt="Next.js logo"
              width={400}
              height={400}
              priority
            />
            <h1
              className={`${lato.className} sm:max-w-lg max-w-md md:text-5xl text-4xl leading-none  tracking-tight text-black text-center px-5`}
            >
              Kembangkan bisnis anda dengan kami
            </h1>
            <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400 text-center tracking-tight leading-tight px-5">
              Buat website untuk bisnismu agar lebih meyakinkan di mata calon
              customermu{" "}
              {/* <a
                href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                className="font-medium text-zinc-400"
              >
                Templates
              </a>{" "}
              or{" "}
             */}
            </p>
            <div className="flex flex gap-4 text-base font-medium text-md">
              <a
                className="bg-foreground flex h-12 w-auto items-center  text-black hover:text-white justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[170px]"
                href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hubungi Kami
              </a>
              <Link
                className="bg-foreground flex h-12 w-auto items-center text-black hover:text-white justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[170px]"
                href="/#portofolio"
              >
                Portofolio Kami
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden md:flex min-h-[calc(100vh-64px)] w-full flex-col items-center justify-center bg-white">
          <Image
            className="h-full object-cover animate-fade-in lg:mr-25 mr-0"
            src="/assets1.png"
            alt="Next.js logo"
            width={700}
            height={800}
            priority
          />
        </div>
      </div>

        <div
          id="portofolio"
          className="flex sm:flex-row px-10 flex-col min-h-[calc(100vh-64px)] items-center justify-center font-sans bg-blue-50 rounded-tl-4xl rounded-tr-4xl"
        >
          <div className="max-w-6xl mx-auto ">
           <h1
          className="text-center mt-7 md:mt-0 mb-7 md:mb-14"
          style={{
            fontSize: "clamp(36px, 4vw, 64px)",
            fontWeight: 800,
            lineHeight: 0.9,
            color: "#050405",
            letterSpacing: "-0.03em",
          }}
        >
          Portofolio
          <span style={{ color: "#52a3ff" }}> Kami</span>
        </h1>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-black mb-7">
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden">
                <img
                  src="https://jadwal-sholat-pdf.netlify.app/Mosque.jpg?auto=compress&cs=tinysrgb&w=1260&h=750"
                  alt="project"
                  className="w-full h-48 object-cover"
                />

                <div className="p-5">
                  <h2 className="text-xl font-semibold mb-2">
                    Jadwal Sholat PDF maker
                  </h2>

                  <p className="text-sm text-zinc-600 mb-4">
                    Jadwal Sholat is a project that provide a simple way to get
                    the praying time and template to print out.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-zinc-100 px-2 py-1 rounded">
                      Svelte
                    </span>
                    <span className="text-xs bg-zinc-100 px-2 py-1 rounded">
                      MapLibre
                    </span>
                    <span className="text-xs bg-zinc-100 px-2 py-1 rounded">
                      Supabase
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href="https://jadwal-sholat-pdf.netlify.app/"
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      Demo
                    </a>
                    <a
                      href="#"
                      className="text-sm font-medium text-zinc-700 hover:underline"
                    >
                      Github
                    </a>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden">
                <img
                  src="https://jayakarta-production.netlify.app/Butcher.jpg?auto=compress&cs=tinysrgb&w=1260&h=750"
                  alt="project"
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h2 className="text-xl font-semibold mb-2">
                    Website Ikhwan Butcher
                  </h2>
                  <p className="text-sm text-zinc-600 mb-4">
                    Modern website with responsive and SEO friendly.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-zinc-100 px-2 py-1 rounded">
                      Next.js
                    </span>
                    <span className="text-xs bg-zinc-100 px-2 py-1 rounded">
                      Tailwind
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href="https://ikhwan-butcher.vercel.app/"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Demo
                    </a>
                    <a
                      href="#"
                      className="text-sm text-zinc-700 hover:underline"
                    >
                      Github
                    </a>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden">
                <img
                  src="https://jayakarta-production.netlify.app/Butcher.jpg?auto=compress&cs=tinysrgb&w=1260&h=750"
                  alt="project"
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h2 className="text-xl font-semibold mb-2">
                    Website Company Profile
                  </h2>
                  <p className="text-sm text-zinc-600 mb-4">
                    Website modern dengan landing page responsive dan SEO
                    friendly.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-zinc-100 px-2 py-1 rounded">
                      Next.js
                    </span>
                    <span className="text-xs bg-zinc-100 px-2 py-1 rounded">
                      Tailwind
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href="https://ikhwan-butcher.vercel.app/"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Demo
                    </a>
                    <a
                      href="#"
                      className="text-sm text-zinc-700 hover:underline"
                    >
                      Github
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <PricingSection/>
      <Footer />
    </div>
  );
}
