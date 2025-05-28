from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app import models, schemas, database
from app.dependencies import get_db

router = APIRouter(
    prefix="/stats",
    tags=["stats"]
)

@router.post("/", response_model=schemas.StatBase)
def create_stat(stat: schemas.StatCreate, db: Session = Depends(get_db)):
    db_stat = models.Stat(**stat.dict())
    db.add(db_stat)
    db.commit()
    db.refresh(db_stat)
    return db_stat

@router.get("/", response_model=List[schemas.StatBase])
def get_all_stats(db: Session = Depends(get_db)):
    return db.query(models.Stat).all()

@router.get("/{stat_id}", response_model=schemas.StatBase)
def get_stat(stat_id: int, db: Session = Depends(get_db)):
    stat = db.query(models.Stat).filter(models.Stat.id == stat_id).first()
    if not stat:
        raise HTTPException(status_code=404, detail="Stat not found")
    return stat

@router.put("/{stat_id}", response_model=schemas.StatBase)
def update_stat(stat_id: int, updated_stat: schemas.StatCreate, db: Session = Depends(get_db)):
    stat = db.query(models.Stat).filter(models.Stat.id == stat_id).first()
    if not stat:
        raise HTTPException(status_code=404, detail="Stat not found")
    for key, value in updated_stat.dict().items():
        setattr(stat, key, value)
    db.commit()
    db.refresh(stat)
    return stat

@router.delete("/{stat_id}")
def delete_stat(stat_id: int, db: Session = Depends(get_db)):
    stat = db.query(models.Stat).filter(models.Stat.id == stat_id).first()
    if not stat:
        raise HTTPException(status_code=404, detail="Stat not found")
    db.delete(stat)
    db.commit()
    return {"detail": "Stat deleted successfully"}


# Update a stat by practice_session_id and player_id
@router.put("/{practice_session_id}/{player_id}", response_model=schemas.StatBase)
def update_stat_by_session_and_player(
    practice_session_id: int,
    player_id: int,
    updated_stat: schemas.StatCreate,
    db: Session = Depends(get_db)
):
    stat = db.query(models.Stat).filter(
        models.Stat.practice_session_id == practice_session_id,
        models.Stat.player_id == player_id
    ).first()
    if not stat:
        new_stat = models.Stat(**updated_stat.dict())
        db.add(new_stat)
        db.commit()
        db.refresh(new_stat)
        return new_stat
    for key, value in updated_stat.dict().items():
        setattr(stat, key, value)
    db.commit()
    db.refresh(stat)
    return stat