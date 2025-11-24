"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, username, password })
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Erro ao registrar");
      return;
    }

    router.push("/login");
  }

  return (
    <main
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          backgroundColor: "#17162D",
          padding: "32px",
          borderRadius: "16px",
          minWidth: "320px",
          maxWidth: "400px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
        }}
      >
        <h1 style={{ marginBottom: "16px", fontSize: "24px" }}>
          Criar conta
        </h1>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label style={{ fontSize: "14px" }}>
            Nome de usuário
            <input
              type="text"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              style={{
                width: "100%",
                marginTop: "4px",
                padding: "8px 10px",
                borderRadius: "8px",
                border: "1px solid #374151"
              }}
            />
          </label>

          <label style={{ fontSize: "14px" }}>
            E-mail
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                width: "100%",
                marginTop: "4px",
                padding: "8px 10px",
                borderRadius: "8px",
                border: "1px solid #374151"
              }}
            />
          </label>

          <label style={{ fontSize: "14px" }}>
            Senha
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                width: "100%",
                marginTop: "4px",
                padding: "8px 10px",
                borderRadius: "8px",
                border: "1px solid #374151"
              }}
            />
          </label>

          {error && (
            <p style={{ color: "#f87171", fontSize: "14px" }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "8px",
              padding: "10px 14px",
              borderRadius: "10px",
              backgroundColor: "#4FD1C5",
              border: "none",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            {loading ? "Criando..." : "Registrar"}
          </button>
        </form>

        <button
          onClick={() => router.push("/login")}
          style={{
            marginTop: "16px",
            width: "100%",
            padding: "8px",
            borderRadius: "10px",
            border: "1px solid #4FD1C5",
            backgroundColor: "transparent",
            color: "#4FD1C5",
            cursor: "pointer"
          }}
        >
          Já tenho conta
        </button>
      </div>
    </main>
  );
}
