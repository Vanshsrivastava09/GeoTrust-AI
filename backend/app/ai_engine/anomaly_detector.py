from typing import List
from ..models import Observation

class AnomalyDetector:
    @staticmethod
    def detect_anomalies(observations: List[Observation]) -> float:
        """
        Simple anomaly detection based on observation count and diversity.
        In production, this would use CUSUM, Isolation Forest, etc.
        """
        if len(observations) == 0:
            return 1.0  # High penalty for no data
        
        # Simple heuristic: more observations = lower anomaly penalty
        # This is a placeholder for actual ML-based detection
        penalty = max(0.0, 1.0 - (len(observations) / 10.0))
        return min(1.0, penalty)