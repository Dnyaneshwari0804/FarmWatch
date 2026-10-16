# 🌱 FarmWatch AI

> **Turning any smartphone into a crop doctor.** An AI-powered Agritech platform that helps farmers detect crop diseases from leaf images, get actionable treatment plans, and protect their harvest.


![Backend](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi)
![Frontend](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)
![ML](https://img.shields.io/badge/ML-Transfer_Learning_&_Grad--CAM-EE4C2C?logo=pytorch)

---

## 🎯 The Problem
Farmers lose up to **30% of their crops** every year because they spot diseases too late. They don't have access to plant pathologists, and by the time a disease is visible to the naked eye, it has already spread.

## 💡 The Solution
**FarmWatch AI** is a full-stack Agritech SaaS platform. A farmer uploads a leaf image, and our Deep Learning model detects the disease in **under 2 seconds**, with **Explainable AI (Grad-CAM)** showing exactly *why* the AI made that decision. It then provides treatment plans, cost estimates, and translates them into the farmer's native language.

---

## 🚀 Key Features

- 🧠 **AI Disease Detection** — Advanced CNN with Transfer Learning detects 30+ crop diseases.
- 🔍 **Explainable AI (Grad-CAM)** — Heatmaps highlight exactly where the AI sees the disease. No black boxes.
- 🌦️ **Live Weather Integration** — Real-time weather via Open-Meteo API predicts disease risk before it spreads.
- 💊 **Actionable Treatment Plans** — Remedies with estimated costs (₹) and potential yield loss.
- 🌍 **Multi-Language Support** — Instant translation in **English, Hindi, and Marathi**.
- ❓ **Smart Follow-Up Questions** — When confidence is low, the AI asks targeted questions to confirm the diagnosis.
- 🗺️ **Field Mapping** — Interactive dark-mode map to track multiple fields across the farm.
- 🕒 **Scan History** — Persistent history of all scans, with a health overview pie chart.
- 📄 **PDF Reports** — Download a professional PDF of the diagnosis to share with agronomists.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React (Vite), Tailwind CSS, Recharts, Leaflet, Axios, jsPDF |
| **Backend** | FastAPI, SQLAlchemy, SQLite, Python-Multipart, Pydantic |
| **ML / AI** | PyTorch / TensorFlow (Transfer Learning CNN), Grad-CAM |
| **APIs** | Open-Meteo (Weather), Web Speech API (Voice), Geolocation API |

---

## 📁 Project Structure

```text
crop-stress-project/
├── frontend/                 # React (Vite) Application
│   ├── src/
│   │   ├── components/       # Dashboard, ScanCrop, FieldMap, History, Login, Landing
│   │   ├── services/         # API calls (Axios)
│   │   ├── App.jsx           # Main app routing
│   │   └── main.jsx
│   └── package.json
│
├── backend/                  # FastAPI Application
│   ├── app/
│   │   ├── api/              # Route handlers (predict.py, history.py)
│   │   ├── core/             # Config & Database setup
│   │   ├── models/           # SQLAlchemy DB models
│   │   ├── schemas/          # Pydantic validation schemas
│   │   ├── services/         # ML inference & business logic
│   │   └── main.py           # FastAPI initialization
│   ├── models/               # Trained model files (.h5 / .pth)
│   ├── venv/
│   └── requirements.txt
│
└── README.md
