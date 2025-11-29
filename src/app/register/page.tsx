"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setErrorMsg(data.error || "Falha ao registrar");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-slate-900 p-6 rounded-xl shadow-xl border border-slate-800"
      >
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Criar Conta
        </h1>

        {errorMsg && (
          <div className="text-red-400 text-sm mb-3">{errorMsg}</div>
        )}

        <div className="mb-4">
          <label className="text-white text-sm">Nome</label>
          <input
            type="text"
            className="w-full mt-1 p-2 rounded bg-slate-800 text-white border border-slate-700"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Seu nome"
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-white text-sm">E-mail</label>
          <input
            type="email"
            className="w-full mt-1 p-2 rounded bg-slate-800 text-white border border-slate-700"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="seu@email.com"
            required
          />
        </div>

        <div className="mb-6">
          <label className="text-white text-sm">Senha</label>
          <input
            type="password"
            className="w-full mt-1 p-2 rounded bg-slate-800 text-white border border-slate-700"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded transition"
        >
          {loading ? "Criando conta..." : "Registrar"}
        </button>

        <p className="text-slate-400 text-sm text-center mt-4">
          Já tem conta?{" "}
          <a
            href="/login"
            className="text-blue-400 hover:underline"
          >
            Entrar
          </a>
        </p>
      </form>
    </div>
  );
}
