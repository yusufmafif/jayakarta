import { db } from "@/lib/turso";

export default async function Page() {
  const { rows } = await db.execute("SELECT * FROM users");
console.log(rows);
  return (
    <ul>
      {rows.map((row) => (
        <li key={row.id}>
          <p>{row.id}</p>
          <p>{row.name}</p>
          <p>{row.email}</p>
          <p>{row.image}</p>
          <p>{row.role}</p>
        </li>
      ))}
    </ul>
  );
}
