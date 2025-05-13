from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app import crud, schemas
from app.dependencies import get_db

router = APIRouter(prefix="/action_names", tags=["action_names"])

@router.post("/", response_model=schemas.ActionNameBase, status_code=201)
def create_action_name(action: schemas.ActionNameCreate, db: Session = Depends(get_db)):
    return crud.create_action_name(db, action)

@router.get("/", response_model=List[schemas.ActionNameBase])
def read_action_names(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_action_names(db, skip=skip, limit=limit)

@router.get("/{action_id}", response_model=schemas.ActionNameBase)
def read_action_name(action_id: int, db: Session = Depends(get_db)):
    db_action = crud.get_action_name(db, id=action_id)
    if not db_action:
        raise HTTPException(status_code=404, detail="Action not found")
    return db_action
