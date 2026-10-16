from sqlalchemy import Column, Integer, String, Float
from app.core.database import Base

class PredictionRecord(Base):
    __tablename__ = "predictions"
    id = Column(Integer, primary_key=True, index=True)
    field_name = Column(String, default="Field 1")
    prediction = Column(String, index=True)
    confidence = Column(Float)