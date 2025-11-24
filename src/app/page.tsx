// app/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type SectionId =
  | "timeline"
  | "atividades"
  | "perfil"
  | "pomodoro"
  | "calendario"
  | "revisoes"
  | "notificacoes";

// =========================
// COMPONENTE PRINCIPAL
// =========================

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState<SectionId>("timeline");
  const [activeSub, setActiveSub] = useState<SectionId>("atividades");

  // ESC para fechar modais no futuro (já deixo preparado)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        // hoje não temos modais globais, mas deixo o listener pronto
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isHomeGroupActive =
    activeSection === "timeline" ||
    activeSection === "atividades" ||
    activeSection === "perfil" ||
    activeSection === "pomodoro";

  return (
    <div className="body-root">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="window-controls">
            <span className="control red"></span>
            <span className="control yellow"></span>
            <span className="control green"></span>
          </div>
          <div className="left-side">
            <img
              src="/assets/img/logo.png"
              alt="HelloCoder Logo"
              className="logo"
            />
          </div>
        </div>

        <nav className="menu">
          <p className="menu-label">MENU</p>

          {/* ITEM: Página Inicial (+ submenu) */}
          <div
            className={`menu-item ${
              isHomeGroupActive ? "active open" : ""
            }`.trim()}
            data-section="timeline"
          >
            <div
              className="menu-item-header"
              onClick={() => {
                // toggle open só visual; a section quem manda é o clique do submenu
                if (!isHomeGroupActive) {
                  setActiveSection("timeline");
                  setActiveSub("atividades");
                }
              }}
            >
              <svg
                className="menu-icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect x="3" y="3" width="7" height="7" fill="currentColor" />
                <rect x="14" y="3" width="7" height="7" fill="currentColor" />
                <rect x="3" y="14" width="7" height="7" fill="currentColor" />
                <rect x="14" y="14" width="7" height="7" fill="currentColor" />
              </svg>
              <span>Página Inicial</span>
              <svg
                className="chevron"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="submenu">
              <a
                href="#"
                className={`submenu-item ${
                  activeSection === "atividades" ? "active-sub" : ""
                }`}
                data-section="atividades"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveSection("atividades");
                  setActiveSub("atividades");
                }}
              >
                Atividades
              </a>
              <a
                href="#"
                className={`submenu-item ${
                  activeSection === "perfil" ? "active-sub" : ""
                }`}
                data-section="perfil"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveSection("perfil");
                  setActiveSub("perfil");
                }}
              >
                Meu Usuário
              </a>
              <a
                href="#"
                className={`submenu-item ${
                  activeSection === "pomodoro" ? "active-sub" : ""
                }`}
                data-section="pomodoro"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveSection("pomodoro");
                  setActiveSub("pomodoro");
                }}
              >
                Pomodoro
              </a>
            </div>
          </div>

          {/* ITEM: Calendário */}
          <div
            className={`menu-item ${
              activeSection === "calendario" ? "active" : ""
            }`}
            data-section="calendario"
          >
            <div
              className="menu-item-header"
              onClick={() => setActiveSection("calendario")}
            >
              <svg
                className="menu-icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect
                  x="5"
                  y="4"
                  width="14"
                  height="16"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="9"
                  y1="8"
                  x2="15"
                  y2="8"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="9"
                  y1="12"
                  x2="15"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <span>Calendário</span>
            </div>
          </div>

          {/* ITEM: Revisões */}
          <div
            className={`menu-item ${
              activeSection === "revisoes" ? "active" : ""
            }`}
            data-section="revisoes"
          >
            <div
              className="menu-item-header"
              onClick={() => setActiveSection("revisoes")}
            >
              <svg
                className="menu-icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              <span>Revisões</span>
            </div>
          </div>

          {/* ITEM: Notificações */}
          <div
            className={`menu-item ${
              activeSection === "notificacoes" ? "active" : ""
            }`}
            data-section="notificacoes"
          >
            <div
              className="menu-item-header"
              onClick={() => setActiveSection("notificacoes")}
            >
              <svg
                className="menu-icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M15 17C15 17 16 17 16 16C16 14.5 14 14.5 14 13C14 11.5 16 11.5 16 10C16 9 15 9 15 9M12 6V18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <span>Notificações</span>
            </div>
          </div>
        </nav>

        <button
          className="add-btn"
          onClick={() => alert("Adicionar novo item (futuro CRUD)")}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5V19M5 12H19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        {/* TIMELINE (sempre visível quando timeline for ativa) */}
        {activeSection === "timeline" && <TimelineSection />}

        {/* ATIVIDADES */}
        {activeSection === "atividades" && <ActivitiesSection />}

        {/* PERFIL */}
        {activeSection === "perfil" && <ProfileSection />}

        {/* POMODORO */}
        {activeSection === "pomodoro" && <PomodoroSection />}

        {/* CALENDÁRIO */}
        {activeSection === "calendario" && <CalendarSection />}

        {/* REVISÕES */}
        {activeSection === "revisoes" && <ReviewsSection />}

        {/* NOTIFICAÇÕES */}
        {activeSection === "notificacoes" && <NotificationsSection />}
      </main>
    </div>
  );
}

// =========================
// SEÇÃO: TIMELINE
// =========================

function TimelineSection() {
  const dotsGroupsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const intervals: number[] = [];

    dotsGroupsRef.current.forEach((group) => {
      if (!group) return;
      const dots = Array.from(group.querySelectorAll<HTMLSpanElement>(".dot"));
      if (dots.length === 0) return;

      const id = window.setInterval(() => {
        const randomDot = dots[Math.floor(Math.random() * dots.length)];
        randomDot.style.background = "rgba(79, 209, 197, 0.8)";
        setTimeout(() => {
          randomDot.style.background = "rgba(255, 255, 255, 0.3)";
        }, 500);
      }, 3000);

      intervals.push(id);
    });

    return () => {
      intervals.forEach((id) => clearInterval(id));
    };
  }, []);

  return (
    <section id="timeline" className="page-section active">
      <div className="timeline">
        {/* Semana 1 */}
        <div className="week-item1">
          <div className="week-icon-wrapper">
            <button
              className="start-btn"
              onClick={() => alert("Iniciando Semana 1!")}
            >
              COMEÇAR
            </button>
            <div
              className="week-icon status-completed"
              onClick={() => console.log("Semana 1 clicada")}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M20 8L26 14L20 20L14 14L20 8Z" fill="#FFB800" />
              </svg>
            </div>
          </div>

          <div
            className="progress-dots"
            ref={(el) => {
              if (el) dotsGroupsRef.current[0] = el;
            }}
          >
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>

          <div className="week-details">
            <h2>SEMANA 1 - 00/00/000 até 00/00/0000</h2>
            <div className="week-line"></div>
          </div>
        </div>

        {/* Semana 2 */}
        <div className="week-item2">
          <div className="week-icon-wrapper">
            <div
              className="week-icon status-active"
              onClick={() => console.log("Semana 2 clicada")}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path
                  d="M14 16H18V20H22V24H18V28H14V24H10V20H14V16Z"
                  fill="white"
                  transform="rotate(45 20 20)"
                />
              </svg>
            </div>
          </div>

          <div
            className="progress-dots"
            ref={(el) => {
              if (el) dotsGroupsRef.current[1] = el;
            }}
          >
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>

          <div className="week-details">
            <h2>SEMANA 2 - 00/00/000 até 00/00/0000</h2>
            <div className="week-line"></div>
          </div>
        </div>

        {/* Semana 3 */}
        <div className="week-item3">
          <div className="week-icon-wrapper">
            <div
              className="week-icon status-upcoming"
              onClick={() => console.log("Semana 3 clicada")}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect
                  x="12"
                  y="14"
                  width="16"
                  height="12"
                  rx="2"
                  fill="white"
                />
                <rect x="15" y="18" width="4" height="6" fill="#D1D5DB" />
                <rect x="21" y="18" width="4" height="6" fill="#D1D5DB" />
              </svg>
            </div>
          </div>

          <div
            className="progress-dots"
            ref={(el) => {
              if (el) dotsGroupsRef.current[2] = el;
            }}
          >
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>

          <div className="week-details">
            <h2>SEMANA 3 - 00/00/000 até 00/00/0000</h2>
            <div className="week-line"></div>
          </div>
        </div>

        {/* Semana 4 */}
        <div className="week-item4">
          <div className="week-icon-wrapper">
            <div
              className="week-icon status-upcoming"
              onClick={() => console.log("Semana 4 clicada")}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect
                  x="12"
                  y="14"
                  width="16"
                  height="12"
                  rx="2"
                  fill="white"
                />
                <rect x="15" y="18" width="4" height="6" fill="#D1D5DB" />
                <rect x="21" y="18" width="4" height="6" fill="#D1D5DB" />
              </svg>
            </div>
          </div>

          <div
            className="progress-dots"
            ref={(el) => {
              if (el) dotsGroupsRef.current[3] = el;
            }}
          >
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>

          <div className="week-details">
            <h2>SEMANA 4 - 00/00/000 até 00/00/0000</h2>
            <div className="week-line"></div>
          </div>
        </div>
      </div>

      <div className="character">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <rect x="25" y="50" width="30" height="25" rx="4" fill="#9CA3AF" />
          <rect x="20" y="45" width="40" height="8" rx="2" fill="#6B7280" />
          <rect x="32" y="55" width="6" height="15" fill="#4B5563" />
          <rect x="42" y="55" width="6" height="15" fill="#4B5563" />
        </svg>
      </div>
    </section>
  );
}

// =========================
// SEÇÃO: ATIVIDADES
// =========================

function ActivitiesSection() {
  return (
    <section id="atividades" className="page-section active">
      <header className="main-header">
        <div className="header-title">
          <i className="fas fa-calendar-alt" />
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
              <i className="fas fa-clock" /> 23min
            </div>
            <i className="fas fa-file-alt card-icon" />
          </div>
          <div className="activity-card">
            <span className="card-title">SISTEMAS DE INFORMAÇÃO</span>
            <div className="card-info">
              <i className="fas fa-clock" /> 1hr
            </div>
            <i className="fas fa-file-alt card-icon" />
          </div>
        </div>

        <div className="section-title">
          <i className="fas fa-check-circle" />
          <span>Estudado hoje:</span>
        </div>
        <div className="activity-row">
          <div className="activity-card">
            <span className="card-title">BANCO DE DADOS II</span>
            <i className="fas fa-file-alt card-icon" />
          </div>
        </div>

        <div className="section-title">
          <i className="fas fa-map-pin" />
          <span>Estudado ontem:</span>
        </div>
        <div className="activity-row">
          <div className="activity-card">
            <span className="card-title">MATEMÁTICA II</span>
            <i className="fas fa-file-alt card-icon" />
          </div>
          <div className="activity-card">
            <span className="card-title">JAVASCRIPT WEB II</span>
            <i className="fas fa-file-alt card-icon" />
          </div>
        </div>
      </div>
    </section>
  );
}

// =========================
// SEÇÃO: PERFIL
// =========================

function ProfileSection() {
  const [nomeUsuario, setNomeUsuario] = useState("Joãozinho");
  const [daysState, setDaysState] = useState<
    { label: string; status: "normal" | "active" | "missed" }[]
  >([
    { label: "Fr", status: "active" },
    { label: "Sa", status: "active" },
    { label: "Su", status: "active" },
    { label: "Mo", status: "missed" },
    { label: "Tu", status: "normal" },
    { label: "We", status: "normal" },
    { label: "Th", status: "normal" },
  ]);

  function toggleDay(index: number) {
    setDaysState((prev) =>
      prev.map((day, i) => {
        if (i !== index) return day;
        if (day.status === "active") return { ...day, status: "missed" };
        if (day.status === "missed") return { ...day, status: "normal" };
        return { ...day, status: "active" };
      })
    );
  }

  return (
    <section id="perfil" className="page-section active">
      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-header">
            <div className="avatar">
              <i className="fa-solid fa-user" />
            </div>
            <button
              id="editProfile"
              onClick={() => {
                const nome = window.prompt("Digite o novo nome do usuário:");
                if (nome) {
                  setNomeUsuario(nome);
                }
              }}
            >
              <i className="fa-solid fa-pen" />
            </button>
          </div>
          <h2 id="nomeUsuario">{nomeUsuario}</h2>
          <p className="username">User123ghjy</p>
          <p className="since">
            <i className="fa-solid fa-calendar" /> Desde Fevereiro 2025
          </p>
          <p className="followers">
            <i className="fa-solid fa-users" /> 0 Seguindo / 0 Seguidores
          </p>
          <h3>Estatísticas</h3>
          <div className="stats">
            <div className="stat-box">
              <i className="fa-solid fa-fire-flame-curved" />
              <div>
                <p>0</p>
                <span>Dias seguidos</span>
              </div>
            </div>
            <div className="stat-box bronze">
              <i className="fa-solid fa-medal" />
              <div>
                <p>Bronze</p>
                <span>Finalizados</span>
              </div>
            </div>
            <div className="stat-box">
              <i className="fa-solid fa-bolt" />
              <div>
                <p>27</p>
                <span>Total XP</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-progress">
          <div className="week">
            {daysState.map((day, index) => (
              <span
                key={day.label + index}
                className={`day ${
                  day.status === "active"
                    ? "active"
                    : day.status === "missed"
                    ? "missed"
                    : ""
                }`}
                onClick={() => toggleDay(index)}
              >
                {day.label}
              </span>
            ))}
          </div>

          <div className="task-box">
            <div className="task">
              <div className="task-info">
                <p>
                  <strong>PRÉ-PROVA I</strong>
                </p>
                <span>
                  <i className="fa-regular fa-clock" /> 10 days
                </span>
              </div>
              <p className="progress-count">5 / 25</p>
            </div>
            <div className="task">
              <div className="task-info">
                <p>
                  <strong>MATEMÁTICA</strong>
                </p>
                <span>
                  <i className="fa-regular fa-clock" /> 10 days
                </span>
              </div>
              <p className="progress-count">5 / 25</p>
            </div>
            <div className="task">
              <div className="task-info">
                <p>
                  <strong>DESAFIOS DO MÊS</strong>
                </p>
                <span>
                  <i className="fa-regular fa-clock" /> 10 days
                </span>
              </div>
              <p className="progress-count">5 / 25</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// =========================
// SEÇÃO: POMODORO
// =========================

type PomodoroMode = "pomodoro" | "shortBreak" | "longBreak";

function PomodoroSection() {
  const [mode, setMode] = useState<PomodoroMode>("pomodoro");
  const [pomodoroTime, setPomodoroTime] = useState(1800);
  const [shortBreakTime, setShortBreakTime] = useState(300);
  const [longBreakTime, setLongBreakTime] = useState(900);
  const [cyclesUntilLongBreak, setCyclesUntilLongBreak] = useState(4);
  const [autoStart, setAutoStart] = useState(false);

  const [remainingTime, setRemainingTime] = useState(pomodoroTime);
  const [isRunning, setIsRunning] = useState(false);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentDefaultTime = useMemo(() => {
    if (mode === "pomodoro") return pomodoroTime;
    if (mode === "shortBreak") return shortBreakTime;
    return longBreakTime;
  }, [mode, pomodoroTime, shortBreakTime, longBreakTime]);

  useEffect(() => {
    setRemainingTime(currentDefaultTime);
  }, [currentDefaultTime]);

  useEffect(() => {
    if (!isRunning) return;

    if (audioRef.current) {
      // "desmuta" em navegadores que bloqueiam o autoplay
      audioRef.current.play().catch(() => {
        audioRef.current?.pause();
      });
    }

    intervalRef.current = window.setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          // fim do ciclo
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current
              .play()
              .catch((e) => console.log("Erro ao tocar alarme:", e));
          }

          if (mode === "pomodoro") {
            const nextCycle = currentCycle + 1;
            setCurrentCycle(nextCycle);
            const shouldGoLongBreak =
              nextCycle % cyclesUntilLongBreak === 0 && nextCycle !== 0;

            const nextMode: PomodoroMode = shouldGoLongBreak
              ? "longBreak"
              : "shortBreak";
            setMode(nextMode);
          } else {
            setMode("pomodoro");
          }

          if (!autoStart) {
            setIsRunning(false);
            return currentDefaultTime;
          }

          // se autoStart, reseta tempo pro novo modo
          return currentDefaultTime;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [
    isRunning,
    mode,
    currentCycle,
    cyclesUntilLongBreak,
    autoStart,
    currentDefaultTime,
  ]);

  function handleStartPause() {
    setIsRunning((prev) => !prev);
  }

  function handleModeChange(newMode: PomodoroMode) {
    setIsRunning(false);
    setMode(newMode);
    setCurrentCycle(0);
  }

  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  // estados auxiliares para modal (em minutos)
  const [tempPomodoro, setTempPomodoro] = useState(30);
  const [tempShort, setTempShort] = useState(5);
  const [tempLong, setTempLong] = useState(15);
  const [tempCycles, setTempCycles] = useState(4);
  const [tempAutoStart, setTempAutoStart] = useState(false);

  function openSettings() {
    setTempPomodoro(pomodoroTime / 60);
    setTempShort(shortBreakTime / 60);
    setTempLong(longBreakTime / 60);
    setTempCycles(cyclesUntilLongBreak);
    setTempAutoStart(autoStart);
    setSettingsOpen(true);
  }

  function saveSettings() {
    setPomodoroTime(tempPomodoro * 60);
    setShortBreakTime(tempShort * 60);
    setLongBreakTime(tempLong * 60);
    setCyclesUntilLongBreak(tempCycles);
    setAutoStart(tempAutoStart);
    setSettingsOpen(false);
    setIsRunning(false);
    setCurrentCycle(0);
  }

  return (
    <section id="pomodoro" className="page-section active">
      <div className="pomodoro-container">
        <nav className="pomodoro-nav">
          <button
            className={`pomodoro-tab ${
              mode === "pomodoro" ? "active" : ""
            }`.trim()}
            onClick={() => handleModeChange("pomodoro")}
          >
            POMODORO
          </button>
          <button
            className={`pomodoro-tab ${
              mode === "shortBreak" ? "active" : ""
            }`.trim()}
            onClick={() => handleModeChange("shortBreak")}
          >
            PAUSA PEQUENA
          </button>
          <button
            className={`pomodoro-tab ${
              mode === "longBreak" ? "active" : ""
            }`.trim()}
            onClick={() => handleModeChange("longBreak")}
          >
            PAUSA LONGA
          </button>
        </nav>

        <div className="timer-display" id="timer-display">
          {formatTime(remainingTime)}
        </div>

        <button
          className={`start-stop-btn ${isRunning ? "running" : ""}`}
          id="start-stop-btn"
          onClick={handleStartPause}
        >
          {isRunning ? "PAUSAR" : "COMEÇAR"}
        </button>

        <button
          className="settings-btn"
          id="settings-btn"
          onClick={openSettings}
        >
          <i className="fas fa-cog" />
        </button>

        {/* AUDIO */}
        <audio
          id="alarm-sound"
          ref={audioRef}
          src="/assets/audio/alarm.mp3"
        ></audio>
      </div>

      {/* MODAL */}
      {settingsOpen && (
        <div
          className="modal-overlay visible"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSettingsOpen(false);
            }
          }}
        >
          <div className="modal-content">
            <button
              className="modal-close-btn"
              id="modal-close-btn"
              onClick={() => setSettingsOpen(false)}
            >
              &times;
            </button>
            <h2>Configurações</h2>

            <div className="modal-form">
              <div className="form-group">
                <label htmlFor="pomodoro-input">Pomodoro (minutos)</label>
                <input
                  type="number"
                  id="pomodoro-input"
                  value={tempPomodoro}
                  onChange={(e) => setTempPomodoro(Number(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="short-break-input">
                  Pausa Pequena (minutos)
                </label>
                <input
                  type="number"
                  id="short-break-input"
                  value={tempShort}
                  onChange={(e) => setTempShort(Number(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="long-break-input">
                  Pausa Longa (minutos)
                </label>
                <input
                  type="number"
                  id="long-break-input"
                  value={tempLong}
                  onChange={(e) => setTempLong(Number(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cycles-input">
                  Pomodoros até a pausa longa
                </label>
                <input
                  type="number"
                  id="cycles-input"
                  value={tempCycles}
                  onChange={(e) => setTempCycles(Number(e.target.value))}
                />
              </div>
              <div className="form-group-checkbox">
                <input
                  type="checkbox"
                  id="auto-start-input"
                  checked={tempAutoStart}
                  onChange={(e) => setTempAutoStart(e.target.checked)}
                />
                <label htmlFor="auto-start-input">
                  Iniciar timers automaticamente
                </label>
              </div>

              <button
                className="modal-save-btn"
                id="modal-save-btn"
                onClick={saveSettings}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// =========================
// SEÇÃO: CALENDÁRIO
// =========================

type Appointment = {
  title: string;
  description: string;
};

const appointmentsDB: Record<string, Appointment[]> = {
  "2025-11-04": [
    { title: "Reunião de Projeto", description: "Alinhar próximas sprints." },
    { title: "Estudar Álgebra Linear", description: "Capítulo 3." },
  ],
  "2025-11-08": [
    { title: "Consulta Médica", description: "Check-up anual." },
  ],
  "2025-11-15": [
    {
      title: "Entregar trabalho Banco de Dados II",
      description: "Fase 2 do projeto.",
    },
  ],
};

function CalendarSection() {
  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const [selectedDate, setSelectedDate] = useState(() => new Date());

  const [clock, setClock] = useState("");

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  function getAppointmentsForDate(date: Date): Appointment[] {
    const key = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    return appointmentsDB[key] || [];
  }

  const appointments = getAppointmentsForDate(selectedDate);

  // relógio digital
  useEffect(() => {
    function updateClock() {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      const strHours = String(hours).padStart(2, "0");

      setClock(`${strHours}:${minutes}:${seconds} ${ampm}`);
    }

    updateClock();
    const id = window.setInterval(updateClock, 1000);
    return () => clearInterval(id);
  }, []);

  // Geração da grade do calendário
  const daysGrid = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const gridStartDate = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const cells: {
      key: string;
      dayNumber: number;
      inCurrentMonth: boolean;
      date: Date | null;
    }[] = [];

    // dias do mês anterior
    for (let i = 0; i < gridStartDate; i++) {
      const day = daysInPrevMonth - gridStartDate + i + 1;
      cells.push({
        key: `prev-${day}`,
        dayNumber: day,
        inCurrentMonth: false,
        date: null,
      });
    }

    // dias do mês atual
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      cells.push({
        key: `current-${i}`,
        dayNumber: i,
        inCurrentMonth: true,
        date,
      });
    }

    // dias do próximo mês
    const totalGridCells = 42;
    const remainingCells = totalGridCells - (gridStartDate + daysInMonth);
    for (let i = 1; i <= remainingCells; i++) {
      cells.push({
        key: `next-${i}`,
        dayNumber: i,
        inCurrentMonth: false,
        date: null,
      });
    }

    return cells;
  }, [currentDate]);

  const today = new Date();

  return (
    <section id="calendario" className="page-section active">
      <div className="calendar-container">
        <h2>Calendário</h2>

        <div className="calendar-header">
          <div className="month-year-display">
            <span id="month-display">
              {monthNames[currentDate.getMonth()]}
            </span>
            <span id="year-display">{currentDate.getFullYear()}</span>
          </div>
          <div className="nav-buttons">
            <button
              id="prev-month-btn"
              onClick={() =>
                setCurrentDate((prev) => {
                  const d = new Date(prev);
                  d.setMonth(prev.getMonth() - 1);
                  return d;
                })
              }
            >
              <i className="fas fa-chevron-left" />
            </button>
            <button
              id="next-month-btn"
              onClick={() =>
                setCurrentDate((prev) => {
                  const d = new Date(prev);
                  d.setMonth(prev.getMonth() + 1);
                  return d;
                })
              }
            >
              <i className="fas fa-chevron-right" />
            </button>
          </div>
        </div>

        <div className="calendar-grid calendar-weekdays">
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
          <div>S</div>
        </div>

        <div className="calendar-grid" id="calendar-days-grid">
          {daysGrid.map((cell) => {
            const isToday =
              cell.inCurrentMonth &&
              cell.date &&
              cell.date.toDateString() === today.toDateString();

            const isSelected =
              cell.inCurrentMonth &&
              cell.date &&
              cell.date.toDateString() === selectedDate.toDateString();

            const classNames = [
              "day",
              cell.inCurrentMonth ? "" : "other-month",
              isToday ? "today" : "",
              isSelected ? "selected" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div
                key={cell.key}
                className={classNames}
                onClick={() => {
                  if (!cell.date) return;
                  setSelectedDate(cell.date);
                }}
              >
                {cell.dayNumber}
              </div>
            );
          })}
        </div>

        <div className="date-quick-view">
          <div className="date-quick-header">
            <h3>Date</h3>
            <a href="#">See All</a>
          </div>
          <div className="date-quick-buttons">
            <button className="date-btn active">Sun 4</button>
            <button className="date-btn">Mon 5</button>
            <button className="date-btn">Tue 6</button>
          </div>
        </div>
      </div>

      <aside className="schedule-sidebar">
        <div className="time-selector">
          <div className="time-list-container">{clock}</div>
        </div>

        <div className="schedule-list-container">
          <h3 className="schedule-title">COMPROMISSOS</h3>
          <div className="schedule-list" id="schedule-list">
            {appointments.length > 0 ? (
              appointments.map((app, idx) => (
                <div className="schedule-item" key={idx}>
                  <i className="fas fa-bell" />
                  <div className="schedule-item-details">
                    <span className="schedule-item-title">{app.title}</span>
                    <span className="schedule-item-desc">
                      {app.description}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="schedule-item-details">
                <span className="schedule-item-desc">
                  Nenhum compromisso para este dia.
                </span>
              </div>
            )}
          </div>
          <span className="schedule-footer-text">
            Seus compromissos do dia aparecerão aqui.
          </span>
        </div>
      </aside>
    </section>
  );
}

// =========================
// SEÇÃO: REVISÕES
// =========================

function ReviewsSection() {
  const [completed, setCompleted] = useState({
    review1: false,
    review2: false,
    review3: false,
  });

  return (
    <section id="revisoes" className="page-section active">
      <header className="main-header">
        <div className="header-title">
          <i className="fas fa-edit" />
          <span>REVISÕES SUGERIDAS</span>
        </div>
      </header>
      <hr className="header-divider" />

      <div className="reviews-container">
        {/* Review 1 */}
        <div
          className={`review-item ${completed.review1 ? "completed" : ""}`}
        >
          <div className="review-main">
            <input
              type="checkbox"
              id="review-1"
              className="review-checkbox-input"
              checked={completed.review1}
              onChange={(e) =>
                setCompleted((prev) => ({ ...prev, review1: e.target.checked }))
              }
            />
            <label htmlFor="review-1" className="review-checkbox-label" />
            <i className="fas fa-history review-icon" />
            <span className="review-title">MATEMÁTICA</span>
          </div>
          <div className="review-actions">
            <a href="#" className="review-view-more">
              View More
            </a>
            <i className="fas fa-ellipsis-v review-kebab" />
          </div>
        </div>
        <hr className="review-divider" />

        {/* Review 2 */}
        <div
          className={`review-item ${completed.review2 ? "completed" : ""}`}
        >
          <div className="review-main">
            <input
              type="checkbox"
              id="review-2"
              className="review-checkbox-input"
              checked={completed.review2}
              onChange={(e) =>
                setCompleted((prev) => ({ ...prev, review2: e.target.checked }))
              }
            />
            <label htmlFor="review-2" className="review-checkbox-label" />
            <i className="fas fa-history review-icon" />
            <span className="review-title">ÁLGEBRA LINEAR</span>
          </div>
          <div className="review-actions">
            <a href="#" className="review-view-more">
              View More
            </a>
            <i className="fas fa-ellipsis-v review-kebab" />
          </div>
        </div>
        <hr className="review-divider" />

        {/* Review 3 */}
        <div
          className={`review-item ${completed.review3 ? "completed" : ""}`}
        >
          <div className="review-main">
            <input
              type="checkbox"
              id="review-3"
              className="review-checkbox-input"
              checked={completed.review3}
              onChange={(e) =>
                setCompleted((prev) => ({ ...prev, review3: e.target.checked }))
              }
            />
            <label htmlFor="review-3" className="review-checkbox-label" />
            <i className="fas fa-history review-icon" />
            <span className="review-title">BANCO DE DADOS II</span>
          </div>
          <div className="review-actions">
            <a href="#" className="review-view-more">
              View More
            </a>
            <i className="fas fa-ellipsis-v review-kebab" />
          </div>
        </div>
        <hr className="review-divider" />
      </div>
    </section>
  );
}

// =========================
// SEÇÃO: NOTIFICAÇÕES
// =========================

function NotificationsSection() {
  return (
    <section id="notificacoes" className="page-section active">
      <header className="main-header">
        <div className="header-title">
          <i className="fas fa-bell" />
          <span>NOTIFICAÇÕES</span>
        </div>
      </header>
      <hr className="header-divider" />

      <div className="notifications-container">
        {[1, 2, 3].map((n) => (
          <div className="notification-item" key={n}>
            <i className="fas fa-bell notification-icon" />
            <div className="notification-card">
              <div className="notification-angled-bg">
                <span className="notification-time">
                  <i className="fas fa-clock" /> 10 days
                </span>
                <span className="notification-progress">5 / 25</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
