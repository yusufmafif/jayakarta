"use client";
import Jayakarta from "@/public/Jayakarta.svg";
import Sidebar from "../Sidebar";
import AccountDropdown from "../AccountDropdown";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  const Login = () => {
    if (session) {
      return (
        <>
          Signed in as {session?.user?.email ?? ""} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      );
    }
    return (
      <>
        <button
          onClick={() => signIn("google")}
          className=" cursor-pointer bg-blue-400 px-5 py-1 rounded-3xl text-sm"
        >
          Login
        </button>
      </>
    );
  };

  return (
    <nav className="z-50 flex justify-between w-full sticky top-0 bg-gray-900 px-4 py-2">
      <div className="w-1/4 flex justify-center items-center">
        <div className="text-white">
          <Jayakarta className="w-30 h-10 m-3 ml-15" />
        </div>
      </div>
      <div className="hidden sm:flex w-2/4 justify-center flex items-center space-x-8 text-sm ">
        <Link href="/about" className="cursor-pointer hover:text-gray-300">Tentang</Link>
        <Link href="/#portofolio" className="cursor-pointer hover:text-gray-300">Portofolio</Link>
        <Link href="/contact" className="cursor-pointer hover:text-gray-300">Kontak</Link>
      </div>
      <div className="w-1/4  flex items-center space-x-4 justify-end">
        {/* <Link
          className="bg-blue-400 px-4 py-1 rounded-3xl text-sm"
          href="/#contact"
        >
          <div className="bg-blue-400 px-5 py-1 rounded-3xl text-sm">
            Contact
          </div>
        </Link> */}
          {/* <Login /> */}
          <AccountDropdown />
        
        <div>
          {/* <Burger className="w-8 h-8 text-white" /> */}
          <Sidebar />
        </div>
      </div>
    </nav>
  );
}
