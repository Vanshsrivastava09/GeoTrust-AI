from ..models import Source

class SourceProfiler:
    @staticmethod
    def calculate_source_credibility(source: Source) -> float:
        """
        Calculates a credibility weight (0.0 to 1.0) for a source.
        Formula: w1*sensor + w2*accuracy + w3*metadata + w4*freshness
        """
        w_sensor = 0.3
        w_accuracy = 0.4
        w_metadata = 0.2
        w_freshness = 0.1
        
        sensor_score = source.credibility_baseline
        accuracy_score = source.credibility_baseline
        metadata_score = source.metadata_completeness
        freshness_score = 1.0 if source.is_active else 0.5
        
        credibility = (
            w_sensor * sensor_score +
            w_accuracy * accuracy_score +
            w_metadata * metadata_score +
            w_freshness * freshness_score
        )
        return max(0.0, min(1.0, credibility))