// services/user.service.ts
// Logika aplikasi seputar user — mengorkestrasi repository.

import {
  findUserByEmail as findUserByEmailRepo,
  createUser,
  updateUserRole,
  findAllUsers,
} from "@/repositories/users.repository";
import type { User, UserRole } from "@/domain/user";

export interface FindOrCreateUserInput {
  email: string;
  name?: string | null;
  image?: string | null;
}

const adminEmails = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

function roleForEmail(email: string): UserRole {
  return adminEmails.includes(email.toLowerCase()) ? "admin" : "user";
}

/**
 * Ambil user; kalau belum ada, buat baru.
 * Mengembalikan role user (admin/user) — admin ditentukan dari env ADMIN_EMAILS.
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  return findUserByEmailRepo(email);
}

export async function listAllUsers(): Promise<User[]> {
  return findAllUsers();
}

export async function findOrCreateUser(
  input: FindOrCreateUserInput,
): Promise<UserRole> {
  const existing = await findUserByEmailRepo(input.email);

  if (existing) {
    const desiredRole = roleForEmail(input.email);
    if (existing.role !== desiredRole) {
      await updateUserRole(input.email, desiredRole);
    }
    return desiredRole;
  }

  const role = roleForEmail(input.email);
  await createUser({
    email: input.email,
    name: input.name ?? "",
    image: input.image ?? "",
    role,
  });

  return role;
}
