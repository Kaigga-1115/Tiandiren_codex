from __future__ import annotations

import json
import os
import tempfile
from pathlib import Path
from typing import Any

from flask import Flask, jsonify, request
from flask_cors import CORS


BASE_DIR = Path(__file__).resolve().parent
DATA_FILE = Path(tempfile.gettempdir()) / "red_archive_data.json" if os.environ.get("VERCEL") else BASE_DIR / "data.json"


def default_data() -> dict[str, list[dict[str, Any]]]:
    """建立一份教學用的初始資料。

    這些資料會在第一次啟動時寫入 JSON 檔，方便後續新增與讀取。
    """
    return {
        "companions": [
            {
                "id": 1,
                "name": "皮卡丘",
                "image": "Pikachu.png",
                "intro": "RED 最具代表性的夥伴之一，速度快、反應靈活。",
                "detail": "RED 的皮卡丘常被視為整體戰鬥節奏的引導者，讓隊伍既有速度也有辨識度。",
                "nature": "活潑、警覺、默契高",
                "moves": "十萬伏特、電光一閃、鐵尾、伏特攻擊",
            },
            {
                "id": 2,
                "name": "卡比獸",
                "image": "Snorlax.png",
                "intro": "擅長承受攻勢並穩住戰局，是 RED 隊伍中非常典型的厚實型主力。",
                "detail": "卡比獸是 RED 很重要的耐久支點，能讓戰局拉長，也能在關鍵時刻穩住局面。",
                "nature": "沉穩、耐打、節奏慢但可靠",
                "moves": "睡覺、泰山壓頂、重磅衝撞、地震",
            },
            {
                "id": 3,
                "name": "妙蛙花",
                "image": "Venusaur.png",
                "intro": "草屬性的穩定代表，兼具控場與續航。",
                "detail": "妙蛙花的定位偏向控制與消耗，讓 RED 的隊伍在攻防節奏上更完整。",
                "nature": "冷靜、耐久、擅長消耗",
                "moves": "飛葉快刀、藤鞭、陽光烈焰、睡眠粉",
            },
            {
                "id": 4,
                "name": "噴火龍",
                "image": "Charizard.png",
                "intro": "火焰系的招牌夥伴，輸出鮮明、氣勢強，讓 RED 的隊伍更有壓迫感。",
                "detail": "噴火龍是視覺上最有爆發感的主力之一，讓整個白銀山隊伍的氣勢更完整。",
                "nature": "高傲、強勢、爆發力高",
                "moves": "噴射火焰、空氣斬、翅膀攻擊、龍爪",
            },
            {
                "id": 5,
                "name": "水箭龜",
                "image": "Blastoise.png",
                "intro": "兼具防守與火力的經典夥伴，和前排搭配時很能撐起整體對戰節奏。",
                "detail": "水箭龜讓隊伍的攻防輪轉更平衡，屬於很能撐場的經典主力。",
                "nature": "穩定、冷靜、平衡型",
                "moves": "水炮、冰凍光束、咬碎、保護",
            },
            {
                "id": 6,
                "name": "太陽伊布",
                "image": "Espeon.png",
                "intro": "偏向高速度與精神力的夥伴，讓 RED 的隊伍多了一層優雅但銳利的收尾能力。",
                "detail": "太陽伊布帶來的是另一種高級感，收尾時很乾淨，也很有傳說角色的味道。",
                "nature": "敏銳、優雅、反應快",
                "moves": "精神強念、影子球、晨光、速度互換",
            },
        ],
        "records": [
            {
                "id": 1,
                "title": "關都冠軍",
                "image": "Red-FRLG.png",
                "intro": "RED 被視為來自真新鎮的傳奇訓練家。",
                "detail": "從經典作品一路延伸到後續改編，RED 幾乎就是最具象徵性的訓練家形象。",
                "year": "關都年代",
                "result": "傳說訓練家",
            },
            {
                "id": 2,
                "title": "白銀山修行",
                "image": "Red-SunMoon.png",
                "intro": "在白銀山獨自訓練，讓 RED 的形象更孤高。",
                "detail": "白銀山上的那場對戰，幾乎就是 RED 形象最經典的定錨點。",
                "year": "第 2 世代後",
                "result": "白銀山最終對戰",
            },
            {
                "id": 3,
                "title": "沉默強者",
                "image": "Red-LetsGo.png",
                "intro": "不是靠大量台詞，而是靠戰鬥本身讓人記住。",
                "detail": "RED 的存在感來自於隊伍、站位與整體氛圍。",
                "year": "長期傳說定位",
                "result": "關都代表角色",
            },
        ],
    }


def load_data() -> dict[str, list[dict[str, Any]]]:
    """讀取 data.json；如果沒有檔案，就建立預設資料。"""
    if not DATA_FILE.exists():
        data = default_data()
        save_data(data)
        return data

    with DATA_FILE.open("r", encoding="utf-8") as file:
        return json.load(file)


def save_data(data: dict[str, list[dict[str, Any]]]) -> None:
    """把目前資料寫回 JSON 檔。"""
    with DATA_FILE.open("w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=2)


app = Flask(__name__)
CORS(app)


@app.get("/health")
def health():
    return jsonify({"ok": True, "message": "backend is running"})


@app.get("/api/companions")
def get_companions():
    data = load_data()
    return jsonify(data["companions"])


@app.get("/api/companions/<int:companion_id>")
def get_companion_detail(companion_id: int):
    data = load_data()
    companion = next((item for item in data["companions"] if item["id"] == companion_id), None)
    if companion is None:
        return jsonify({"message": "找不到該寶可夢資料"}), 404
    return jsonify(companion)


@app.post("/api/companions")
def add_companion():
    data = load_data()
    payload = request.get_json(silent=True) or {}

    name = str(payload.get("name", "")).strip()
    intro = str(payload.get("intro", "")).strip()
    if not name:
        return jsonify({"message": "寶可夢名稱不能空白"}), 400
    if not intro:
        return jsonify({"message": "簡介不能空白"}), 400

    next_id = max((item["id"] for item in data["companions"]), default=0) + 1
    companion = {
        "id": next_id,
        "name": name,
        "image": str(payload.get("image", "")).strip(),
        "intro": intro,
        "detail": str(payload.get("detail", "")).strip(),
        "nature": str(payload.get("nature", "")).strip(),
        "moves": str(payload.get("moves", "")).strip(),
    }
    data["companions"].append(companion)
    save_data(data)
    return jsonify(companion), 201


@app.get("/api/records")
def get_records():
    data = load_data()
    return jsonify(data["records"])


@app.get("/api/records/<int:record_id>")
def get_record_detail(record_id: int):
    data = load_data()
    record = next((item for item in data["records"] if item["id"] == record_id), None)
    if record is None:
        return jsonify({"message": "找不到該經歷資料"}), 404
    return jsonify(record)


@app.post("/api/records")
def add_record():
    data = load_data()
    payload = request.get_json(silent=True) or {}

    title = str(payload.get("title", "")).strip()
    intro = str(payload.get("intro", "")).strip()
    if not title:
        return jsonify({"message": "經歷標題不能空白"}), 400
    if not intro:
        return jsonify({"message": "簡介不能空白"}), 400

    next_id = max((item["id"] for item in data["records"]), default=0) + 1
    record = {
        "id": next_id,
        "title": title,
        "image": str(payload.get("image", "")).strip(),
        "intro": intro,
        "detail": str(payload.get("detail", "")).strip(),
        "year": str(payload.get("year", "")).strip(),
        "result": str(payload.get("result", "")).strip(),
    }
    data["records"].append(record)
    save_data(data)
    return jsonify(record), 201


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050, debug=True)
