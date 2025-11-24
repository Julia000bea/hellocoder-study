import Link from "next/link";
import { ReactNode } from "react";
import { getCurrentUser } from "@/lib/auth";

export default async function DashboardLayout({
  children
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();

  // se não logado -> redirect para /login
  if (!user) {
    // server redirect
    return (
      <html>
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.location.href = "/login";`
            }}
          />
        </body>
      </html>
    );
  }

  return (
    <div style={{ display: "flex", width: "100%" }}>
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="window-controls">
            <span className="control red"></span>
            <span className="control yellow"></span>
            <span className="control green"></span>
          </div>
          <div className="left-side">
            <img src="/assets/img/logo.png" alt="Logo" className="logo" />
          </div>
        </div>

        <nav className="menu">
          <p className="menu-label">MENU</p>

          <div className="menu-item">
            <div className="menu-item-header">
              <span style={{ fontSize: 14, fontWeight: 600 }}>
                Olá, {user.username}
              </span>
            </div>
          </div>

          <div className="menu-item">
            <div className="menu-item-header">
              <span>Página Inicial</span>
            </div>
            <div className="submenu" style={{ display: "block" }}>
              <Link href="/dashboard" className="submenu-item">
                Timeline
              </Link>
              <Link href="/dashboard/atividades" className="submenu-item">
                Atividades
              </Link>
              <Link href="/dashboard/perfil" className="submenu-item">
                Meu Usuário
              </Link>
              <Link href="/dashboard/pomodoro" className="submenu-item">
                Pomodoro
              </Link>
            </div>
          </div>

          <div className="menu-item">
            <Link href="/dashboard/calendario" className="menu-item-header">
              <span>Calendário</span>
            </Link>
          </div>

          <div className="menu-item">
            <Link href="/dashboard/revisoes" className="menu-item-header">
              <span>Revisões</span>
            </Link>
          </div>

          <div className="menu-item">
            <Link href="/dashboard/notificacoes" className="menu-item-header">
              <span>Notificações</span>
            </Link>
          </div>
        </nav>

        <form
          action="/api/auth/logout"
          method="post"
          style={{ margin: "20px" }}
        >
          <button className="add-btn" type="submit">
            Sair
          </button>
        </form>
      </aside>

      <main className="main-content">{children}</main>
    </div>
  );
}
