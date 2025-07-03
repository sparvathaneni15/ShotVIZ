from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app import crud, schemas
from app.dependencies import get_db

router = APIRouter(prefix="/stats", tags=["stats"])

# Used for Analytics Dashboard
@router.get("/dashboard", response_model=List[schemas.StatBase])
def get_all_stats(db: Session = Depends(get_db)):
    stats = crud.get_all_stats(db=db)
    if not stats:
        raise HTTPException(status_code=404, detail="No stats found")
    return stats

@router.get("/{practice_session_id}/{player_id}", response_model=List[schemas.StatBase])
def get_stat(practice_session_id: int, player_id: int, db: Session = Depends(get_db)):
    stat = crud.get_stat(db=db, practice_session_id=practice_session_id, player_id=player_id)
    if not stat:
        raise HTTPException(status_code=404, detail="Stat not found")
    return stat


@router.put("/{practice_session_id}/{player_id}", response_model=schemas.StatBase)
def update_stat(practice_session_id: int, player_id: int, stat: schemas.StatCreate, db: Session = Depends(get_db)):
    return crud.create_stat(db=db, stat=stat, practice_session_id=practice_session_id, player_id=player_id)
