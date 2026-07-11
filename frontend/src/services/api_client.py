import requests
from typing import Dict, Any, Optional
from ..config import Config

class APIClient:
    def __init__(self, base_url: str = None):
        self.base_url = base_url or Config.API_BASE_URL
    
    def submit_insight(
        self,
        region: Dict[str, Any],
        time_start: str,
        time_end: str,
        insight_type: str
    ) -> Dict[str, Any]:
        """Submit an insight for trust evaluation"""
        payload = {
            "region": region,
            "time_start": time_start,
            "time_end": time_end,
            "insight_type": insight_type
        }
        
        response = requests.post(
            f"{self.base_url}/api/v1/insights",
            json=payload
        )
        response.raise_for_status()
        return response.json()
    
    def get_trust_score(self, insight_id: int) -> Dict[str, Any]:
        """Get trust score for an insight"""
        response = requests.get(
            f"{self.base_url}/api/v1/trust/{insight_id}/trust-score"
        )
        response.raise_for_status()
        return response.json()
    
    def get_observations(self, insight_id: int) -> list:
        """Get observations for an insight"""
        response = requests.get(
            f"{self.base_url}/api/v1/insights/{insight_id}/observations"
        )
        response.raise_for_status()
        return response.json()
    
    def get_sources(self) -> list:
        """Get all sources"""
        response = requests.get(f"{self.base_url}/api/v1/sources")
        response.raise_for_status()
        return response.json()