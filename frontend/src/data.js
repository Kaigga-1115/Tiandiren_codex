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

export const redPortraits = [
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

export const redProfile = {
  name: "RED",
  title: "傳說訓練家",
  intro:
    "在白銀山與關都的傳說裡，RED 幾乎總是以沉默卻強烈的方式被記住。他像一份被封存的戰鬥檔案，越翻閱，越能感受到那份安靜的壓迫感。",
  about:
    "RED 是來自真新鎮的傳說訓練家，也是關都語境裡最具代表性的角色之一。他不靠大量台詞建立印象，而是靠戰鬥、隊伍和沉默本身，讓人記住他的存在。",
  facts: [
    { label: "首次登場", value: "關都年代" },
    { label: "所屬地區", value: "真新鎮 / 關都" },
    { label: "戰鬥風格", value: "沉著、直接、壓迫感強" },
    { label: "代表稱號", value: "傳說訓練家" },
    { label: "相關作品", value: "遊戲、改編、衍生紀錄" },
    { label: "傳說紀錄", value: "白銀山最終對戰" },
  ],
};

export const companions = [
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

export const records = [
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
