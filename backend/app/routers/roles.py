from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app import crud, schemas
from app.dependencies import get_db

router = APIRouter(prefix="/roles", tags=["roles"])

@router.post("/", response_model=schemas.RoleBase, status_code=201)
def create_role_type(role: schemas.RoleTypeCreate, db: Session = Depends(get_db)):
    return crud.create_role_type(db, role)

@router.get("/", response_model=List[schemas.RoleBase])
def read_role_types(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_role_types(db, skip=skip, limit=limit)

@router.get("/{role_id}", response_model=schemas.RoleBase)
def read_role_type(role_id: int, db: Session = Depends(get_db)):
    db_role = crud.get_role_type(db, id=role_id)
    if not db_role:
        raise HTTPException(status_code=404, detail="Role type not found")
    return db_role
