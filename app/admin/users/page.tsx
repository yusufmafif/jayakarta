import ErrorState from "@/components/ErrorState";
import { listAllUsers } from "@/services/user.service";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  let users;
  try {
    users = await listAllUsers();
  } catch {
    return <ErrorState message="Gagal memuat daftar user. Coba muat ulang beberapa saat lagi." />;
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Users</h1>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        {users.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-gray-600">
            Belum ada user.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs uppercase text-gray-600">
                <tr>
                  <th className="px-5 py-3">Nama</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.email} className="border-t border-gray-100">
                    <td className="px-5 py-3 font-medium text-gray-900">{user.name}</td>
                    <td className="px-5 py-3 text-gray-900">{user.email}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {user.role}
                      </span>
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
