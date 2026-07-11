import json
from shapely.geometry import shape
from typing import List, Dict
from ..models import Observation

class ConsistencyEngine:
    @staticmethod
    def calculate_spatial_iou(geom_a: Dict, geom_b: Dict) -> float:
        """Calculates Intersection over Union (IoU) for two GeoJSON geometries."""
        try:
            shape_a = shape(geom_a)
            shape_b = shape(geom_b)
            
            if not shape_a.is_valid or not shape_b.is_valid:
                return 0.0
            
            intersection = shape_a.intersection(shape_b).area
            union = shape_a.union(shape_b).area
            
            if union == 0:
                return 0.0
            
            return intersection / union
        except Exception:
            return 0.0
    
    @staticmethod
    def calculate_weighted_consistency(
        observations: List[Observation], 
        source_credibilities: Dict[int, float]
    ) -> float:
        """
        Calculates the weighted average consistency score across all overlapping observation pairs.
        C = (Σ wᵢ · s) / (Σ wᵢ)
        """
        if len(observations) < 2:
            return 1.0
        
        numerator = 0.0
        denominator = 0.0
        
        for i in range(len(observations)):
            for j in range(i + 1, len(observations)):
                obs_a = observations[i]
                obs_b = observations[j]
                
                spatial_sim = ConsistencyEngine.calculate_spatial_iou(
                    obs_a.spatial_extent, 
                    obs_b.spatial_extent
                )
                
                w_a = source_credibilities.get(obs_a.source_id, 0.5)
                w_b = source_credibilities.get(obs_b.source_id, 0.5)
                pair_weight = (w_a + w_b) / 2.0
                
                numerator += pair_weight * spatial_sim
                denominator += pair_weight
        
        return numerator / denominator if denominator > 0 else 0.0