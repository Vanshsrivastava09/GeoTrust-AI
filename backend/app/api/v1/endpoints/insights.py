from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import json
from ....api.deps import get_db
from ....schemas import InsightCreate, InsightResponse
from ....models import Insight, Observation
from ....services.trust_service import TrustService

router = APIRouter()

@router.post("/", response_model=InsightResponse)
def create_insight(insight: InsightCreate, db: Session = Depends(get_db)):
    db_insight = Insight(**insight.model_dump())
    db.add(db_insight)
    db.commit()
    db.refresh(db_insight)
    
    # Run trust evaluation pipeline
    trust_service = TrustService(db)
    trust_service.evaluate_insight(db_insight)
    
    db.refresh(db_insight)
    return db_insight

@router.get("/", response_model=List[InsightResponse])
def read_insights(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(Insight).offset(skip).limit(limit).all()

@router.get("/{insight_id}", response_model=InsightResponse)
def read_insight(insight_id: int, db: Session = Depends(get_db)):
    insight = db.query(Insight).filter(Insight.id == insight_id).first()
    if not insight:
        raise HTTPException(status_code=404, detail="Insight not found")
    return insight

@router.get("/{insight_id}/observations", response_model=List[dict])
def get_observations_for_insight(insight_id: int, db: Session = Depends(get_db)):
    insight = db.query(Insight).filter(Insight.id == insight_id).first()
    if not insight:
        raise HTTPException(status_code=404, detail="Insight not found")
    
    observations = db.query(Observation).filter(
        Observation.data_type == insight.insight_type,
        Observation.timestamp >= insight.time_start,
        Observation.timestamp <= insight.time_end
    ).all()
    
    result = []
    for obs in observations:
        result.append({
            "id": obs.id,
            "source_id": obs.source_id,
            "timestamp": obs.timestamp,
            "data_type": obs.data_type,
            "spatial_extent": obs.spatial_extent
        })
    return result