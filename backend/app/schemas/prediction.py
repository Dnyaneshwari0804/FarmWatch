from pydantic import BaseModel

class PredictionResponse(BaseModel):
    id: int
    field_name: str
    prediction: str
    confidence: float
    gradcam_base64: str

    class Config:
        from_attributes = True