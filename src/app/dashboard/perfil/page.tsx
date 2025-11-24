import { getCurrentUser } from "@/lib/auth";

export default async function PerfilPage() {
  const user = await getCurrentUser();

  return (
    <section id="perfil" className="page-section">
      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-header">
            <div className="avatar">
              <i className="fa-solid fa-user"></i>
            </div>
          </div>
          <h2 id="nomeUsuario">{user?.username ?? "Usuário"}</h2>
          <p className="username">{user?.email}</p>
          <p className="since">
            <i className="fa-solid fa-calendar"></i> Desde{" "}
            {user?.joinDate.toLocaleDateString("pt-BR") ?? "2025"}
          </p>
          <p className="followers">
            <i className="fa-solid fa-users"></i> 0 Seguindo / 0 Seguidores
          </p>
          <h3>Estatísticas</h3>
          <div className="stats">
            <div className="stat-box">
              <i className="fa-solid fa-fire-flame-curved"></i>
              <div>
                <p>{user?.streakDays ?? 0}</p>
                <span>Dias seguidos</span>
              </div>
            </div>
            <div className="stat-box bronze">
              <i className="fa-solid fa-medal"></i>
              <div>
                <p>Bronze</p>
                <span>Finalizados</span>
              </div>
            </div>
            <div className="stat-box">
              <i className="fa-solid fa-bolt"></i>
              <div>
                <p>{user?.totalXp ?? 0}</p>
                <span>Total XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* lado direito igual ao seu HTML (week + task-box) */}
        <div className="profile-progress">
          {/* ... */}
        </div>
      </div>
    </section>
  );
}
