import { listOrders } from "@/services/order.service";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await listOrders();

  const statusStyles: Record<string, string> = {
    paid: "bg-green-100 text-green-700",
    pending: "bg-amber-100 text-amber-700",
    failed: "bg-red-100 text-red-700",
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Orders</h1>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        {orders.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-gray-400">
            Belum ada pesanan. Pesanan akan muncul di sini setelah customer
            checkout.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
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
                  <tr key={order.order_id} className="border-t border-gray-100">
                    <td className="px-5 py-3 font-medium">{order.order_id}</td>
                    <td className="px-5 py-3">
                      {order.customer_name}
                      <div className="text-xs text-gray-400">
                        {order.customer_email}
                      </div>
                    </td>
                    <td className="px-5 py-3">{order.business_name ?? "-"}</td>
                    <td className="px-5 py-3">{order.plan_name}</td>
                    <td className="px-5 py-3">
                      Rp {Number(order.amount).toLocaleString("id-ID")}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${
                          statusStyles[order.status] ?? "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">{order.payment_type ?? "-"}</td>
                    <td className="px-5 py-3 text-gray-500">
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
