from pydantic import BaseModel

class ConsistencyResultResponse(BaseModel):
    id: int
    insight_id: int
    source_a_id: int
    source_b_id: int
    spatial_similarity: float
    temporal_similarity: float
    combined_score: float
    
    class Config:
        from_attributes = True