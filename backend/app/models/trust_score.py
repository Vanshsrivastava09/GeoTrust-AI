from sqlalchemy import Column, Integer, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from ..database import Base

class TrustScore(Base):
    __tablename__ = "trust_scores"
    
    id = Column(Integer, primary_key=True, index=True)
    insight_id = Column(Integer, ForeignKey("insights.id"), unique=True, nullable=False)
    score = Column(Float, nullable=False)
    consistency_weighted = Column(Float)
    confidence = Column(Float)
    anomaly_penalty = Column(Float)
    explanation = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    insight = relationship("Insight", back_populates="trust_score")