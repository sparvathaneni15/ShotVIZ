from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app import crud, schemas
from app.dependencies import get_db

router = APIRouter(prefix="/shot_names", tags=["shot_names"])

@router.post("/", response_model=schemas.ShotNameBase, status_code=201)
def create_shot_name(shot: schemas.ShotNameCreate, db: Session = Depends(get_db)):
    return crud.create_shot_name(db, shot)

@router.get("/", response_model=List[schemas.ShotNameBase])
def read_shot_names(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_shot_names(db, skip=skip, limit=limit)

@router.get("/{shot_id}", response_model=schemas.ShotNameBase)
def read_shot_name(shot_id: int, db: Session = Depends(get_db)):
    db_shot = crud.get_shot_name(db, id=shot_id)
    if not db_shot:
        raise HTTPException(status_code=404, detail="Shot not found")
    return db_shot
