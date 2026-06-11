# RED 傳說檔案全端實戰

這是一個使用 Codex 協助完成的個人品牌網站專案，主角不是一般品牌人物，而是寶可夢訓練家 `RED`。

網站的目標是把 `RED` 做成一個帶有傳說感、檔案感與精品互動感的角色介紹網站，讓人可以一眼認識他，也能看到他的寶可夢夥伴、白銀山隊伍與傳說紀錄。

目前專案已經包含前端與後端：

- `frontend/`：網站畫面、商品展示、經歷展示、新增表單
- `backend/`：保存商品資料與經歷資料，提供前端讀取與新增

---

## 專案介紹

這個專案是透過 Codex 協助建立的全端練習網站，內容圍繞 `RED` 這位傳說訓練家。

網站目前可以做到：

- 展示 `RED` 的主視覺與介紹
- 展示寶可夢夥伴與白銀山隊伍
- 展示傳說紀錄
- 點擊按鈕後新增商品資料
- 點擊按鈕後新增經歷資料
- 後端可以把新增內容保存下來
- 前端可以讀取後端資料

---

## 專案資料夾結構

目前專案大致長這樣：

```text
personal-brand-site/
├── frontend/
│   ├── 角色圖片/
│   ├── 經歷圖片/
│   └── 網站畫面
└── backend/
    └── 資料保存與讀取功能
```

補充說明：

- `frontend/角色圖片/` 放 RED 的主視覺圖片
- `frontend/經歷圖片/` 放寶可夢與經歷相關圖片
- `frontend/src/` 放 React 網站程式
- `backend/` 放 Flask 後端

---

## 如何放圖片

圖片請放在對應資料夾內。

### 角色圖片

RED 的角色圖片放在：

```text
frontend/角色圖片
```

目前這個專案的主視覺與角色圖也放在這個資料夾中。

### 經歷圖片

經歷圖片放在：

```text
frontend/經歷圖片
```

### 圖片命名建議

建議圖片檔名直接用看得懂的名稱，例如：

- `Pikachu.png`
- `Snorlax.png`
- `Venusaur.png`
- `Red-FRLG.png`
- `Red-LetsGo.png`

這樣之後在前端輸入圖片檔名時，比較不容易寫錯。

### 新增商品時要注意

如果之後你要新增寶可夢圖鑑，前端表單中的「圖片檔名」要跟 `frontend/經歷圖片` 裡的檔名一致。

### 新增經歷時要注意

如果之後你要新增經歷，前端表單中的「圖片檔名」也要跟資料夾內的檔名一致。

---

## 如何啟動前端

前端使用的是 **React + Vite**。

### 第 1 步：打開終端機

先進入專案的 `frontend/` 資料夾：

```bash
cd /Users/kaiyang/Desktop/Tiandiren/Tiandiren_codex/frontend
```

如果你已經在專案根目錄，也可以直接：

```bash
cd frontend
```

### 第 2 步：安裝套件

第一次執行前要先安裝套件：

```bash
npm install
```

### 第 3 步：啟動前端

安裝完成後執行：

```bash
npm run dev
```

啟動後，終端機會顯示網址，通常是：

```text
http://localhost:5173/
```

把這個網址打開，就能看到網站。

---

## 如何啟動後端

後端使用的是 **Flask**，而且要在你的 `Tiandiren` 虛擬環境裡執行。

### 第 1 步：進入後端資料夾

```bash
cd /Users/kaiyang/Desktop/Tiandiren/Tiandiren_codex/backend
```

### 第 2 步：啟動虛擬環境

```bash
conda activate Tiandiren
```

### 第 3 步：安裝後端套件

第一次執行時先安裝 Flask 與相關套件：

```bash
pip install -r requirements.txt
```

### 第 4 步：啟動後端

```bash
python app.py
```

成功後，終端機會顯示類似這樣的訊息：

```text
Running on http://127.0.0.1:5050
```

### 第 5 步：確認後端有沒有跑起來

打開瀏覽器，輸入：

```text
http://127.0.0.1:5050/health
```

如果看到：

```json
{"ok": true, "message": "backend is running"}
```

就代表後端正常運作。

---

## 如何部署到 Vercel

這個專案已經補上 Vercel 需要的基本設定：

- `vercel.json`：告訴 Vercel 要 build `frontend/`
- `api/index.py`：讓 Vercel 可以找到 Flask 後端入口
- `requirements.txt`：讓 Vercel 安裝 Flask 需要的 Python 套件
- `package.json`：讓根目錄可以執行前端 build

如果要部署到 Vercel，通常流程是：

1. 把專案推到 GitHub
2. 到 Vercel 建立 New Project
3. 選擇這個 GitHub 專案
4. Root Directory 請維持專案根目錄，不要只選 `frontend` 或 `backend`
5. Framework Preset 可以選 `Other`，不要選 `Services`
6. 不要把 `experimentalServices` 那段設定貼進 `vercel.json`
7. 確認 Build Command 是 `npm run build --prefix frontend`
8. 確認 Output Directory 是 `frontend/dist`
9. 按下 Deploy

### 如果 Vercel 顯示 Root Directory 是 backend

如果畫面上出現：

```text
Tiandiren_codex / backend
Root Directory: backend
```

請一定要按旁邊的 `Edit`，把 Root Directory 改成專案根目錄。

也就是說，不要讓 Vercel 從 `backend/` 開始 build，因為這樣它會去找：

```text
backend/frontend/package.json
```

但真正的前端在：

```text
frontend/package.json
```

正確設定應該是：

```text
Root Directory：留空或選 Tiandiren_codex 專案根目錄
Framework Preset：Other
Install Command：npm install --prefix frontend
Build Command：npm run build --prefix frontend
Output Directory：frontend/dist
```

目前專案也加了一個防呆設定：

- `backend/frontend` 會指向真正的 `frontend`
- `backend/api/index.py` 讓 Vercel 如果誤用 `backend` 當根目錄時，也能找到 Flask 入口

所以如果你暫時無法把 Root Directory 改掉，請重新 push 最新程式碼後再 Redeploy 一次。不過長期最推薦的設定仍然是 Root Directory 使用專案根目錄。

如果 Vercel 跳出類似下面這種設定：

```json
{
  "experimentalServices": {
    "frontend": {
      "routePrefix": "/"
    },
    "backend": {
      "root": "backend",
      "routePrefix": "/_/backend"
    }
  }
}
```

代表 Vercel 可能把專案當成實驗性的多服務專案在處理。這份作業目前不需要這種設定，請回到 Project Settings，把 Framework Preset 改成 `Other`，Root Directory 維持專案根目錄，並使用專案內現有的 `vercel.json`。

### Vercel 部署注意事項

目前後端在本機會把新增資料保存到 `backend/data.json`。

但 Vercel 的 serverless 環境不適合把 JSON 當成永久資料庫使用，所以部署後新增資料可以回應成功，但資料不一定能像本機一樣永久保存。

如果未來要讓 Vercel 上的資料真的長期保存，下一步建議接資料庫，例如 Supabase、Neon、Firebase 或其他雲端資料庫。

---

## 如何新增商品

目前網站前端已經有「新增商品」功能。

操作方式很簡單：

1. 點擊「新增寶可夢圖鑑」
2. 填寫商品名稱、圖片檔名、簡介
3. 按下「儲存寶可夢」
4. 新商品就會出現在網站上

如果後端有正常啟動，這筆資料也會被保存到後端。

---

## 如何新增經歷

目前網站前端也有「新增經歷」功能。

操作方式如下：

1. 點擊「新增經歷」
2. 填寫經歷標題、圖片檔名、簡介
3. 按下「儲存經歷」
4. 新經歷就會出現在網站上

如果後端有正常啟動，這筆資料也會被保存到後端。

---

## 目前完成的功能

- RED 的傳說檔案首頁主視覺
- 關於 RED 區塊
- 寶可夢夥伴展示
- 白銀山隊伍展示
- 傳說紀錄展示
- 寶貝球滑鼠跟隨效果
- 前端新增寶可夢圖鑑
- 前端新增經歷
- Flask 後端保存資料
- 前端讀取後端資料
- `Tiandiren` 虛擬環境支援

---

## 未來可以延伸的功能

- 編輯既有商品
- 刪除商品
- 編輯既有經歷
- 刪除經歷
- 後台登入
- 圖片上傳
- 把資料庫改成真正的資料庫
- 部署到雲端

---

## 常見問題

### 為什麼圖片沒有出現？

通常是下面三種原因：

- 圖片檔名寫錯
- 圖片沒有放在正確資料夾
- 前端寫的檔名跟實際檔名不一致

你可以先確認：

- RED 角色圖片放在 `frontend/角色圖片`
- 寶可夢與經歷圖片放在 `frontend/經歷圖片`

---

### 為什麼新增後重新整理還在，或不在？

這跟後端有沒有成功啟動有關。

- 如果後端有啟動，新增的資料會保存到 `backend/data.json`
- 如果只有前端、後端沒啟動，資料可能只存在畫面上，重新整理就會消失

---

### 為什麼前端讀不到後端資料？

常見原因有：

- 後端沒有啟動
- 後端埠號不是 `5050`
- 前端沒有透過 `/api` 正確轉發

目前這個專案的前後端連線是：

- 前端：`http://localhost:5173`
- 後端：`http://127.0.0.1:5050`

---

### 前端和後端為什麼要分開？

因為兩者負責的事情不一樣：

- 前端：負責畫面、排版、互動
- 後端：負責保存資料、提供資料

這樣的切法比較清楚，也比較方便之後擴充。

---

## 你最常會用到的指令

### 前端

```bash
cd frontend
npm install
npm run dev
```

### 後端

```bash
cd backend
conda activate Tiandiren
pip install -r requirements.txt
python app.py
```

---

如果你先把這份 README 看懂，之後你就可以自己把前端跟後端打開，也比較知道圖片和資料該放在哪裡。
