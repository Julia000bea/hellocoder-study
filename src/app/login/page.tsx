"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Falha ao entrar");
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message ?? "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 px-4">
      <div className="w-full max-w-5xl grid gap-10 lg:grid-cols-[1.2fr,1fr] items-center">
        {/* Lado esquerdo - “mock” do dashboard resumido */}
        <div className="relative">
          <div className="hc-card border-slate-800/70 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="hc-window-dot hc-window-dot-red" />
                <span className="hc-window-dot hc-window-dot-yellow" />
                <span className="hc-window-dot hc-window-dot-green" />
              </div>
              <span className="text-xs uppercase tracking-[0.25em] text-slate-500">
                HELLOCODER
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-lime-400 flex items-center justify-center text-slate-900 font-bold text-xl">
                HC
              </div>
              <div>
                <p className="text-sm text-slate-400">Bem-vindo de volta</p>
                <p className="text-base font-medium">Painel de Estudos</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <div className="hc-card border-slate-800 bg-slate-900/70 p-4">
                <p className="text-xs text-slate-400 mb-1">XP TOTAL</p>
                <p className="text-2xl font-semibold text-emerald-400">3.240</p>
                <p className="text-[11px] text-slate-500 mt-1">
                  +120 hoje na timeline
                </p>
              </div>
              <div className="hc-card border-slate-800 bg-slate-900/70 p-4">
                <p className="text-xs text-slate-400 mb-1">STREAK</p>
                <p className="text-2xl font-semibold text-amber-300">14</p>
                <p className="text-[11px] text-slate-500 mt-1">
                  dias seguidos estudando
                </p>
              </div>
              <div className="hc-card border-slate-800 bg-slate-900/70 p-4">
                <p className="text-xs text-slate-400 mb-1">SESSÕES HOJE</p>
                <p className="text-2xl font-semibold text-sky-400">4</p>
                <p className="text-[11px] text-slate-500 mt-1">
                  pomodoros finalizados
                </p>
              </div>
            </div>

            <div className="hc-card border-dashed border-emerald-500/60 bg-slate-900/60 p-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-400 mb-1">
                  timeline
                </p>
                <p className="text-sm text-slate-200">
                  Continue de onde parou no módulo atual.
                </p>
              </div>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                ▶
              </span>
            </div>
          </div>
        </div>

        {/* Lado direito - formulário */}
        <div className="hc-card bg-slate-950/90 border-slate-800 p-6 sm:p-8">
          <h1 className="text-xl sm:text-2xl font-semibold mb-2">
            Entrar no HelloCoder
          </h1>
          <p className="text-sm text-slate-400 mb-6">
            Acesse seu painel com timeline, pomodoro, revisões e calendário.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                E-mail
              </label>
              <input
                type="email"
                className="hc-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="voce@exemplo.com"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Senha
              </label>
              <input
                type="password"
                className="hc-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="hc-btn-primary w-full mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="mt-6 text-xs text-slate-400">
            Ainda não tem conta?{" "}
            <Link
              href="/register"
              className="text-emerald-400 hover:text-emerald-300"
            >
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
