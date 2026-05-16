"use client";
import Image from "next/image";
import Jayakarta from "@/public/Jayakarta.svg";
import Burger from "@/public/burger.svg";
import Sidebar from "../Sidebar";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300"  >
      <div className="max-w-6xl mx-auto px-6 py-12" id="contact">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div>
              <Jayakarta className="w-30 h-10 my-3" />
            <p className="text-sm">
              Solusi terbaik untuk mengembangkan bisnis Anda dengan teknologi
              modern.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-medium mb-4">Navigasi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Tentang
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Layanan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-medium mb-4">Kontak</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: jayakartaproduction@email.com</li>
              <li>Telp: +62 877-7201-8559</li>
              <li>Indonesia</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-medium mb-4">Ikuti Kami</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">
                Facebook
              </a>
              <a href="#" className="hover:text-white">
                Instagram
              </a>
              <a href="#" className="hover:text-white">
                Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
          © {new Date().getFullYear()} Jayakarta Pro All rights reserved.
        </div>
      </div>
    </footer>
  );
}
