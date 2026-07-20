# 🌍 GeoTrust AI

**Trust Evaluation Framework for Multi-Source Geospatial Insights**

> *"Making Hidden Trust Visible."*

[![Live Demo](https://img.shields.io/badge/demo-live-2563EB?style=flat-square)](https://geo-trust-ai-six.vercel.app/)
[![License](https://img.shields.io/badge/license-MIT-black?style=flat-square)](#license)
[![Status](https://img.shields.io/badge/status-functional%20prototype-brightgreen?style=flat-square)]()

**Live App:** [GeoTrust-AI](https://geo-trust-ai-six.vercel.app/)

**Built for:** Emerging Technologies Hackathon 2026 · Powered by TCOE India

---

## 📌 Overview

When satellites, sensors, and APIs fuse into insights like *"flood extent: 4.2 sq km,"* most systems never tell you how much to actually believe that number.

**GeoTrust AI** is a **trust layer for geospatial pipelines** — it doesn't replace your analytics, it audits them. A six-module engine scores every fused geospatial insight with a transparent **Trust Score (0–100)**, backed by a plain-language, LLM-generated rationale so both technical and non-technical stakeholders can understand *why* a score was assigned.

### The Problem

- Multi-source geospatial data (satellite, sensor, IoT) disagrees by default — resolution, frequency, and accuracy drift between sources.
- Downstream analytics ship without confidence intervals or error bars.
- Black-box outputs offer no explainability for high-stakes decisions.
- Real-world consequences: misallocated disaster response resources, irrigation planning errors, flawed urban planning decisions.

### The Solution

GeoTrust AI ingests multi-source geospatial data, validates it, and runs it through an AI-powered trust-evaluation engine that produces:

- A numeric **Trust Score (0–100)** for every fused insight
- **Cross-source consistency** checks (IoU-based agreement between overlapping sources)
- **Real-time anomaly detection** on sensor/data drift
- **Uncertainty quantification** alongside every output
- A **plain-language explanation** of the score, generated via LLM
- A simple **REST API** for drop-in integration into existing pipelines

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🧮 **Trust Score Engine** | Six-module pipeline producing a 0–100 trust score per insight |
| 🗺️ **Multi-Source Map Overlay** | Visualizes overlapping sources (e.g. Sentinel-1, Sentinel-2, IoT feeds) on one map |
| 🔍 **Cross-Source Consistency (IoU)** | Flags disagreement between overlapping geospatial datasets |
| 🚨 **Anomaly Detection** | Detects sensor drift and outlier readings in real time |
| 📊 **Source Reliability Table** | Tracks and displays credibility scores per data source |
| 🧠 **Explainable AI** | Every score ships with a plain-language rationale generated via LLM |
| 🔌 **API-First Design** | REST API enables integration without rebuilding existing pipelines |
| 📈 **Live Trust Meter Dashboard** | Interactive gauge + score visualization in the web app |

---

## 🧪 Live Demo

**Web App:** [https://geo-trust-ai-six.vercel.app/](https://geo-trust-ai-six.vercel.app/)

Things to try in the demo:
- Generate a Trust Score with the live gauge
- Run a cross-source IoU consistency check on overlapping flood polygons
- Trigger anomaly detection on simulated sensor drift
- View the LLM-generated rationale behind any score
- Call the REST API directly (see [API](#-api) below)

---

## 🏗️ Architecture

GeoTrust AI follows a **four-layer architecture**:

```
┌────────────────┐    ┌────────────────┐    ┌─────────────────────┐    ┌──────────────────┐
│   Ingestion     │ →  │   Validation    │ →  │   AI Engine Core     │ →  │   Presentation    │
│ GeoTIFF, NetCDF,│    │ Schema & CRS    │    │ 6 modules:           │    │ REST API +        │
│ JSON, CSV,      │    │ checks          │    │ Source Profiling,    │    │ React Dashboard   │
│ streaming data  │    │                 │    │ Consistency,         │    │                   │
│                 │    │                 │    │ Anomaly Detection,   │    │                   │
│                 │    │                 │    │ Confidence,          │    │                   │
│                 │    │                 │    │ Trust Score,         │    │                   │
│                 │    │                 │    │ LLM Explanation      │    │                   │
└────────────────┘    └────────────────┘    └─────────────────────┘    └──────────────────┘
```

Spatial indexing is handled via **PostgreSQL + PostGIS**, and the stack is containerized with **Docker** for portable deployment.

### Trust Score Formula

```
TrustScore = 100 · (α·C + β·Conf + γ·(1 − AnomalyPenalty))
```

Where:
- **C** — cross-source consistency (IoU-based agreement across overlapping data)
- **Conf** — model/source confidence
- **AnomalyPenalty** — penalty derived from real-time anomaly detection
- **α, β, γ** — tunable weights that sum to 1

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React + Leaflet |
| **Backend** | Python + FastAPI |
| **Machine Learning** | PyTorch + Scikit-learn (CUSUM, Isolation Forest, ensemble models) |
| **Geospatial Processing** | GDAL, Rasterio, GeoPandas |
| **Database** | PostgreSQL + PostGIS |
| **LLM / Explainability** | Groq (plain-language rationale generation) |
| **Deployment** | Docker, hosted on Vercel (frontend) & Render (backend) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- PostgreSQL 14+ with the PostGIS extension
- Docker (optional, for containerized setup)
- A Groq API key (for LLM-generated rationale)

### 1. Clone the repository

```bash
git clone https://github.com/Vanshsrivastava09/GeoTrust-AI.git
cd GeoTrust-AI
```

### 2. Backend setup

```bash
cd backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` directory:

```env
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/geotrust_ai
GROQ_API_KEY=your_groq_api_key_here
API_SECRET_KEY=your_api_secret_here
ALLOWED_ORIGINS=http://localhost:3000
```

Run database migrations and start the API:

```bash
alembic upgrade head        # or your migration tool of choice
uvicorn main:app --reload --port 8000
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

Start the dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### 4. Run with Docker (alternative)

```bash
docker-compose up --build
```

---

## 📡 API

GeoTrust AI exposes a REST API so existing geospatial pipelines can plug in without a rebuild.

### Generate a Trust Score

```http
POST /api/v1/trust-score
Content-Type: application/json
Authorization: Bearer <API_TOKEN>
```

**Request body:**

```json
{
  "sources": [
    { "id": "sentinel-1", "geometry": "GeoJSON polygon", "confidence": 0.87 },
    { "id": "sentinel-2", "geometry": "GeoJSON polygon", "confidence": 0.91 },
    { "id": "iot-sensor-14", "geometry": "GeoJSON point", "confidence": 0.76 }
  ],
  "metric": "flood_extent"
}
```

**Response:**

```json
{
  "trust_score": 87.3,
  "consistency": 0.91,
  "confidence": 0.85,
  "anomaly_penalty": 0.04,
  "rationale": "Sources show strong spatial agreement (IoU 0.91) with no significant anomalies detected. Confidence is high across all three inputs."
}
```

Full API reference is available at `/docs` (interactive Swagger UI) once the backend is running.

---

## 🔒 Security, Privacy & Compliance

- **Security:** Token-based API authentication, TLS-in-transit, encrypted at-rest storage on PostgreSQL, per-key rate limiting, container-level isolation via Docker, and a signed audit log for every Trust Score produced.
- **Privacy:** Data-minimization by design — only geometry and metadata are retained; raw imagery is discarded post-scoring by default. Tenant isolation is enforced via PostGIS schemas, with an optional private-deployment mode that keeps all data inside the customer's VPC.
- **Compliance:** Designed against OGC geospatial standards, aligned with India's DPDP Act principles, and structured to support ISO 27001 controls. The explainability layer helps meet emerging AI-governance disclosure requirements.
- **Resilience:** Stateless services auto-restart on failure. The anomaly-detection module also monitors the pipeline's own health, and circuit breakers isolate misbehaving upstream sources so one bad feed can't poison the fused trust score.

---

## 🗺️ Roadmap

- **Q1** — Google Earth Engine + ISRO Bhuvan integration
- **Q2** — Kafka streaming for real-time IoT data
- **Q4** — Multi-tenant enterprise SaaS offering

---

## 🎯 Target Users

- Disaster-management agencies (NDMA, state DMAs)
- Agri-tech & irrigation planners
- Environmental monitoring bodies
- Urban planning departments
- GIS & earth-observation platform vendors seeking a trust layer

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please open an issue first to discuss any major changes.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👤 Author

**Vansh Srivastava**
Kalinga Institute of Industrial Technology (KIIT)

- GitHub: [@Vanshsrivastava09](https://github.com/Vanshsrivastava09)
- Live Demo: [geo-trust-ai-six.vercel.app](https://geo-trust-ai-six.vercel.app/)

---

## 🙏 Acknowledgements

Built for the **Emerging Technologies Hackathon 2026**, powered by **TCOE India**.

<p align="center"><i>"Making Hidden Trust Visible."</i></p>
