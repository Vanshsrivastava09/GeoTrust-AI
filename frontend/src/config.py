import os

class Config:
    API_BASE_URL = os.getenv("API_BASE_URL", "http://127.0.0.1:8000")
    APP_TITLE = "GeoTrust AI - Trust Evaluation Platform"
    APP_ICON = "🌍"
    
    # Trust Score Thresholds
    HIGH_TRUST_THRESHOLD = 75
    MEDIUM_TRUST_THRESHOLD = 50
    
    # Map Settings
    DEFAULT_MAP_CENTER = [0.75, 0.75]
    DEFAULT_ZOOM = 9
    
    # Colors
    TRUST_COLORS = {
        "high": "#22c55e",
        "medium": "#f97316",
        "low": "#ef4444"
    }