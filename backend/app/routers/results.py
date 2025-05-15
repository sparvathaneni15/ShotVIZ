from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app import crud, schemas
from app.dependencies import get_db

router = APIRouter(prefix="/results", tags=["results"])

@router.post("/", response_model=schemas.ResultBase, status_code=201)
def create_result_name(result: schemas.ResultNameCreate, db: Session = Depends(get_db)):
    return crud.create_result_name(db, result)

@router.get("/", response_model=List[schemas.ResultBase])
def read_result_names(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_result_names(db, skip=skip, limit=limit)

@router.get("/{result_id}", response_model=schemas.ResultBase)
def read_result_name(result_id: int, db: Session = Depends(get_db)):
    db_result = crud.get_result_name(db, id=result_id)
    if not db_result:
        raise HTTPException(status_code=404, detail="Result not found")
    return db_result
