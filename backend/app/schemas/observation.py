from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Dict, Any

class ObservationBase(BaseModel):
    source_id: int
    timestamp: datetime
    data_type: str
    spatial_extent: Dict[str, Any]
    observation_metadata: Optional[Dict[str, Any]] = None

class ObservationCreate(ObservationBase):
    pass

class ObservationResponse(ObservationBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True