"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function AccountDropdown() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!session) {
    return (
      <button
        onClick={() =>
          signIn("google")
        }
        className="cursor-pointer bg-blue-400 px-5 py-1 rounded-3xl text-sm"
      >
        Login
      </button>
    );
  }
console.log(session);
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex cursor-pointer items-center gap-2 rounded-full hover:bg-gray-100"
      >
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt="profile"
            width={32}
            height={32}
            className="rounded-full"
          />
        )}

        {/* <span className="max-w-[120px] truncate text-sm">
          {session.user?.name}
        </span> */}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="border-b px-3 py-2">
            <p className="font-medium text-black">{session.user?.name?.split(' ').slice(0, 2).join(' ')}</p>
            <p className="truncate text-[10px] text-black">
              {session.user?.email}
            </p>
          </div>

          <button
            onClick={() => signOut()}
            className="w-full cursor-pointer px-3 py-2 text-left text-red-500 transition hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}