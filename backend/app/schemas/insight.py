from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Dict, Any
from .trust_score import TrustScoreResponse

class InsightBase(BaseModel):
    region: Dict[str, Any]
    time_start: datetime
    time_end: datetime
    insight_type: str

class InsightCreate(InsightBase):
    pass

class InsightResponse(InsightBase):
    id: int
    created_at: datetime
    updated_at: datetime
    trust_score: Optional[TrustScoreResponse] = None
    
    class Config:
        from_attributes = True