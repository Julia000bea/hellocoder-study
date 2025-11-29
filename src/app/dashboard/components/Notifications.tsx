"use client";

import { useEffect, useState } from "react";

type Notification = {
  id: number;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/dashboard/notifications", {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          setNotifications(data);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section className="space-y-4">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-amber-400 mb-1">
          notificações
        </p>
        <h2 className="text-lg font-semibold">Alertas e lembretes</h2>
        <p className="text-xs text-slate-400 mt-1">
          Veja lembretes de atividades, revisões e sessões de pomodoro.
        </p>
      </header>

      <div className="hc-card p-4">
        <h3 className="text-sm font-medium mb-3">Caixa de entrada</h3>
        {loading ? (
          <p className="text-xs text-slate-500">Carregando notificações...</p>
        ) : notifications.length === 0 ? (
          <p className="text-xs text-slate-500">
            Nenhuma notificação no momento.
          </p>
        ) : (
          <ul className="space-y-2 text-xs">
            {notifications.map((n) => (
              <li
                key={n.id}
                className={`flex items-start justify-between rounded-lg border px-3 py-2 ${
                  n.read
                    ? "border-slate-800 bg-slate-900/60"
                    : "border-amber-500/40 bg-amber-500/5"
                }`}
              >
                <div className="flex-1 pr-2">
                  <p className="text-slate-100">{n.message}</p>
                  <p className="text-[10px] text-slate-500 mt-1">
                    {new Date(n.createdAt).toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {!n.read && (
                  <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-amber-400" />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
