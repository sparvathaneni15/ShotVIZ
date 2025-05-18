from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from .. import crud, schemas
from ..database import SessionLocal
from ..dependencies import get_db

router = APIRouter(prefix="/practice_sessions", tags=["practice_sessions"])

@router.get("/", response_model=List[schemas.PracticeSessionBase])
def read_sessions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_practice_sessions(db, skip=skip, limit=limit)

@router.post("/", response_model=schemas.PracticeSessionBase, status_code=201)
def create_session(session: schemas.PracticeSessionCreate, db: Session = Depends(get_db)):
    return crud.create_practice_session(db, session)

@router.get("/{session_id}", response_model=schemas.PracticeSessionRead)
def read_session(session_id: int, db: Session = Depends(get_db)):
    return crud.get_practice_session(db, session_id=session_id)