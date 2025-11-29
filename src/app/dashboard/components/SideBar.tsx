"use client";

import { useRouter } from "next/navigation";

type User = {
  id: number;
  name: string;
  email: string;
  totalXp: number;
  streakDays: number;
  followers: number;
  following: number;
};

type SectionId =
  | "timeline"
  | "atividades"
  | "pomodoro"
  | "calendario"
  | "revisoes"
  | "notificacoes"
  | "perfil";

interface SidebarProps {
  user: User;
  activeSection: SectionId;
  onSectionChange: (section: SectionId) => void;
}

export default function Sidebar({
  user,
  activeSection,
  onSectionChange,
}: SidebarProps) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  const mainIsOpen =
    activeSection === "timeline" ||
    activeSection === "atividades" ||
    activeSection === "perfil" ||
    activeSection === "pomodoro";

  return (
    <aside className="hidden lg:flex lg:w-72 xl:w-80 flex-col border-r border-hc_border bg-hc_panel/90 backdrop-blur-sm">
      <div className="px-4 pt-4 pb-3 border-b border-hc_border/60">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="hc-window-dot hc-window-dot-red" />
            <span className="hc-window-dot hc-window-dot-yellow" />
            <span className="hc-window-dot hc-window-dot-green" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
            HELLOCODER
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-lime-400 flex items-center justify-center text-slate-900 font-semibold">
            {user.name?.[0]?.toUpperCase() ?? "U"}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-slate-400 truncate">{user.email}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-slate-500 px-1">
          MENU
        </p>

        {/* Página Inicial com submenu */}
        <div className="space-y-1">
          <button
            type="button"
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm ${
              mainIsOpen
                ? "bg-slate-900/80 text-slate-50"
                : "text-slate-400 hover:bg-slate-900/40"
            }`}
            onClick={() => onSectionChange("timeline")}
          >
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 text-xs">
                ⦿
              </span>
              <span>Página Inicial</span>
            </div>
            <span className="text-xs text-slate-500">
              {mainIsOpen ? "▾" : "▸"}
            </span>
          </button>

          {mainIsOpen && (
            <div className="ml-8 flex flex-col gap-1 text-xs text-slate-400">
              <button
                type="button"
                className={`text-left rounded-lg px-2 py-1 ${
                  activeSection === "atividades" || activeSection === "timeline"
                    ? "bg-slate-900/80 text-emerald-300"
                    : "hover:bg-slate-900/40"
                }`}
                onClick={() => onSectionChange("atividades")}
              >
                Atividades
              </button>
              <button
                type="button"
                className={`text-left rounded-lg px-2 py-1 ${
                  activeSection === "perfil"
                    ? "bg-slate-900/80 text-emerald-300"
                    : "hover:bg-slate-900/40"
                }`}
                onClick={() => onSectionChange("perfil")}
              >
                Meu Usuário
              </button>
              <button
                type="button"
                className={`text-left rounded-lg px-2 py-1 ${
                  activeSection === "pomodoro"
                    ? "bg-slate-900/80 text-emerald-300"
                    : "hover:bg-slate-900/40"
                }`}
                onClick={() => onSectionChange("pomodoro")}
              >
                Pomodoro
              </button>
            </div>
          )}
        </div>

        {/* Calendário */}
        <button
          type="button"
          className={`flex w-full items-center rounded-xl px-3 py-2 text-sm ${
            activeSection === "calendario"
              ? "bg-slate-900/80 text-slate-50"
              : "text-slate-400 hover:bg-slate-900/40"
          }`}
          onClick={() => onSectionChange("calendario")}
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400 text-xs mr-2">
            📅
          </span>
          <span>Calendário</span>
        </button>

        {/* Revisões */}
        <button
          type="button"
          className={`flex w-full items-center rounded-xl px-3 py-2 text-sm ${
            activeSection === "revisoes"
              ? "bg-slate-900/80 text-slate-50"
              : "text-slate-400 hover:bg-slate-900/40"
          }`}
          onClick={() => onSectionChange("revisoes")}
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400 text-xs mr-2">
            🔁
          </span>
          <span>Revisões</span>
        </button>

        {/* Notificações */}
        <button
          type="button"
          className={`flex w-full items-center rounded-xl px-3 py-2 text-sm ${
            activeSection === "notificacoes"
              ? "bg-slate-900/80 text-slate-50"
              : "text-slate-400 hover:bg-slate-900/40"
          }`}
          onClick={() => onSectionChange("notificacoes")}
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 text-xs mr-2">
            🔔
          </span>
          <span>Notificações</span>
        </button>
      </nav>

      <div className="border-t border-hc_border px-3 py-3">
        <button
          type="button"
          onClick={handleLogout}
          className="hc-btn-ghost w-full justify-center text-xs"
        >
          Sair
        </button>
      </div>
    </aside>
  );
}
