"use client";

const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

export default function Calendar() {
  // Simples calendário “mock”, só front, estilo parecido com o original
  return (
    <section className="space-y-4">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-sky-400 mb-1">
          calendário
        </p>
        <h2 className="text-lg font-semibold">Visão semanal de estudos</h2>
        <p className="text-xs text-slate-400 mt-1">
          Use para distribuir atividades e sessões de pomodoro pelos dias.
        </p>
      </header>

      <div className="hc-card p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium">Semana atual</h3>
          <div className="flex gap-2 text-xs text-slate-400">
            <button className="hc-btn-ghost px-3 py-1">◀ Semana</button>
            <button className="hc-btn-ghost px-3 py-1">Semana ▶</button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-xs">
          {days.map((d, i) => (
            <div
              key={d}
              className="flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-950/60 p-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-slate-300">{d}</span>
                <span className="text-[10px] text-slate-500">
                  0{(i + 1).toString()}
                </span>
              </div>
              <div className="space-y-1">
                <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-2 py-1 text-[10px] text-emerald-200">
                  2x pomodoro – Estruturas de dados
                </div>
                <div className="rounded-lg bg-slate-900/70 border border-slate-800 px-2 py-1 text-[10px] text-slate-300">
                  Leitura – capítulo 3
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
