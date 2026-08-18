import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/services/auth.config";
import { findUserByEmail } from "@/services/user.service";
import { listOrdersForUser } from "@/services/order.service";
import StatusBadge from "@/components/StatusBadge";
import ErrorState from "@/components/ErrorState";
import AccountDropdown from "@/components/AccountDropdown";
import Jayakarta from "@/public/Jayakarta.svg";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/");
  }

  const user = await findUserByEmail(session.user.email);
  if (!user) {
    redirect("/");
  }

  let orders;
  try {
    orders = await listOrdersForUser(user.id);
  } catch {
    return <ErrorState message="Gagal memuat pesanan. Coba muat ulang beberapa saat lagi." />;
  }

  const stats = {
    total: orders.length,
    paid: orders.filter((o) => o.status === "paid").length,
    pending: orders.filter((o) => o.status === "pending").length,
    spent: orders
      .filter((o) => o.status === "paid")
      .reduce((sum, o) => sum + Number(o.amount), 0),
  };

  const cards = [
    { label: "Total Pesanan", value: stats.total },
    { label: "Lunas", value: stats.paid },
    { label: "Menunggu", value: stats.pending },
    { label: "Total Belanja", value: `Rp ${stats.spent.toLocaleString("id-ID")}` },
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="sticky top-0 z-10 bg-gray-900 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link href="/">
            <Jayakarta className="h-8 w-auto" />
          </Link>
          <nav className="flex items-center gap-5 text-sm">
            <Link href="/" className="hover:text-blue-300">
              Beranda
            </Link>
            <Link href="/orders" className="text-blue-300">
              Pesanan Saya
            </Link>
            <AccountDropdown />
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">Pesanan Saya</h1>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div key={card.label} className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                {card.label}
              </div>
              <div className="mt-2 text-2xl font-bold text-gray-900">
                {card.value}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
          {orders.length === 0 ? (
            <div className="px-5 py-16 text-center">
              <p className="text-sm text-gray-600">
                Kamu belum punya pesanan.
              </p>
              <Link
                href="/"
                className="mt-4 inline-block rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700"
              >
                Mulai Belanja
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left text-xs uppercase text-gray-700">
                  <tr>
                    <th className="px-5 py-3">Invoice</th>
                    <th className="px-5 py-3">Paket</th>
                    <th className="px-5 py-3">Total</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Metode</th>
                    <th className="px-5 py-3">Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.order_id} className="border-t border-gray-200">
                      <td className="px-5 py-3">
                        <div className="font-medium text-gray-900">
                          {order.invoice_number ?? "-"}
                        </div>
                        <div className="text-xs text-gray-700">{order.order_id}</div>
                      </td>
                      <td className="px-5 py-3 text-gray-800">{order.plan_name}</td>
                      <td className="px-5 py-3 text-gray-800">
                        Rp {Number(order.amount).toLocaleString("id-ID")}
                      </td>
                      <td className="px-5 py-3">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-5 py-3 text-gray-800">{order.payment_type ?? "-"}</td>
                      <td className="px-5 py-3 text-gray-700">
                        {new Date(order.created_at).toLocaleDateString("id-ID")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
