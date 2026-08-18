export default function ErrorState({ message }: { message?: string }) {
  return (
    <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
      <p className="text-sm text-gray-500">
        {message ??
          "Gagal memuat data. Coba muat ulang halaman beberapa saat lagi."}
      </p>
    </div>
  );
}
