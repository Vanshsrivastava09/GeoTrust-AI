from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class SourceBase(BaseModel):
    name: str
    sensor_type: str
    resolution: Optional[float] = None
    credibility_baseline: float = Field(default=0.5, ge=0.0, le=1.0)
    metadata_completeness: float = Field(default=0.5, ge=0.0, le=1.0)
    is_active: bool = True

class SourceCreate(SourceBase):
    pass

class SourceUpdate(BaseModel):
    name: Optional[str] = None
    sensor_type: Optional[str] = None
    resolution: Optional[float] = None
    credibility_baseline: Optional[float] = Field(default=None, ge=0.0, le=1.0)
    metadata_completeness: Optional[float] = Field(default=None, ge=0.0, le=1.0)
    is_active: Optional[bool] = None

class SourceResponse(SourceBase):
    id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True