// domain/user.ts
// Tipe & konstanta seputar user.

export type UserRole = "admin" | "user";

export interface User {
  id: number;
  email: string;
  name: string;
  image: string;
  role: UserRole;
}
