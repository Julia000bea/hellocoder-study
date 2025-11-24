export default function TimelinePage() {
  return (
    <section id="timeline" className="page-section active">
      <div className="timeline">
        <div className="week-item1">
          <div className="week-icon-wrapper">
            <button className="start-btn">COMEÇAR</button>
            <div className="week-icon status-completed">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path
                  d="M20 8L26 14L20 20L14 14L20 8Z"
                  fill="#FFB800"
                ></path>
              </svg>
            </div>
          </div>

          <div className="progress-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>

          <div className="week-details">
            <h2>SEMANA 1 - 00/00/000 até 00/00/0000</h2>
            <div className="week-line"></div>
          </div>
        </div>

        <div className="week-item2">
          <div className="week-icon-wrapper">
            <div className="week-icon status-active">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path
                  d="M14 16H18V20H22V24H18V28H14V24H10V20H14V16Z"
                  fill="white"
                  transform="rotate(45 20 20)"
                />
              </svg>
            </div>
          </div>

          <div className="progress-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>

          <div className="week-details">
            <h2>SEMANA 2 - 00/00/000 até 00/00/0000</h2>
            <div className="week-line"></div>
          </div>
        </div>

        {/* semana 3 e 4 igual ao seu HTML, pode copiar aqui */}
      </div>

      <div className="character">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <rect
            x="25"
            y="50"
            width="30"
            height="25"
            rx="4"
            fill="#9CA3AF"
          />
          <rect
            x="20"
            y="45"
            width="40"
            height="8"
            rx="2"
            fill="#6B7280"
          />
          <rect x="32" y="55" width="6" height="15" fill="#4B5563" />
          <rect x="42" y="55" width="6" height="15" fill="#4B5563" />
        </svg>
      </div>
    </section>
  );
}
