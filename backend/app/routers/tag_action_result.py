from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app import crud, schemas
from app.dependencies import get_db

router = APIRouter(prefix="/tag_action_result", tags=["tag_action_result"])

@router.post("/", response_model=schemas.TagActionResultBase, status_code=201)
def crete_tag_action_result(tag_action_result: schemas.TagActionResultCreate, db: Session = Depends(get_db)):
    return crud.create_tag_action_result(db, tag_action_result)

@router.get("/all", response_model=List[schemas.TagActionResultBase])
def read_tag_action_results(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_tag_action_results(db, skip=skip, limit=limit)

@router.get("/{tag_action_result_id}", response_model=schemas.TagActionResultBase)
def read_tag_action_result(tag_action_result_id: int, db: Session = Depends(get_db)):
    db_role = crud.get_tag_action_result(db, id=tag_action_result_id)
    if not db_role:
        raise HTTPException(status_code=404, detail="Tag Action type not found")
    return db_role