import { useMemo, useState, useEffect } from "react";
import redPortraitFRLG from "../角色圖片/Red-FRLG.png";
import redPortraitLetsGo from "../角色圖片/Red-LetsGo.png";
import redPortraitSunMoon from "../角色圖片/Red-SunMoon.png";
import redPortraitComputer from "../角色圖片/Red-Computer.png";
import redPortraitAriga from "../角色圖片/Red-Ariga.jpg";
import pikachuImg from "../經歷圖片/Pikachu.png";
import snorlaxImg from "../經歷圖片/Snorlax.png";
import venusaurImg from "../經歷圖片/Venusaur.png";
import charizardImg from "../經歷圖片/Charizard.png";
import blastoiseImg from "../經歷圖片/Blastoise.png";
import espeonImg from "../經歷圖片/Espeon.png";

const redPortraits = [
  {
    image: redPortraitFRLG,
    label: "FireRed / LeafGreen",
    note: "最適合做主視覺的正式全身圖。",
  },
  {
    image: redPortraitLetsGo,
    label: "Let's Go",
    note: "動作感更強，適合做輪播切換。",
  },
  {
    image: redPortraitSunMoon,
    label: "Sun / Moon",
    note: "更強的傳說感與氣場。",
  },
  {
    image: redPortraitComputer,
    label: "Red on computer",
    note: "帶一點檔案感，適合穿插在故事段落。",
  },
  {
    image: redPortraitAriga,
    label: "Ariga collaboration",
    note: "偏插畫氣質，可當變奏素材。",
  },
];

const companions = [
  {
    name: "皮卡丘",
    image: pikachuImg,
    intro: "RED 最具代表性的夥伴之一，速度快、反應靈活，象徵整體隊伍的核心節奏。",
    detail: "RED 的皮卡丘常被視為整體戰鬥節奏的引導者。它的存在感很強，讓隊伍既有速度，也有辨識度。",
    nature: "活潑、警覺、默契高",
    moves: "十萬伏特、電光一閃、鐵尾、伏特攻擊",
  },
  {
    name: "卡比獸",
    image: snorlaxImg,
    intro: "擅長承受攻勢並穩住戰局，是 RED 隊伍中非常典型的厚實型主力。",
    detail: "卡比獸是 RED 很重要的耐久支點，能讓戰局拉長，也能在關鍵時刻穩住局面。",
    nature: "沉穩、耐打、節奏慢但可靠",
    moves: "睡覺、泰山壓頂、重磅衝撞、地震",
  },
  {
    name: "妙蛙花",
    image: venusaurImg,
    intro: "草屬性的穩定代表，兼具控場與續航，常被視為早期經典隊伍的基礎力量。",
    detail: "妙蛙花的定位偏向控制與消耗，讓 RED 的隊伍在攻防節奏上更完整。",
    nature: "冷靜、耐久、擅長消耗",
    moves: "飛葉快刀、藤鞭、陽光烈焰、睡眠粉",
  },
  {
    name: "噴火龍",
    image: charizardImg,
    intro: "火焰系的招牌夥伴，輸出鮮明、氣勢強，讓 RED 的隊伍更有壓迫感。",
    detail: "噴火龍是視覺上最有爆發感的主力之一，讓整個白銀山隊伍的氣勢更完整。",
    nature: "高傲、強勢、爆發力高",
    moves: "噴射火焰、空氣斬、翅膀攻擊、龍爪",
  },
  {
    name: "水箭龜",
    image: blastoiseImg,
    intro: "兼具防守與火力的經典夥伴，和前排搭配時很能撐起整體對戰節奏。",
    detail: "水箭龜讓隊伍的攻防輪轉更平衡，屬於很能撐場的經典主力。",
    nature: "穩定、冷靜、平衡型",
    moves: "水炮、冰凍光束、咬碎、保護",
  },
  {
    name: "太陽伊布",
    image: espeonImg,
    intro: "偏向高速度與精神力的夥伴，讓 RED 的隊伍多了一層優雅但銳利的收尾能力。",
    detail: "太陽伊布帶來的是另一種高級感，收尾時很乾淨，也很有傳說角色的味道。",
    nature: "敏銳、優雅、反應快",
    moves: "精神強念、影子球、晨光、速度互換",
  },
];

const records = [
  {
    title: "代表稱號",
    value: "傳說訓練家",
    text: "RED 的名字往往和傳奇、沉默、強度與白銀山的孤高氛圍一起出現。",
    accent: "檔案編號 01",
  },
  {
    title: "首次登場",
    value: "關都年代",
    text: "從經典作品一路延伸到後續改編，RED 幾乎就是最具象徵性的訓練家形象。",
    accent: "檔案編號 02",
  },
  {
    title: "所屬地區",
    value: "真新鎮 / 關都",
    text: "他與真新鎮的連結很強，也因此成為關都系統裡最代表性的角色之一。",
    accent: "檔案編號 03",
  },
  {
    title: "戰鬥風格",
    value: "沉著、直接、壓迫感強",
    text: "不是靠話語，而是靠站位、隊伍和對戰本身，讓人感受到他的重量。",
    accent: "檔案編號 04",
  },
  {
    title: "相關作品",
    value: "遊戲、改編、衍生紀錄",
    text: "從主系列到衍生作品，RED 幾乎一直以傳說級角色的姿態被提起。",
    accent: "檔案編號 05",
  },
  {
    title: "傳說紀錄",
    value: "白銀山最終對戰",
    text: "白銀山上的那場對戰，幾乎就是 RED 形象最經典的定錨點。",
    accent: "檔案編號 06",
  },
];

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
            <h1>RED</h1>
            <p className="role">代表稱號：傳說訓練家</p>
            <p className="lead">
              在白銀山與關都的傳說裡，RED 幾乎總是以沉默卻強烈的方式被記住。
              他像一份被封存的戰鬥檔案，越翻閱，越能感受到那份安靜的壓迫感。
            </p>
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
              RED 是來自真新鎮的傳說訓練家，也是關都語境裡最具代表性的角色之一。
              他不靠大量台詞建立印象，而是靠戰鬥、隊伍和沉默本身，讓人記住他的存在。
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
