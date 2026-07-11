from typing import List
from ..models import Observation

class ConfidenceEngine:
    @staticmethod
    def calculate_confidence(observations: List[Observation], source_count: int) -> float:
        """
        Calculates confidence based on number of sources and observations.
        More sources and observations = higher confidence.
        """
        if len(observations) == 0:
            return 0.0
        
        # Confidence increases with more sources and observations
        source_factor = min(1.0, source_count / 3.0)  # Max confidence at 3+ sources
        observation_factor = min(1.0, len(observations) / 5.0)  # Max at 5+ observations
        
        confidence = 0.6 * source_factor + 0.4 * observation_factor
        return max(0.0, min(1.0, confidence))