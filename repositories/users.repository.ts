// repositories/users.repository.ts
// Akses data tabel `users` — satu-satunya tempat query user ke Turso.

import { db } from "@/integrations/turso";
import type { User, UserRole } from "@/domain/user";

export async function findUserByEmail(email: string): Promise<User | null> {
  const result = await db.execute({
    sql: "SELECT * FROM users WHERE email = ?",
    args: [email],
  });

  if (!result.rows[0]) return null;
  return result.rows[0] as unknown as User;
}

export async function createUser(
  input: Omit<User, "role" | "id"> & { role: UserRole },
): Promise<void> {
  await db.execute({
    sql: "INSERT INTO users (email, name, image, role) VALUES (?, ?, ?, ?)",
    args: [input.email, input.name, input.image, input.role],
  });
}

export async function updateUserRole(
  email: string,
  role: UserRole,
): Promise<void> {
  await db.execute({
    sql: "UPDATE users SET role = ? WHERE email = ?",
    args: [role, email],
  });
}

export async function countUsers(): Promise<number> {
  const result = await db.execute("SELECT COUNT(*) AS total FROM users");
  return Number(result.rows[0]?.total ?? 0);
}

export async function findAllUsers(): Promise<User[]> {
  const result = await db.execute(
    "SELECT * FROM users ORDER BY email ASC",
  );
  return result.rows as unknown as User[];
}
