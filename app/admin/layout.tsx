import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/services/auth.config";
import Jayakarta from "@/public/Jayakarta.svg";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  const navLinks = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/orders", label: "Orders" },
    { href: "/admin/packages", label: "Paket" },
    { href: "/admin/users", label: "Users" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="sticky top-0 z-10 bg-gray-900 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link href="/admin">
            <Jayakarta className="h-8 w-auto" />
          </Link>
          <nav className="flex items-center gap-5 text-sm">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-blue-300">
                {link.label}
              </Link>
            ))}
            <Link href="/" className="text-gray-300 hover:text-white">
              ← Situs
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
