import Link from "next/link";
import { getAdminStats, listOrders } from "@/services/order.service";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [stats, recentOrders] = await Promise.all([
    getAdminStats(),
    listOrders(),
  ]);

  const cards = [
    {
      label: "Total Pesanan",
      value: stats.totalOrders.toLocaleString("id-ID"),
      href: "/admin/orders",
    },
    {
      label: "Pesanan Lunas",
      value: stats.paidOrders.toLocaleString("id-ID"),
      href: "/admin/orders",
    },
    {
      label: "Pendapatan",
      value: `Rp ${stats.revenue.toLocaleString("id-ID")}`,
      href: "/admin/orders",
    },
    {
      label: "Total User",
      value: stats.totalUsers.toLocaleString("id-ID"),
      href: "/admin/users",
    },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              {card.label}
            </div>
            <div className="mt-2 text-2xl font-bold text-gray-900">
              {card.value}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Pesanan Terbaru</h2>
          <Link href="/admin/orders" className="text-sm text-blue-600 hover:underline">
            Lihat semua →
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          {recentOrders.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-gray-400">
              Belum ada pesanan.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-5 py-3">Order</th>
                  <th className="px-5 py-3">Pelanggan</th>
                  <th className="px-5 py-3">Paket</th>
                  <th className="px-5 py-3">Total</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.slice(0, 5).map((order) => (
                  <tr key={order.order_id} className="border-t border-gray-100">
                    <td className="px-5 py-3 font-medium">{order.order_id}</td>
                    <td className="px-5 py-3">{order.customer_name}</td>
                    <td className="px-5 py-3">{order.plan_name}</td>
                    <td className="px-5 py-3">
                      Rp {Number(order.amount).toLocaleString("id-ID")}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    paid: "bg-green-100 text-green-700",
    pending: "bg-amber-100 text-amber-700",
    failed: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-semibold ${
        styles[status] ?? "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}
