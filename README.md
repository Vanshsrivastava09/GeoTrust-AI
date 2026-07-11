# GeoTrust AI 

**Trust Evaluation Framework for Multi-Source Geospatial Insights**

[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green.svg)](https://fastapi.tiangolo.com)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 📋 Table of Contents
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Deployment](#deployment)
- [Team](#team)

## 🎯 Problem Statement

Geospatial insights from multiple sources (satellites, IoT sensors, crowd-sourced data) are presented with unwarranted confidence. Decision-makers in disaster management, agriculture, and urban planning have no way to distinguish well-corroborated insights from fragile ones.

## 💡 Solution

GeoTrust AI is a **trust layer** that sits between raw geospatial data and decision systems, providing:
- ✅ **Quantified Trust Scores** (0-100) for every insight
- ✅ **Cross-source consistency checks** using spatial IoU and temporal correlation
- ✅ **Anomaly detection** for sensor drift and data degradation
- ✅ **Explainable AI** with plain-language rationales
- ✅ **REST API** for seamless integration

## 🏗️ Architecture
┌─────────────────┐ ┌──────────────────┐ ┌─────────────────┐
│ Data Sources │────▶│ GeoTrust AI │────▶│ Decision Makers│
│ (Satellites, │ │ Trust Engine │ │ (Dashboards, │
│ IoT, Crowd) │ │ │ │ GIS Systems) │
└─────────────────┘ └──────────────────┘ └─────────────────┘

**Core Modules:**
1. **Source Profiling** - Credibility scoring per source
2. **Consistency Engine** - Spatial/Temporal agreement (IoU, correlation)
3. **Anomaly Detection** - Drift detection via CUSUM & Isolation Forest
4. **Confidence Engine** - Bayesian uncertainty quantification
5. **Trust Scorer** - Weighted combination (α·C + β·Conf + γ·(1-Anomaly))
6. **Explanation Generator** - LLM-based natural language reports

## 🚀 Quick Start

### Using Docker (Recommended)
```bash
# Clone repository
git clone https://github.com/your-org/geotrust-ai.git
cd geotrust-ai

# Start all services
docker-compose up -d

# Access services
# Backend: http://localhost:8000/api/docs
# Frontend: http://localhost:8501