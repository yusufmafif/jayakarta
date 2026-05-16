"use client";
import Image from "next/image";
import Jayakarta from "@/public/Jayakarta.svg";
import Burger from "@/public/burger.svg";
import Sidebar from "../Sidebar";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="z-1 flex justify-between w-full sticky top-0 bg-gray-900 px-4 py-2">
      <div className="w-1/4 flex justify-center items-center">
        <div className="text-white">
          <Jayakarta className="w-30 h-10 m-3 ml-15" />
        </div>
      </div>
      <div className="hidden sm:flex w-2/4 justify-center flex items-center space-x-8 text-sm">
        <div>Services</div>
        <div>Projects</div>
        <div>About</div>
      </div>
      <div className=" w-1/4 flex justify-center items-center">
        <Link className="hidden sm:block bg-blue-400 px-4 py-1 rounded-3xl text-sm"
         href="/#contact"
        >
          Contact
        </Link>
      </div>
      <div className="w-1/4 sm:hidden flex items-center space-x-4 justify-end">
        <Link
          className="bg-blue-400 px-4 py-1 rounded-3xl text-sm"
          href="/#contact"
        >
          <div className="bg-blue-400 px-5 py-1 rounded-3xl text-sm">
            Contact
          </div>
        </Link>
        <div>
          {/* <Burger className="w-8 h-8 text-white" /> */}
          <Sidebar />
        </div>
      </div>
    </nav>
  );
}
