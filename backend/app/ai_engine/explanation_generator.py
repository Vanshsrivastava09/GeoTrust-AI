from typing import Dict

class ExplanationGenerator:
    @staticmethod
    def generate_explanation(
        consistency: float,
        confidence: float,
        anomaly_penalty: float,
        source_count: int,
        observation_count: int
    ) -> str:
        """Generates a plain-language explanation of the trust score."""
        
        consistency_pct = consistency * 100
        confidence_pct = confidence * 100
        anomaly_pct = anomaly_penalty * 100
        
        explanation = (
            f"Evaluated {observation_count} observations from {source_count} sources. "
            f"Spatial consistency (IoU) is {consistency_pct:.1f}%. "
            f"Confidence is {confidence_pct:.1f}% based on source overlap and data quality. "
            f"Anomaly penalty applied is {anomaly_pct:.1f}%."
        )
        
        if consistency_pct >= 80:
            explanation += " High agreement between sources indicates reliable data."
        elif consistency_pct >= 50:
            explanation += " Moderate agreement suggests some source disagreement."
        else:
            explanation += " Low agreement indicates significant source conflicts."
        
        return explanation