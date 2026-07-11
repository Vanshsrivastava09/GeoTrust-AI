from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ....api.deps import get_db
from ....schemas import TrustScoreResponse
from ....models import TrustScore, Insight

router = APIRouter()

@router.get("/{insight_id}/trust-score", response_model=TrustScoreResponse)
def get_trust_score(insight_id: int, db: Session = Depends(get_db)):
    insight = db.query(Insight).filter(Insight.id == insight_id).first()
    if not insight:
        raise HTTPException(status_code=404, detail="Insight not found")
    
    trust_score = db.query(TrustScore).filter(TrustScore.insight_id == insight_id).first()
    if not trust_score:
        raise HTTPException(status_code=404, detail="Trust score not yet computed")
    
    return trust_score