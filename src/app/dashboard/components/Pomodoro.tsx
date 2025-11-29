"use client";

import { useEffect, useState, useRef } from "react";

type PomodoroSession = {
  id: number;
  focusTime: number;
  breakTime: number;
  cycles: number;
  createdAt: string;
};

type Mode = "pomodoro" | "short" | "long";

const DEFAULT_FOCUS = 25;
const DEFAULT_SHORT = 5;
const DEFAULT_LONG = 15;
const DEFAULT_CYCLES = 4;

export default function Pomodoro() {
  const [mode, setMode] = useState<Mode>("pomodoro");
  const [focusMinutes, setFocusMinutes] = useState(DEFAULT_FOCUS);
  const [shortMinutes, setShortMinutes] = useState(DEFAULT_SHORT);
  const [longMinutes, setLongMinutes] = useState(DEFAULT_LONG);
  const [cycles, setCycles] = useState(DEFAULT_CYCLES);

  const [remainingSeconds, setRemainingSeconds] = useState(
    DEFAULT_FOCUS * 60,
  );
  const [running, setRunning] = useState(false);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [autoStart, setAutoStart] = useState(true);

  const [sessions, setSessions] = useState<PomodoroSession[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Carrega sessões do backend
  useEffect(() => {
    async function load() {
      const res = await fetch("/api/dashboard/pomodoro", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setSessions(data);
      }
    }
    load();
  }, []);

  // Controle do timer
  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          handleTimerEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  function formatTime(total: number) {
    const m = Math.floor(total / 60)
      .toString()
      .padStart(2, "0");
    const s = (total % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function getDurationForMode(m: Mode) {
    if (m === "pomodoro") return focusMinutes * 60;
    if (m === "short") return shortMinutes * 60;
    return longMinutes * 60;
  }

  function changeMode(next: Mode) {
    setMode(next);
    setRemainingSeconds(getDurationForMode(next));
    setRunning(false);
  }

  async function handleTimerEnd() {
    // Salva sessão quando finaliza um pomodoro
    if (mode === "pomodoro") {
      try {
        await fetch("/api/dashboard/pomodoro", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            focusTime: focusMinutes,
            breakTime: shortMinutes,
            cycles,
          }),
        }).then(async (res) => {
          if (res.ok) {
            const created = await res.json();
            setSessions((prev) => [created, ...prev]);
          }
        });
      } catch {
        // silencia erro no front
      }
    }

    // Alternância simples de modos
    if (mode === "pomodoro") {
      if (currentCycle % cycles === 0) {
        setMode("long");
        setRemainingSeconds(longMinutes * 60);
      } else {
        setMode("short");
        setRemainingSeconds(shortMinutes * 60);
      }
      setCurrentCycle((c) => c + 1);
    } else {
      setMode("pomodoro");
      setRemainingSeconds(focusMinutes * 60);
    }

    if (autoStart) {
      setRunning(true);
    } else {
      setRunning(false);
    }
  }

  function handleStartStop() {
    if (running) {
      setRunning(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      setRunning(true);
    }
  }

  function handleReset() {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setMode("pomodoro");
    setRemainingSeconds(focusMinutes * 60);
    setCurrentCycle(1);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr),minmax(0,1fr)]">
      {/* Timer principal */}
      <section className="hc-card p-5 sm:p-6 flex flex-col gap-4">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-400 mb-1">
              pomodoro
            </p>
            <h2 className="text-lg font-semibold">Foco guiado</h2>
            <p className="text-xs text-slate-400 mt-1">
              Use blocos de foco com pausas pequenas e longas.
            </p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="hc-btn-ghost text-[11px] px-3 py-1"
          >
            Resetar
          </button>
        </header>

        {/* Abas */}
        <nav className="inline-flex items-center rounded-full bg-slate-900/80 border border-hc_border p-1 text-xs">
          <button
            type="button"
            onClick={() => changeMode("pomodoro")}
            className={`px-4 py-1.5 rounded-full ${
              mode === "pomodoro"
                ? "bg-emerald-500 text-slate-900"
                : "text-slate-300 hover:bg-slate-800/60"
            }`}
          >
            POMODORO
          </button>
          <button
            type="button"
            onClick={() => changeMode("short")}
            className={`px-4 py-1.5 rounded-full ${
              mode === "short"
                ? "bg-emerald-500 text-slate-900"
                : "text-slate-300 hover:bg-slate-800/60"
            }`}
          >
            PAUSA PEQUENA
          </button>
          <button
            type="button"
            onClick={() => changeMode("long")}
            className={`px-4 py-1.5 rounded-full ${
              mode === "long"
                ? "bg-emerald-500 text-slate-900"
                : "text-slate-300 hover:bg-slate-800/60"
            }`}
          >
            PAUSA LONGA
          </button>
        </nav>

        {/* Timer */}
        <div className="flex flex-col items-center gap-3 pt-4">
          <div className="relative flex items-center justify-center h-48 w-48 rounded-full bg-slate-900/80 border border-slate-800">
            <div className="h-40 w-40 rounded-full bg-slate-950 flex items-center justify-center">
              <span className="text-4xl font-semibold tabular-nums">
                {formatTime(remainingSeconds)}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleStartStop}
            className="hc-btn-primary mt-2 px-6 py-2 text-sm"
          >
            {running ? "PAUSAR" : "COMEÇAR"}
          </button>

          <p className="text-[11px] text-slate-500 mt-2">
            Ciclo atual: {currentCycle} / {cycles}
          </p>
        </div>
      </section>

      {/* Configurações e histórico */}
      <section className="space-y-4">
        <div className="hc-card p-4">
          <h3 className="text-sm font-semibold mb-3">Configurações rápidas</h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <label className="space-y-1">
              <span className="block text-slate-400">Pomodoro (min)</span>
              <input
                type="number"
                min={1}
                value={focusMinutes}
                onChange={(e) => {
                  const v = Number(e.target.value || 1);
                  setFocusMinutes(v);
                  if (mode === "pomodoro") setRemainingSeconds(v * 60);
                }}
                className="hc-input text-xs"
              />
            </label>
            <label className="space-y-1">
              <span className="block text-slate-400">Pausa pequena</span>
              <input
                type="number"
                min={1}
                value={shortMinutes}
                onChange={(e) => {
                  const v = Number(e.target.value || 1);
                  setShortMinutes(v);
                  if (mode === "short") setRemainingSeconds(v * 60);
                }}
                className="hc-input text-xs"
              />
            </label>
            <label className="space-y-1">
              <span className="block text-slate-400">Pausa longa</span>
              <input
                type="number"
                min={1}
                value={longMinutes}
                onChange={(e) => {
                  const v = Number(e.target.value || 1);
                  setLongMinutes(v);
                  if (mode === "long") setRemainingSeconds(v * 60);
                }}
                className="hc-input text-xs"
              />
            </label>
            <label className="space-y-1">
              <span className="block text-slate-400">Ciclos até pausa longa</span>
              <input
                type="number"
                min={1}
                value={cycles}
                onChange={(e) => setCycles(Number(e.target.value || 1))}
                className="hc-input text-xs"
              />
            </label>
          </div>

          <label className="mt-3 flex items-center gap-2 text-xs text-slate-300">
            <input
              type="checkbox"
              checked={autoStart}
              onChange={(e) => setAutoStart(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-slate-600 bg-slate-950"
            />
            Iniciar automaticamente o próximo timer
          </label>
        </div>

        <div className="hc-card p-4">
          <h3 className="text-sm font-semibold mb-2">
            Histórico de sessões (salvo no banco)
          </h3>
          {sessions.length === 0 ? (
            <p className="text-xs text-slate-500">
              Nenhum pomodoro salvo ainda. Conclua um ciclo para registrar.
            </p>
          ) : (
            <ul className="space-y-2 text-xs">
              {sessions.map((s) => (
                <li
                  key={s.id}
                  className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2"
                >
                  <div>
                    <p className="text-slate-100">
                      {s.focusTime} min foco · {s.breakTime} min pausa
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Ciclos configurados: {s.cycles}
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-500">
                    {new Date(s.createdAt).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
