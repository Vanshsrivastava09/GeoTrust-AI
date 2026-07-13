# backend/app/ai_engine/trust_scorer.py
from typing import Dict  # <-- ADD THIS LINE
from ..config import settings

class TrustScorer:
    @staticmethod
    def calculate_trust_score(
        consistency: float,
        confidence: float,
        anomaly_penalty: float
    ) -> Dict[str, float]:
        """
        Applies the mathematical model to generate the final Trust Score (0-100).
        TrustScore = 100 * (α*C + β*Conf + γ*(1 - AnomalyPenalty))
        """
        alpha = settings.CONSISTENCY_WEIGHT
        beta = settings.CONFIDENCE_WEIGHT
        gamma = settings.ANOMALY_WEIGHT
        
        c = max(0.0, min(1.0, consistency))
        conf = max(0.0, min(1.0, confidence))
        penalty = max(0.0, min(1.0, anomaly_penalty))
        
        raw_score = 100 * (alpha * c + beta * conf + gamma * (1 - penalty))
        final_score = max(0.0, min(100.0, raw_score))
        
        return {
            "score": round(final_score, 2),
            "consistency": round(c, 3),
            "confidence": round(conf, 3),
            "anomaly_penalty": round(penalty, 3)
        }
