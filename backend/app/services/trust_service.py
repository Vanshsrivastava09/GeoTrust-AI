from sqlalchemy.orm import Session
from typing import Dict, Any
from ..ai_engine.pipeline import TrustPipeline
from ..models import Insight, TrustScore

class TrustService:
    def __init__(self, db: Session):
        self.db = db
        self.pipeline = TrustPipeline()
    
    def evaluate_insight(self, insight: Insight) -> TrustScore:
        """Run the complete trust evaluation pipeline for an insight"""
        evaluation_result = self.pipeline.run(self.db, insight)
        
        # Check if trust score already exists
        existing_score = self.db.query(TrustScore).filter(
            TrustScore.insight_id == insight.id
        ).first()
        
        if existing_score:
            # Update existing
            existing_score.score = evaluation_result["score"]
            existing_score.consistency_weighted = evaluation_result["consistency"]
            existing_score.confidence = evaluation_result["confidence"]
            existing_score.anomaly_penalty = evaluation_result["anomaly_penalty"]
            existing_score.explanation = evaluation_result["explanation"]
            trust_score = existing_score
        else:
            # Create new
            trust_score = TrustScore(
                insight_id=insight.id,
                score=evaluation_result["score"],
                consistency_weighted=evaluation_result["consistency"],
                confidence=evaluation_result["confidence"],
                anomaly_penalty=evaluation_result["anomaly_penalty"],
                explanation=evaluation_result["explanation"]
            )
            self.db.add(trust_score)
        
        self.db.commit()
        self.db.refresh(trust_score)
        return trust_score