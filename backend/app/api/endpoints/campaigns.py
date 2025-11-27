from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.models import Campaign, Creative, PerformanceLog, Opportunity
from app import schemas
from typing import List

router = APIRouter()

@router.get("/campaigns", response_model=List[schemas.Campaign])
def get_campaigns(db: Session = Depends(get_db)):
    return db.query(Campaign).all()

@router.get("/opportunities", response_model=List[schemas.Opportunity])
def get_opportunities(db: Session = Depends(get_db)):
    return db.query(Opportunity).all()

@router.get("/creatives", response_model=List[schemas.Creative])
def get_creatives(db: Session = Depends(get_db)):
    return db.query(Creative).all()

@router.get("/performance", response_model=List[schemas.PerformanceLog])
def get_performance(db: Session = Depends(get_db)):
    return db.query(PerformanceLog).order_by(PerformanceLog.timestamp.desc()).limit(100).all()
