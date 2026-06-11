import { useMemo, useState, useEffect } from "react";
import { redPortraits, redProfile, companions, records } from "./data";

function App() {
  const [activeCompanion, setActiveCompanion] = useState(companions[0]);
  const [activePortraitIndex, setActivePortraitIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0, active: false });

  useEffect(() => {
    const move = (event) => {
      setCursor({ x: event.clientX, y: event.clientY, active: true });
    };
    const leave = () => setCursor((state) => ({ ...state, active: false }));
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerleave", leave);
    window.addEventListener("pointerenter", () => setCursor((state) => ({ ...state, active: true })));
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
        setActivePortraitIndex((current) => (current + 1) % redPortraits.length);
    }, 4800);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
        setActiveCompanion((current) => {
          const currentIndex = companions.findIndex((item) => item.name === current.name);
          return companions[(currentIndex + 1) % companions.length];
        });
    }, 6200);
    return () => window.clearInterval(timer);
  }, []);

  const companionCards = useMemo(
    () =>
      companions.map((companion, index) => (
        <button
          key={companion.name}
          type="button"
          className={`companion-card ${activeCompanion.name === companion.name ? "is-active" : ""}`}
          onClick={() => setActiveCompanion(companion)}
          style={{ animationDelay: `${index * 120}ms` }}
        >
          <span className="companion-number">0{index + 1}</span>
          <img src={companion.image} alt={companion.name} />
          <div className="companion-copy">
            <h3>{companion.name}</h3>
            <p>{companion.intro}</p>
          </div>
        </button>
      )),
    [activeCompanion]
  );

  return (
    <div className="page-shell">
      <div
        className={`pokeball-cursor ${cursor.active ? "is-visible" : ""}`}
        style={{ transform: `translate(${cursor.x}px, ${cursor.y}px) translate(-50%, -50%)` }}
        aria-hidden="true"
      />

      <header className="site-header">
        <nav className="nav">
          <a className="brand" href="#top">
            RED 傳說檔案
          </a>
          <div className="nav-links">
            <a href="#about">關於 RED</a>
            <a href="#companions">寶可夢夥伴</a>
            <a href="#team">白銀山隊伍</a>
            <a href="#legend">傳說紀錄</a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy reveal hero-left">
            <p className="eyebrow">Legendary Archive</p>
            <h1>{redProfile.name}</h1>
            <p className="role">代表稱號：{redProfile.title}</p>
            <p className="lead">{redProfile.intro}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#companions">
                查看寶可夢夥伴
              </a>
              <a className="button button-secondary" href="#legend">
                查看傳說紀錄
              </a>
            </div>
          </div>

          <div className="hero-art reveal hero-right" aria-hidden="true">
            <div className="halo halo-one" />
            <div className="halo halo-two" />
            <div className="hero-frame">
              <div className="portrait-stack">
                {redPortraits.map((portrait, index) => (
                  <figure
                    key={portrait.label}
                    className={`portrait-layer ${index === activePortraitIndex ? "is-active" : ""}`}
                  >
                    <img src={portrait.image} alt="" />
                    <figcaption>
                      <span>{portrait.label}</span>
                      <strong>{portrait.note}</strong>
                    </figcaption>
                  </figure>
                ))}
              </div>
              <div className="hero-frame-footer">
                <span className="frame-label">Red File</span>
                <div className="cycle-dot-list" role="tablist" aria-label="切換 RED 主圖">
                  {redPortraits.map((portrait, index) => (
                    <button
                      key={portrait.label}
                      type="button"
                      className={`cycle-dot ${index === activePortraitIndex ? "is-active" : ""}`}
                      aria-label={`切換到 ${portrait.label}`}
                      onClick={() => setActivePortraitIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section about-section reveal" id="about" aria-labelledby="about-title">
          <div className="section-heading split-heading">
            <div>
              <p className="section-kicker">Profile</p>
              <h2 id="about-title">關於 RED</h2>
            </div>
            <p className="section-copy narrow">
              {redProfile.about}
            </p>
          </div>
        </section>

        <section className="section companions-section reveal" id="companions" aria-labelledby="companions-title">
          <div className="section-heading">
            <p className="section-kicker">Companions</p>
            <h2 id="companions-title">寶可夢夥伴</h2>
          </div>
          <p className="section-copy">
            這一區以輪替進場的方式呈現，像是霧氣裡一張張檔案逐步顯影。點選任何一張卡片，
            右側就會切換到對應的傳說檔案卷宗。
          </p>

          <div className="companions-layout">
            <div className="companion-strip">{companionCards}</div>
            <aside className="detail-panel">
              <p className="panel-kicker">傳說檔案卷宗</p>
              <h3>{activeCompanion.name}</h3>
              <p className="panel-intro">{activeCompanion.intro}</p>
              <p>{activeCompanion.detail}</p>
              <div className="detail-grid">
                <div>
                  <span>性格特色</span>
                  <strong>{activeCompanion.nature}</strong>
                </div>
                <div>
                  <span>配招示意</span>
                  <strong>{activeCompanion.moves}</strong>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="section team-section reveal" id="team" aria-labelledby="team-title">
          <div className="section-heading team-heading">
            <div>
              <p className="section-kicker">Mt. Silver Team</p>
              <h2 id="team-title">白銀山上的六隻天王級寶可夢</h2>
            </div>
            <p className="section-copy narrow">
              這是 RED 最經典、也最常被提起的戰力配置。畫面保留六宮格，但動畫上會用不同節奏進場，
              讓每一張卡片都有自己的存在感。
            </p>
          </div>

          <div className="grid six-grid">
            {companions.map((companion, index) => {
              const record = records[index];
              return (
                <article className="record-card card-pop" key={record.title} style={{ animationDelay: `${index * 90}ms` }}>
                  <img src={companion.image} alt={companion.name} />
                  <div className="card-body">
                    <span className="record-tag">{record.accent}</span>
                    <h3>{companion.name}</h3>
                    <p className="record-value">{record.value}</p>
                    <p>{record.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section legend-section reveal" id="legend" aria-labelledby="legend-title">
          <div className="section-heading">
            <p className="section-kicker">Legend</p>
            <h2 id="legend-title">傳說紀錄</h2>
          </div>
          <div className="records-grid">
            {records.map((record, index) => (
              <article className="record" key={record.title} style={{ animationDelay: `${index * 70}ms` }}>
                <span className="record-tag">{record.accent}</span>
                <h3>{record.title}</h3>
                <strong>{record.value}</strong>
                <p>{record.text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© 2026 RED 傳說檔案. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
