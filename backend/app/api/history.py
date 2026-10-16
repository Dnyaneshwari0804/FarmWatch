from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.prediction import PredictionRecord

router = APIRouter()

@router.get("/history/")
def get_history(db: Session = Depends(get_db)):
    return db.query(PredictionRecord).order_by(PredictionRecord.id.desc()).limit(10).all()

@router.get("/stats/")
def get_stats(db: Session = Depends(get_db)):
    total = db.query(PredictionRecord).count()
    healthy = db.query(PredictionRecord).filter(PredictionRecord.prediction.contains("Healthy")).count()
    diseased = total - healthy
    return {"total": total, "healthy": healthy, "diseased": diseased}