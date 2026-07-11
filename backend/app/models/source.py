from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from ..database import Base

class Source(Base):
    __tablename__ = "sources"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    sensor_type = Column(String, nullable=False)
    resolution = Column(Float)  # in meters
    credibility_baseline = Column(Float, default=0.5)
    metadata_completeness = Column(Float, default=0.5)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    observations = relationship("Observation", back_populates="source", cascade="all, delete-orphan")
    consistency_results_a = relationship(
        "ConsistencyResult", 
        foreign_keys="ConsistencyResult.source_a_id",
        back_populates="source_a"
    )
    consistency_results_b = relationship(
        "ConsistencyResult", 
        foreign_keys="ConsistencyResult.source_b_id",
        back_populates="source_b"
    )