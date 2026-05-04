"use client"

import { useState } from "react"
import Link from "next/link"
import Burger from '@/public/burger.svg'
import Cross from '@/public/cross.svg'
import Jayakarta from "@/public/Jayakarta.svg"


export default function Sidebar() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                className="md:hidden p-4"
                onClick={() => setOpen(!open)}
            >
                {open ? <Cross className=" w-8 h-8 text-white" /> : <Burger className="w-8 h-8 text-white" />}
            </button>

            {/* Overlay Mobile */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="p-2 text-xl font-bold border-b border-gray-700">
                    <Jayakarta className="w-30 h-10 m-3" />
                </div>

                <nav className="flex flex-col p-4 gap-2">
                    <Link href="/" className="hover:bg-gray-800 p-2 rounded">
                        Dashboard
                    </Link>
                    <Link href="/orders" className="hover:bg-gray-800 p-2 rounded">
                        Orders
                    </Link>
                    <Link href="/users" className="hover:bg-gray-800 p-2 rounded">
                        Users
                    </Link>
                </nav>
            </aside>
        </>
    )
}