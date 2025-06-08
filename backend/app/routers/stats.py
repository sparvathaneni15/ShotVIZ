from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app import models, schemas, database
from app.dependencies import get_db

router = APIRouter(
    prefix="/stats",
    tags=["stats"]
)

# Used for Analytics Dashboard
@router.get("/dashboard", response_model=List[schemas.StatBase])
def get_all_stats(db: Session = Depends(get_db)):
    return db.query(models.Stat).all()

