import type { ReactNode } from "react";
import "../../app/globals.css";

export const metadata = {
  title: "Dashboard – HelloCoder",
  description: "Painel completo com timeline, pomodoro, revisões e calendário.",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle_at_top,_#0f172a,_#020617)] text-slate-100 overflow-hidden">
      {children}
    </div>
  );
}
