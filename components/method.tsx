 {/* Method tabs */}
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: 16,
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#94a3b8",
                  letterSpacing: ".08em",
                  marginBottom: 12,
                }}
              >
                METODE BAYAR
              </div>
              <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
                {(
                  [
                    { id: "transfer", label: "Transfer" },
                    { id: "qris", label: "QRIS" },
                    { id: "va", label: "Virtual Acc" },
                  ] as { id: Method; label: string }[]
                ).map((m) => (
                  <button
                    key={m.id}
                    className="tap"
                    onClick={() => setMethod(m.id)}
                    style={{
                      flex: 1,
                      padding: "9px 4px",
                      borderRadius: 10,
                      border: "none",
                      background: method === m.id ? acc : "#f1f5f9",
                      color: method === m.id ? "#fff" : "#64748b",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {/* Transfer */}
              {method === "transfer" &&
                [
                  ["Bank", "BCA"],
                  ["No. Rekening", "841 090 3491"],
                  ["Atas Nama", "Yusuf Muhammad Afif"],
                ].map(([l, v]) => (
                  <div
                    key={l}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 0",
                      borderBottom: "1px solid #f1f5f9",
                      fontSize: 13,
                    }}
                  >
                    <span style={{ color: "#94a3b8" }}>{l}</span>
                    <span style={{ fontWeight: 700, color: "#0f172a" }}>
                      {v}
                    </span>
                  </div>
                ))}

              {/* QRIS */}
              {method === "qris" && (
                <div style={{ textAlign: "center", padding: "8px 0" }}>
                  <div
                    style={{
                      width: 160,
                      height: 160,
                      margin: "0 auto 10px",
                      background: "#f8fafc",
                      borderRadius: 14,
                      border: "1px solid #e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="120"
                      height="120"
                      viewBox="0 0 120 120"
                      fill="none"
                    >
                      {Array.from({ length: 7 }, (_, r) =>
                        Array.from({ length: 7 }, (_, c) => {
                          const on =
                            (r < 3 && c < 3) ||
                            (r < 3 && c > 3) ||
                            (r > 3 && c < 3) ||
                            (r + c) % 2 === 0;
                          return on ? (
                            <rect
                              key={`${r}${c}`}
                              x={10 + c * 14}
                              y={10 + r * 14}
                              width={12}
                              height={12}
                              rx={2}
                              fill="#0f172a"
                            />
                          ) : null;
                        }),
                      )}
                    </svg>
                  </div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>
                    Scan dengan aplikasi bank / e-wallet
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#ef4444",
                      marginTop: 4,
                      fontWeight: 600,
                    }}
                  >
                    Berlaku 15 menit
                  </div>
                </div>
              )}

              {/* VA */}
              {method === "va" &&
                [
                  ["Bank", "BCA"],
                  ["No. VA", "88001 2345 6789 01"],
                  ["Berlaku", "24 jam"],
                ].map(([l, v]) => (
                  <div
                    key={l}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 0",
                      borderBottom: "1px solid #f1f5f9",
                      fontSize: 13,
                    }}
                  >
                    <span style={{ color: "#94a3b8" }}>{l}</span>
                    <span style={{ fontWeight: 700, color: "#0f172a" }}>
                      {v}
                    </span>
                  </div>
                ))}
            </div>