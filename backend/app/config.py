from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    # App Settings
    PROJECT_NAME: str = "GeoTrust AI"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    DEBUG: bool = False
    
    # Database
    DATABASE_URL: str = "postgresql://user:password@localhost:5432/geotrust"
    
    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = ["*"]
    
    # AI Engine Weights
    CONSISTENCY_WEIGHT: float = 0.4
    CONFIDENCE_WEIGHT: float = 0.4
    ANOMALY_WEIGHT: float = 0.2
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = 60
    
    # Trust Score Thresholds
    HIGH_TRUST_THRESHOLD: float = 75.0
    MEDIUM_TRUST_THRESHOLD: float = 50.0
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()