from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app import crud, schemas
from app.dependencies import get_db

router = APIRouter(prefix="/players", tags=["players"])

@router.post("/", response_model=schemas.PlayerBase, status_code=201)
def create_player(player: schemas.PlayerCreate, db: Session = Depends(get_db)):
    return crud.create_player(db, player)

@router.get("/", response_model=List[schemas.PlayerBase])
def read_players(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_players(db, skip=skip, limit=limit)

@router.get("/{player_id}", response_model=schemas.PlayerBase)
def read_player(player_id: int, db: Session = Depends(get_db)):
    db_player = crud.get_player(db, id=player_id)
    if not db_player:
        raise HTTPException(status_code=404, detail="Player not found")
    return db_player
