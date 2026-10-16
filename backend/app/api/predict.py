from fastapi import APIRouter, File, UploadFile, Depends, Form
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.prediction import PredictionRecord
from app.services.ml_service import predict_image, get_treatment

router = APIRouter()

@router.post("/predict/")
async def predict_crop_stress(
    file: UploadFile = File(...), 
    field_name: str = Form("Field 1"), 
    db: Session = Depends(get_db)
):
    image_bytes = await file.read()
    result = predict_image(image_bytes)
    
    # Save to DB
    db_record = PredictionRecord(
        field_name=field_name, 
        prediction=result["prediction"], 
        confidence=result["confidence"]
    )
    db.add(db_record)
    db.commit()
    db.refresh(db_record)

    return {
        "id": db_record.id,
        "field_name": field_name,
        "prediction": result["prediction"],
        "confidence": result["confidence"],
        "gradcam_base64": result["gradcam_base64"]
    }