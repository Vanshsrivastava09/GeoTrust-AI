from sqlalchemy.orm import Session
from typing import Dict, Any
from ..models import Insight, Observation, Source
from .source_profiler import SourceProfiler
from .consistency_engine import ConsistencyEngine
from .anomaly_detector import AnomalyDetector
from .confidence_engine import ConfidenceEngine
from .trust_scorer import TrustScorer
from .explanation_generator import ExplanationGenerator

class TrustPipeline:
    def __init__(self):
        self.source_profiler = SourceProfiler()
        self.consistency_engine = ConsistencyEngine()
        self.anomaly_detector = AnomalyDetector()
        self.confidence_engine = ConfidenceEngine()
        self.trust_scorer = TrustScorer()
        self.explanation_generator = ExplanationGenerator()
    
    def run(self, db: Session, insight: Insight) -> Dict[str, Any]:
        """Orchestrates the complete trust evaluation pipeline"""
        
        # 1. Fetch relevant observations
        observations = db.query(Observation).filter(
            Observation.data_type == insight.insight_type,
            Observation.timestamp >= insight.time_start,
            Observation.timestamp <= insight.time_end
        ).all()
        
        if not observations:
            return {
                "score": 0.0,
                "consistency": 0.0,
                "confidence": 0.0,
                "anomaly_penalty": 1.0,
                "explanation": "No observations found for the specified parameters."
            }
        
        # 2. Source Profiling
        sources = db.query(Source).all()
        source_credibilities = {}
        for source in sources:
            source_credibilities[source.id] = self.source_profiler.calculate_source_credibility(source)
        
        # 3. Consistency Analysis
        consistency_score = self.consistency_engine.calculate_weighted_consistency(
            observations, source_credibilities
        )
        
        # 4. Anomaly Detection
        anomaly_penalty = self.anomaly_detector.detect_anomalies(observations)
        
        # 5. Confidence Estimation
        unique_sources = len(set(obs.source_id for obs in observations))
        confidence_score = self.confidence_engine.calculate_confidence(observations, unique_sources)
        
        # 6. Trust Score Computation
        score_breakdown = self.trust_scorer.calculate_trust_score(
            consistency_score, confidence_score, anomaly_penalty
        )
        
        # 7. Explanation Generation
        explanation = self.explanation_generator.generate_explanation(
            consistency=score_breakdown["consistency"],
            confidence=score_breakdown["confidence"],
            anomaly_penalty=score_breakdown["anomaly_penalty"],
            source_count=unique_sources,
            observation_count=len(observations)
        )
        
        return {
            "score": score_breakdown["score"],
            "consistency": score_breakdown["consistency"],
            "confidence": score_breakdown["confidence"],
            "anomaly_penalty": score_breakdown["anomaly_penalty"],
            "explanation": explanation
        }