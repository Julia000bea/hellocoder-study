"use client";

type User = {
  id: number;
  name: string;
  email: string;
  totalXp: number;
  streakDays: number;
  followers: number;
  following: number;
};

interface Props {
  user: User;
}

export default function Profile({ user }: Props) {
  return (
    <section className="space-y-4">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-1">
          perfil
        </p>
        <h2 className="text-lg font-semibold">Meu usuário</h2>
        <p className="text-xs text-slate-400 mt-1">
          Resumo do seu perfil dentro do sistema de estudos.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)]">
        <div className="hc-card p-5 flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-500 to-lime-400 flex items-center justify-center text-slate-950 text-2xl font-semibold">
            {user.name?.[0]?.toUpperCase() ?? "U"}
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-slate-400">{user.email}</p>
            <p className="text-[11px] text-slate-500">
              ID: <span className="font-mono">{user.id}</span>
            </p>
          </div>
        </div>

        <div className="hc-card p-4 grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-slate-400 mb-1">XP total</p>
            <p className="text-xl font-semibold text-emerald-400">
              {user.totalXp}
            </p>
          </div>
          <div>
            <p className="text-slate-400 mb-1">Streak (dias)</p>
            <p className="text-xl font-semibold text-amber-300">
              {user.streakDays}
            </p>
          </div>
          <div>
            <p className="text-slate-400 mb-1">Seguidores</p>
            <p className="text-xl font-semibold text-sky-400">
              {user.followers}
            </p>
          </div>
          <div>
            <p className="text-slate-400 mb-1">Seguindo</p>
            <p className="text-xl font-semibold text-slate-100">
              {user.following}
            </p>
          </div>
        </div>
      </div>

      <div className="hc-card p-4 space-y-2 text-xs text-slate-300">
        <p className="font-medium text-sm mb-1">Sobre o painel HelloCoder</p>
        <p>
          Este painel foi pensado para organizar seu estudo em ciclos de foco
          (pomodoro), registrar atividades, revisões e manter uma visão clara da
          sua semana.
        </p>
        <p className="text-slate-500">
          Use a timeline para planejar, o pomodoro para executar, o calendário
          para distribuir e as revisões para consolidar.
        </p>
      </div>
    </section>
  );
}
