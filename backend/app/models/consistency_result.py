from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base

class ConsistencyResult(Base):
    __tablename__ = "consistency_results"
    
    id = Column(Integer, primary_key=True, index=True)
    insight_id = Column(Integer, ForeignKey("insights.id"), nullable=False)
    source_a_id = Column(Integer, ForeignKey("sources.id"), nullable=False)
    source_b_id = Column(Integer, ForeignKey("sources.id"), nullable=False)
    observation_a_id = Column(Integer, ForeignKey("observations.id"))
    observation_b_id = Column(Integer, ForeignKey("observations.id"))
    spatial_similarity = Column(Float)
    temporal_similarity = Column(Float)
    combined_score = Column(Float)
    
    # Relationships
    insight = relationship("Insight", back_populates="consistency_results")
    source_a = relationship("Source", foreign_keys=[source_a_id], back_populates="consistency_results_a")
    source_b = relationship("Source", foreign_keys=[source_b_id], back_populates="consistency_results_b")
    observation_a = relationship("Observation", foreign_keys=[observation_a_id], back_populates="consistency_results_a")
    observation_b = relationship("Observation", foreign_keys=[observation_b_id], back_populates="consistency_results_b")