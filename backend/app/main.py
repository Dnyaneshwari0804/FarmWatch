from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine, Base
from app.api import predict, history

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="FarmWatch AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict.router, tags=["Prediction"])
app.include_router(history.router, tags=["History"])

@app.get("/")
def read_root():
    return {"message": "FarmWatch AI Backend is running successfully"}