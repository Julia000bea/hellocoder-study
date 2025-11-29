"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  totalXp: number;
  streakDays: number;
  followers: number;
  following: number;
};

type Activity = {
  id: number;
  title: string;
  done: boolean;
  createdAt: string;
};

interface Props {
  user: User;
}

export default function Timeline({ user }: Props) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/dashboard/activities", {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          setActivities(data);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleAddActivity() {
    if (!newTitle.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/dashboard/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
      });
      if (res.ok) {
        const act = await res.json();
        setActivities((prev) => [act, ...prev]);
        setNewTitle("");
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5 lg:space-y-6">
      {/* Header principal, espelhando o “hero” do index.html */}
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-400 mb-1">
            timeline
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Olá, {user.name?.split(" ")[0] ?? "estudante"} 👋
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Acompanhe sua semana, organize atividades e mantenha sua streak.
          </p>
        </div>

        <div className="flex gap-3">
          <div className="hc-card border-slate-800 bg-slate-950/80 px-4 py-3">
            <p className="text-[11px] text-slate-400 mb-1">XP TOTAL</p>
            <p className="text-lg font-semibold text-emerald-400">
              {user.totalXp}
            </p>
          </div>
          <div className="hc-card border-slate-800 bg-slate-950/80 px-4 py-3">
            <p className="text-[11px] text-slate-400 mb-1">STREAK</p>
            <p className="text-lg font-semibold text-amber-300">
              {user.streakDays} dias
            </p>
          </div>
        </div>
      </header>

      {/* Linha da semana / “semanas” inspiradas no HTML original */}
      <section className="grid gap-4 md:grid-cols-3">
        <div className="hc-card p-4 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-2 text-xs font-medium text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Semana atual
            </span>
            <button className="hc-btn-primary px-3 py-1 text-xs">
              COMEÇAR
            </button>
          </div>
          <p className="text-sm text-slate-300 mb-2">
            Complete as tarefas mínimas de hoje para manter a streak ativa.
          </p>
          <div className="flex items-center gap-1 mt-4">
            {Array.from({ length: 7 }).map((_, idx) => (
              <span
                key={idx}
                className="h-1.5 flex-1 rounded-full bg-slate-800 overflow-hidden"
              >
                <span className="block h-full w-2/3 bg-emerald-500/70" />
              </span>
            ))}
          </div>
        </div>

        <div className="hc-card p-4">
          <p className="text-xs text-slate-400 mb-1">Semana anterior</p>
          <p className="text-sm text-slate-300 mb-3">
            Use as revisões para consolidar o que você já viu.
          </p>
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2"
              >
                <p className="text-[11px] text-slate-400 mb-1">
                  Revisão {i + 1}
                </p>
                <p className="text-xs text-slate-200">Conteúdo de estudo</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hc-card p-4">
          <p className="text-xs text-slate-400 mb-1">Próxima semana</p>
          <p className="text-sm text-slate-300 mb-3">
            Planeje suas sessões de pomodoro e tarefas com antecedência.
          </p>
          <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/40 px-3 py-4 text-center text-xs text-slate-400">
            Adicione atividades na lista abaixo e use o calendário para
            organizar os blocos de estudo.
          </div>
        </div>
      </section>

      {/* Atividades (ligado ao /api/dashboard/activities) */}
      <section className="hc-card p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">
              ATIVIDADES
            </p>
            <h2 className="text-sm font-semibold">Lista rápida de estudo</h2>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Nova atividade..."
              className="hc-input text-xs"
            />
            <button
              type="button"
              onClick={handleAddActivity}
              disabled={saving}
              className="hc-btn-primary whitespace-nowrap text-xs disabled:opacity-60"
            >
              {saving ? "Adicionando..." : "Adicionar"}
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-xs text-slate-500">Carregando atividades...</p>
        ) : activities.length === 0 ? (
          <p className="text-xs text-slate-500">
            Nenhuma atividade cadastrada ainda. Comece adicionando uma acima.
          </p>
        ) : (
          <ul className="space-y-2">
            {activities.map((activity) => (
              <li
                key={activity.id}
                className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-600 text-[10px] text-slate-400">
                    {activity.done ? "✓" : ""}
                  </span>
                  <span className="text-slate-100">{activity.title}</span>
                </div>
                <span className="text-[10px] text-slate-500">
                  {new Date(activity.createdAt).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
