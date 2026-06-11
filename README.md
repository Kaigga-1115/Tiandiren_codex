# RED 傳說檔案

這是一個使用 React + Vite 製作的前端練習專案，主題是寶可夢訓練家 `RED` 的傳說感介紹網站。

目前前端程式放在 `frontend/` 資料夾裡，網站包含：

- 導覽列
- 首頁主視覺
- 關於 RED
- 寶可夢夥伴
- 白銀山隊伍
- 傳說紀錄
- 網站底部

## 專案位置

請先進入 `frontend/` 再執行指令。

```bash
cd frontend
```

## 從 0 到 1 的操作步驟

如果你是第一次打開這個專案，可以照下面順序做：

### 1. 安裝 Node.js

React + Vite 需要 Node.js 才能執行。

如果你的電腦還沒有安裝 Node.js，請先安裝 LTS 版本。

### 2. 打開終端機並切到專案資料夾

先進入這個專案的前端資料夾：

```bash
cd /Users/kaiyang/Desktop/Tiandiren/Tiandiren_codex/frontend
```

如果你已經在專案根目錄，也可以直接：

```bash
cd frontend
```

### 3. 安裝套件

第一次執行時要先安裝依賴套件：

```bash
npm install
```

這一步會下載 React、ReactDOM、Vite 與 React 外掛。

### 4. 啟動開發伺服器

安裝完成後，輸入：

```bash
npm run dev
```

如果你想讓手機或同網路的其他裝置也能看到，可以用：

```bash
npm run dev -- --host 0.0.0.0
```

啟動成功後，終端機通常會顯示像這樣的網址：

```bash
http://localhost:5173/
```

把這個網址打開，就能看到網站。

## 常用指令

### 開發模式

```bash
npm run dev
```

### 打包正式版

```bash
npm run build
```

這個指令會把網站打包成正式可部署的檔案。

### 預覽正式版

```bash
npm run preview
```

這個指令可以在本機預覽打包後的結果。

## 檔案結構

目前重要檔案如下：

```text
frontend/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   └── styles.css
├── 角色圖片/
│   └── Red.png
└── 經歷圖片/
    ├── Pikachu.png
    ├── Snorlax.png
    ├── Venusaur.png
    ├── Charizard.png
    ├── Blastoise.png
    └── Espeon.png
```

## 圖片路徑說明

如果你之後要替換圖片，只要把圖片放到對應資料夾，並維持檔名一致即可。

例如：

- `frontend/角色圖片/Red.png`
- `frontend/經歷圖片/Pikachu.png`
- `frontend/經歷圖片/Snorlax.png`

## 編輯網站內容

如果你要改網站內容，通常會改這三個檔案：

- `frontend/src/App.jsx`：頁面內容、資料、互動邏輯
- `frontend/src/styles.css`：視覺樣式、動畫、排版
- `frontend/index.html`：頁面標題、簡介資訊

## 目前網站的互動特色

- 寶貝球滑鼠跟隨效果
- 寶可夢夥伴卡片點擊後，右側顯示詳情
- 滑動式的寶可夢夥伴展示列
- 暗紅 + 金色的傳說感視覺

## 小提醒

- 如果你第一次打開畫面是空白，先確認有沒有先執行 `npm install`
- 如果 `npm run dev` 出現錯誤，通常是因為你不在 `frontend/` 資料夾裡
- 如果圖片沒顯示，先檢查檔名和路徑有沒有拼錯

## 你最常會用到的指令

```bash
cd frontend
npm install
npm run dev
```

這三行就是最基本的啟動流程。
