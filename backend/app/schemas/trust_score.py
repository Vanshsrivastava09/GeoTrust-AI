from pydantic import BaseModel
from datetime import datetime

class TrustScoreBase(BaseModel):
    score: float
    consistency_weighted: float
    confidence: float
    anomaly_penalty: float
    explanation: str

class TrustScoreCreate(TrustScoreBase):
    insight_id: int

class TrustScoreResponse(TrustScoreBase):
    id: int
    insight_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True