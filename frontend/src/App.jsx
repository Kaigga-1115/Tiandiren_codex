import { useMemo, useState, useEffect } from "react";
import pikachuImg from "../經歷圖片/Pikachu.png";
import { redPortraits, redProfile, companions, records } from "./data";

function resolveImagePath(folder, filename, fallback) {
  if (!filename) return fallback;
  if (filename.startsWith("http://") || filename.startsWith("https://")) return filename;
  try {
    return new URL(`../${folder}/${filename}`, import.meta.url).href;
  } catch {
    return fallback;
  }
}

function App() {
  const [companionsList, setCompanionsList] = useState(companions);
  const [recordsList, setRecordsList] = useState(records);
  const [activeCompanion, setActiveCompanion] = useState(companions[0]);
  const [activePortraitIndex, setActivePortraitIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0, active: false });
  const [showAddCompanionForm, setShowAddCompanionForm] = useState(false);
  const [showAddRecordForm, setShowAddRecordForm] = useState(false);
  const [companionError, setCompanionError] = useState("");
  const [recordError, setRecordError] = useState("");
  const [companionDraft, setCompanionDraft] = useState({
    name: "",
    image: "",
    intro: "",
    detail: "",
    nature: "",
    moves: "",
  });
  const [recordDraft, setRecordDraft] = useState({
    title: "",
    image: "",
    intro: "",
    detail: "",
    year: "",
    result: "",
  });
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
    }, 3000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadRemoteData = async () => {
      try {
        const [companionsResponse, recordsResponse] = await Promise.all([
          fetch("/api/companions"),
          fetch("/api/records"),
        ]);
        if (!companionsResponse.ok || !recordsResponse.ok) return;

        const remoteCompanions = await companionsResponse.json();
        const remoteRecords = await recordsResponse.json();

        setCompanionsList(
          remoteCompanions.map((item) => ({
            ...item,
            image: resolveImagePath("商品圖片", item.image, pikachuImg),
          }))
        );
        setRecordsList(
          remoteRecords.map((item) => ({
            ...item,
            image: resolveImagePath("經歷圖片", item.image, pikachuImg),
            value: item.year,
            text: item.intro,
            accent: item.result,
          }))
        );
        setActiveCompanion(
          remoteCompanions.length > 0
            ? {
                ...remoteCompanions[0],
                image: resolveImagePath("商品圖片", remoteCompanions[0].image, pikachuImg),
              }
            : companions[0]
        );
      } catch {
        // 後端尚未啟動時，先保留前端內建資料。
      }
    };

    loadRemoteData();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
        setActiveCompanion((current) => {
          const currentIndex = companionsList.findIndex((item) => item.name === current.name);
          return companionsList[(currentIndex + 1) % companionsList.length];
        });
    }, 6200);
    return () => window.clearInterval(timer);
  }, [companionsList]);

  const companionCards = useMemo(
    () =>
      companionsList.map((companion, index) => (
        <button
          key={companion.name}
          type="button"
          className={`companion-card ${activeCompanion.name === companion.name ? "is-active" : ""}`}
          onClick={() => setActiveCompanion(companion)}
          style={{ animationDelay: `${index * 120}ms` }}
        >
          <span className="companion-number">0{index + 1}</span>
          <img src={companion.image || pikachuImg} alt={companion.name} />
          <div className="companion-copy">
            <h3>{companion.name}</h3>
            <p>{companion.intro}</p>
          </div>
        </button>
      )),
    [activeCompanion, companionsList]
  );

  const handleAddCompanion = (event) => {
    event.preventDefault();
    if (!companionDraft.name.trim()) {
      setCompanionError("寶可夢名稱不能空白");
      return;
    }
    if (!companionDraft.intro.trim()) {
      setCompanionError("簡介不能空白");
      return;
    }

    const nextCompanion = {
      id: Date.now(),
      name: companionDraft.name.trim(),
      image: companionDraft.image.trim(),
      intro: companionDraft.intro.trim(),
      detail: companionDraft.detail.trim() || companionDraft.intro.trim(),
      nature: companionDraft.nature.trim() || "待補充",
      moves: companionDraft.moves.trim() || "待補充",
    };

    fetch("/api/companions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nextCompanion),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || "儲存失敗");
        }
        return response.json();
      })
      .then((savedCompanion) => {
        const displayCompanion = {
          ...savedCompanion,
          image: resolveImagePath("商品圖片", savedCompanion.image, pikachuImg),
        };
        setCompanionsList((current) => [...current, displayCompanion]);
        setActiveCompanion(displayCompanion);
        setCompanionDraft({ name: "", image: "", intro: "", detail: "", nature: "", moves: "" });
        setCompanionError("");
        setShowAddCompanionForm(false);
      })
      .catch((error) => {
        setCompanionError(error.message === "Failed to fetch" ? "後端尚未啟動，請先啟動 backend" : error.message);
      });
  };

  const handleAddRecord = (event) => {
    event.preventDefault();
    if (!recordDraft.title.trim()) {
      setRecordError("經歷標題不能空白");
      return;
    }
    if (!recordDraft.intro.trim()) {
      setRecordError("簡介不能空白");
      return;
    }

    const nextRecord = {
      id: Date.now(),
      title: recordDraft.title.trim(),
      image: recordDraft.image.trim(),
      intro: recordDraft.intro.trim(),
      detail: recordDraft.detail.trim() || recordDraft.intro.trim(),
      year: recordDraft.year.trim() || "待補充",
      result: recordDraft.result.trim() || "新增紀錄",
    };

    fetch("/api/records", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nextRecord),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || "儲存失敗");
        }
        return response.json();
      })
      .then((savedRecord) => {
        const displayRecord = {
          ...savedRecord,
          image: resolveImagePath("經歷圖片", savedRecord.image, pikachuImg),
          value: savedRecord.year,
          text: savedRecord.intro,
          accent: savedRecord.result,
        };
        setRecordsList((current) => [...current, displayRecord]);
        setRecordDraft({ title: "", image: "", intro: "", detail: "", year: "", result: "" });
        setRecordError("");
        setShowAddRecordForm(false);
      })
      .catch((error) => {
        setRecordError(error.message === "Failed to fetch" ? "後端尚未啟動，請先啟動 backend" : error.message);
      });
  };

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
        <section className="hero hero-immersive">
          <div className="hero-backdrop" aria-hidden="true">
            <div className="hero-glow glow-a" />
            <div className="hero-glow glow-b" />
            <div className="hero-glow glow-c" />
            <div className="hero-drift drift-a" />
            <div className="hero-drift drift-b" />
            <div className="hero-drift drift-c" />
          </div>

          <div className="hero-character reveal hero-right" aria-hidden="true">
            <div className="hero-frame hero-frame-floating">
              <div className="portrait-stack">
                {redPortraits.map((portrait, index) => (
                  <figure
                    key={portrait.label}
                    className={`portrait-layer ${index === activePortraitIndex ? "is-active" : ""}`}
                  >
                    <img src={portrait.image} alt="" />
                  </figure>
                ))}
              </div>
            </div>
          </div>

          <div className="hero-copy-wrap reveal hero-left">
            <div className="hero-copy hero-copy-bottom">
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
              <div className="hero-badges" aria-label="RED 基本資訊">
                {redProfile.facts.slice(0, 3).map((fact) => (
                  <div className="hero-badge" key={fact.label}>
                    <span>{fact.label}</span>
                    <strong>{fact.value}</strong>
                  </div>
                ))}
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

        <section
          className="section companions-section reveal"
          id="companions"
          aria-labelledby="companions-title"
        >
          <div className="section-heading">
            <p className="section-kicker">Companions</p>
            <h2 id="companions-title">寶可夢夥伴</h2>
          </div>
          <p className="section-copy">
            這一區以輪替進場的方式呈現，像是霧氣裡一張張檔案逐步顯影。點選任何一張卡片，
            右側就會切換到對應的傳說檔案卷宗。
          </p>

          <div className="companions-layout">
            <div>
              <div className="section-tools">
                <button
                  type="button"
                  className="button button-secondary button-small"
                  onClick={() => setShowAddCompanionForm((current) => !current)}
                >
                  新增寶可夢圖鑑
                </button>
              </div>
              {showAddCompanionForm && (
                <form className="inline-form" onSubmit={handleAddCompanion}>
                  <div className="form-grid">
                    <label>
                      寶可夢名稱
                      <input value={companionDraft.name} onChange={(e) => setCompanionDraft({ ...companionDraft, name: e.target.value })} />
                    </label>
                    <label>
                      圖片檔名
                      <input value={companionDraft.image} onChange={(e) => setCompanionDraft({ ...companionDraft, image: e.target.value })} placeholder="例如：Pikachu.png" />
                    </label>
                    <label className="full">
                      簡介
                      <textarea value={companionDraft.intro} onChange={(e) => setCompanionDraft({ ...companionDraft, intro: e.target.value })} />
                    </label>
                    <label className="full">
                      詳細故事
                      <textarea value={companionDraft.detail} onChange={(e) => setCompanionDraft({ ...companionDraft, detail: e.target.value })} />
                    </label>
                    <label>
                      性格特色
                      <input value={companionDraft.nature} onChange={(e) => setCompanionDraft({ ...companionDraft, nature: e.target.value })} />
                    </label>
                    <label>
                      配招示意
                      <input value={companionDraft.moves} onChange={(e) => setCompanionDraft({ ...companionDraft, moves: e.target.value })} />
                    </label>
                  </div>
                  {companionError && <p className="form-error">{companionError}</p>}
                  <div className="form-actions">
                    <button type="button" className="button button-ghost button-small" onClick={() => setShowAddCompanionForm(false)}>取消</button>
                    <button type="submit" className="button button-primary button-small">儲存寶可夢</button>
                  </div>
                </form>
              )}
              <div className="companion-strip">{companionCards}</div>
            </div>
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
            {companionsList.slice(0, 6).map((companion, index) => {
              const record = recordsList[index % recordsList.length];
              return (
                <article className="record-card card-pop" key={record.title} style={{ animationDelay: `${index * 90}ms` }}>
                  <img src={companion.image || pikachuImg} alt={companion.name} />
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
          <div className="section-tools">
            <button
              type="button"
              className="button button-secondary button-small"
              onClick={() => setShowAddRecordForm((current) => !current)}
            >
              新增經歷
            </button>
          </div>
          {showAddRecordForm && (
            <form className="inline-form inline-form-record" onSubmit={handleAddRecord}>
              <div className="form-grid">
                <label>
                  經歷標題
                  <input value={recordDraft.title} onChange={(e) => setRecordDraft({ ...recordDraft, title: e.target.value })} />
                </label>
                <label>
                  圖片檔名
                  <input value={recordDraft.image} onChange={(e) => setRecordDraft({ ...recordDraft, image: e.target.value })} placeholder="例如：Red-FRLG.png" />
                </label>
                <label className="full">
                  簡介
                  <textarea value={recordDraft.intro} onChange={(e) => setRecordDraft({ ...recordDraft, intro: e.target.value })} />
                </label>
                <label className="full">
                  詳細故事
                  <textarea value={recordDraft.detail} onChange={(e) => setRecordDraft({ ...recordDraft, detail: e.target.value })} />
                </label>
                <label>
                  日期或年份
                  <input value={recordDraft.year} onChange={(e) => setRecordDraft({ ...recordDraft, year: e.target.value })} />
                </label>
                <label>
                  相關成果
                  <input value={recordDraft.result} onChange={(e) => setRecordDraft({ ...recordDraft, result: e.target.value })} />
                </label>
              </div>
              {recordError && <p className="form-error">{recordError}</p>}
              <div className="form-actions">
                <button type="button" className="button button-ghost button-small" onClick={() => setShowAddRecordForm(false)}>取消</button>
                <button type="submit" className="button button-primary button-small">儲存經歷</button>
              </div>
            </form>
          )}
          <div className="records-grid">
            {recordsList.map((record, index) => (
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
