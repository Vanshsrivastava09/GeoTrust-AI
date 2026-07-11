from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship
from datetime import datetime
from ..database import Base

class Observation(Base):
    __tablename__ = "observations"
    
    id = Column(Integer, primary_key=True, index=True)
    source_id = Column(Integer, ForeignKey("sources.id"), nullable=False)
    timestamp = Column(DateTime, nullable=False)
    data_type = Column(String, nullable=False)
    
    # Spatial data stored as GeoJSON
    spatial_extent = Column(JSONB)
    
    # Additional metadata
    observation_metadata = Column("metadata", JSONB)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    source = relationship("Source", back_populates="observations")
    consistency_results_a = relationship(
        "ConsistencyResult",
        foreign_keys="ConsistencyResult.observation_a_id",
        back_populates="observation_a"
    )
    consistency_results_b = relationship(
        "ConsistencyResult",
        foreign_keys="ConsistencyResult.observation_b_id",
        back_populates="observation_b"
    )