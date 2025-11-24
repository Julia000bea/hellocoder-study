export default function AtividadesPage() {
  return (
    <section id="atividades" className="page-section">
      <header className="main-header">
        <div className="header-title">
          <i className="fas fa-calendar-alt"></i>
          <span>Agendado para hoje:</span>
        </div>
        <div className="header-date">
          <span>Quarta-feira, 06 de Agosto de 2025</span>
        </div>
      </header>
      <hr className="header-divider" />

      <div className="activities-container">
        <div className="activity-row">
          <div className="activity-card">
            <span className="card-title">BANCO DE DADOS II</span>
            <div className="card-info">
              <i className="fas fa-clock"></i> 23min
            </div>
            <i className="fas fa-file-alt card-icon"></i>
          </div>
          <div className="activity-card">
            <span className="card-title">SISTEMAS DE INFORMAÇÃO</span>
            <div className="card-info">
              <i className="fas fa-clock"></i> 1hr
            </div>
            <i className="fas fa-file-alt card-icon"></i>
          </div>
        </div>

        {/* restante igual ao seu HTML */}
      </div>
    </section>
  );
}
