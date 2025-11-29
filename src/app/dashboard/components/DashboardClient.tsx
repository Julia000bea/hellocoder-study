"use client";

import { useState } from "react";
import Timeline from "./Timeline";
import Pomodoro from "./Pomodoro";
import Profile from "./Profile";
import Calendar from "./Calendar";
import Reviews from "./Reviews";
import Notifications from "./Notifications";
import Sidebar from "./SideBar";

type User = {
  id: number;
  name: string;
  email: string;
  totalXp: number;
  streakDays: number;
  followers: number;
  following: number;
};

type Props = {
  user: User;
};

type SectionId =
  | "timeline"
  | "atividades"
  | "pomodoro"
  | "calendario"
  | "revisoes"
  | "notificacoes"
  | "perfil";

export default function DashboardClient({ user }: Props) {
  const [activeSection, setActiveSection] = useState<SectionId>("timeline");

  function renderSection() {
    if (activeSection === "perfil") {
      return <Profile user={user} />;
    }

    if (activeSection === "pomodoro") {
      return <Pomodoro />;
    }

    if (activeSection === "calendario") {
      return <Calendar />;
    }

    if (activeSection === "revisoes") {
      return <Reviews/>;
    }

    if (activeSection === "notificacoes") {
      return <Notifications />;
    }

    // timeline / atividades
    return <Timeline user={user} />;
  }

  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top,_#0f172a,_#020617)] text-slate-100">
      <Sidebar
        user={user}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <main className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        {renderSection()}
      </main>
    </div>
  );
}
