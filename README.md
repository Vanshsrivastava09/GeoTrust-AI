# 🌍 GeoTrust AI

<div align="center">

![GeoTrust AI Logo](https://img.shields.io/badge/GeoTrust-AI-blue?style=for-the-badge&logo=rocket)
![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.11+-blue?style=for-the-badge&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-green?style=for-the-badge&logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-PostGIS-blue?style=for-the-badge&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=for-the-badge&logo=docker)

**Trust Evaluation Framework for Multi-Source Geospatial Insights**

[Demo](#-demo) • [Documentation](#-documentation) • [API Reference](#-api-reference) • [Deployment](#-deployment)

</div>

---

---
---

## 🎯 Problem Statement

### The Hidden Crisis in Geospatial Data

Over the last few years, geospatial data has become one of the most important inputs into **high-stakes decisions**:
- 🚨 Where to send disaster relief teams
- 🌾 When to irrigate a field  
- ️ How to plan a new road network
- 🌳 How to track deforestation over a decade

### The Problem

**None of these sources agree with each other by default.** When a system fuses optical satellites, radar, weather APIs, IoT sensors, and crowd-sourced reports into one tidy number — *"flood extent: 4.2 sq km"* — it **rarely tells you how much of that number you should actually believe**.

### Real-World Impact

| Domain | Consequence of Untrusted Data |
|--------|-------------------------------|
| **Disaster Management** | Response teams dispatched to wrong locations based on false confidence |
| **Agriculture** | Irrigation decisions based on cloud-contaminated satellite data |
| **Environmental Monitoring** | Sensor drift mistaken for genuine climate trends |
| **Urban Planning** | Infrastructure decisions built on unreliable population density maps |

---

## 💡 Solution

### Introducing GeoTrust AI

**GeoTrust AI is a trust layer** that sits on top of existing geospatial pipelines. It doesn't replace your analytics tools — it **audits them**.

<div align="center">

```text
┌───────────────┐      ┌────────────────┐      ┌────────────────────┐
│ Data Sources  │ ───▶ │  GeoTrust AI   │ ───▶ │ Decision Makers    │
│ • Satellites  │      │ Trust Score    │      │ • Emergency Resp.  │
│ • IoT Sensors │      │ Explainable AI │      │ • Farmers          │
│ • Weather APIs│      │                │      │ • Urban Planners   │
└───────────────┘      └────────────────┘      └────────────────────┘
```

</div>

### What You Get

✅ **Quantified Trust Scores** (0-100) for every geospatial insight  
✅ **Cross-source consistency checks** using spatial IoU and temporal correlation  
✅ **Anomaly detection** for sensor drift and data degradation  
✅ **Explainable AI** with plain-language rationales  
✅ **REST API** for seamless integration into existing pipelines  

---

## ✨ Key Features

### 🔬 Six AI-Powered Modules

1. **Source Profiling Engine**  
   Builds credibility profiles based on sensor type, resolution, historical accuracy, and metadata completeness

2. **Consistency Engine**  
   Measures spatial agreement using Intersection-over-Union (IoU) and temporal correlation

3. **Anomaly Detection Engine**  
   Watches for calibration drift, data gaps, and statistical outliers using CUSUM and Isolation Forest

4. **Confidence Engine**  
   Runs ensemble models with Monte Carlo Dropout for uncertainty quantification

5. **Trust Score Generator**  
   Combines all metrics into one interpretable 0-100 score using weighted formula

6. **LLM Explanation Engine**  
   Generates plain-language explanations of trust scores

### 📊 Mathematical Rigor

**Trust Score Formula:**
TrustScore = 100 × (α×Consistency + β×Confidence + γ×(1-AnomalyPenalty))

Where:
- **Consistency** = Weighted spatial/temporal agreement across sources
- **Confidence** = Bayesian posterior from ensemble uncertainty
- **Anomaly Penalty** = Normalized severity of detected anomalies
- **α, β, γ** = Configurable weights per domain

---

## 🏗️ Architecture

### System Architecture

<div align="center">
  
```text
┌──────────────────────────────────────────────────────────────────────────────┐
│                         DATA INGESTION LAYER                                │
├──────────────────────────────────────────────────────────────────────────────┤
│  GeoTIFF  │  NetCDF  │  JSON  │  CSV  │  Streaming Sensors                  │
└──────────────────────────────────────────────────────────────────────────────┘
│
▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                          VALIDATION LAYER                                   │
├──────────────────────────────────────────────────────────────────────────────┤
│  Schema Checks  │  Null Detection  │  CRS Verification                      │
└──────────────────────────────────────────────────────────────────────────────┘
│
▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                            AI ENGINE CORE                                   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐            │
│  │ Source          │   │ Consistency     │   │ Anomaly         │            │
│  │ Profiling       │   │ Engine          │   │ Detection       │            │
│  └─────────────────┘   └─────────────────┘   └─────────────────┘            │
│                                                                              │
│  ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐            │
│  │ Confidence      │   │ Trust Score     │   │ LLM             │            │
│  │ Engine          │   │ Generator       │   │ Explanation     │            │
│  └─────────────────┘   └─────────────────┘   └─────────────────┘            │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
│
▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                         PRESENTATION LAYER                                  │
├──────────────────────────────────────────────────────────────────────────────┤
│  REST API  │  Dashboard  │  PostgreSQL + PostGIS                            │
└──────────────────────────────────────────────────────────────────────────────┘
```

</div>

### Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Streamlit, Folium, Plotly |
| **Backend** | Python 3.11+, FastAPI 0.115 |
| **Database** | PostgreSQL 15 + PostGIS 3.3 |
| **AI/ML** | Scikit-learn, NumPy, Pandas |
| **Geospatial** | Shapely, GeoJSON, GeoPandas |
| **Infrastructure** | Docker, Docker Compose |
| **Deployment** | Render, Railway, Streamlit Cloud |

---

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose
- Python 3.11+
- Git

### One-Command Setup

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/geotrust-ai.git
cd geotrust-ai

# Start all services (Database + Backend + Frontend)
docker-compose up -d

# Seed the database with mock data
docker exec -it geotrust-ai-backend-1 python scripts/seed_data.py

# Access the application
echo "Backend API: http://localhost:8000/api/docs"
echo "Frontend Dashboard: http://localhost:8501"
```

📊 Dashboard
Features
Real-Time Trust Metrics: View Trust Score, Consistency, Confidence, and Anomaly Risk
Interactive Map: Visualize multi-source geospatial data with trust heatmaps
Source Reliability: Ranked list of contributing sources with individual scores
AI Explanations: Plain-language breakdowns of trust scores
Temporal Analysis: Track trust score trends over time


Screenshots
<div align="center">

<img width="1590" height="811" alt="image" src="https://github.com/user-attachments/assets/2eaaa864-dd0c-4780-9408-9c3af6803b17" />
Main dashboard showing trust metrics and source reliability

<img width="1599" height="816" alt="image" src="https://github.com/user-attachments/assets/15b5808d-8f64-4414-a58a-30c369b962f1" />
Interactive map with multi-source overlays

<img width="1588" height="812" alt="image" src="https://github.com/user-attachments/assets/8c63a158-9a58-4dba-970b-fe090e7145a9" />
Source Monitor



