import StatusBadge from "@/components/StatusBadge";
import ErrorState from "@/components/ErrorState";
import { listOrders } from "@/services/order.service";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  let orders;
  try {
    orders = await listOrders();
  } catch {
    return (
      <ErrorState message="Gagal memuat daftar pesanan. Coba muat ulang beberapa saat lagi." />
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Orders</h1>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        {orders.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm">
            Belum ada pesanan. Pesanan akan muncul di sini setelah customer
            checkout.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs uppercase text-gray-700">
                <tr>
                  <th className="px-5 py-3">Order</th>
                  <th className="px-5 py-3">Pelanggan</th>
                  <th className="px-5 py-3">Usaha</th>
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
                    <td className="px-5 py-3 font-medium text-gray-900">{order.order_id}</td>
                    <td className="px-5 py-3">
                      <span className="text-gray-900">{order.customer_name}</span>
                      <div className="text-xs text-gray-700">{order.customer_email}</div>
                    </td>
                    <td className="px-5 py-3 text-gray-800">{order.business_name ?? "-"}</td>
                    <td className="px-5 py-3 text-gray-800">{order.plan_name}</td>
                    <td className="px-5 py-3 text-gray-800">
                      Rp {Number(order.amount).toLocaleString("id-ID")}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-5 py-3 text-gray-800">{order.payment_type ?? "-"}</td>
                    <td className="px-5 py-3 text-gray-700">
                      {new Date(order.created_at).toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
