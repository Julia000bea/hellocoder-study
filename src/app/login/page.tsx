"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Erro ao fazer login");
      return;
    }

    router.push("/dashboard");
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
          HelloCoder - Login
        </h1>
        <p style={{ marginBottom: "24px", color: "#9CA3AF" }}>
          Entre para acessar seu painel de estudos.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <button
          onClick={() => router.push("/register")}
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
          Criar conta
        </button>
      </div>
    </main>
  );
}
