from pydantic import BaseModel, EmailStr
from datetime import date, datetime
from typing import List, Optional

# --- Practice Session Schemas ---
class PracticeSessionBase(BaseModel):
    id: int
    session_date: date
    video_url: str
    notes: Optional[str]

class PracticeSessionCreate(PracticeSessionBase):
    uploaded_by: int

class PracticeSessionRead(PracticeSessionBase):
    id: int
    uploaded_by: int

    class Config:
        orm_mode = True


# --- User Schemas ---
class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: int
    created_at: datetime
    practice_sessions: List[PracticeSessionRead] = []

    class Config:
        orm_mode = True


# --- Player Schemas ---
class PlayerBase(BaseModel):
    jersey_no: Optional[int]
    first_name: str
    last_name: str
    position: Optional[str]
    shooting_hand: Optional[str]
    year: Optional[str]

class PlayerCreate(PlayerBase):
    pass

class PlayerRead(PlayerBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True


# --- Role Type Schemas ---
class RoleTypeBase(BaseModel):
    name: str
    description: Optional[str]

class RoleTypeCreate(RoleTypeBase):
    pass

class RoleTypeRead(RoleTypeBase):
    id: int

    class Config:
        orm_mode = True


# --- Action Name Schemas ---
class ActionNameBase(BaseModel):
    name: str

class ActionNameCreate(ActionNameBase):
    pass

class ActionNameRead(ActionNameBase):
    id: int

    class Config:
        orm_mode = True


# --- Result Name Schemas ---
class ResultNameBase(BaseModel):
    name: str

class ResultNameCreate(ResultNameBase):
    pass

class ResultNameRead(ResultNameBase):
    id: int

    class Config:
        orm_mode = True


# --- Shot Name Schemas ---
class ShotNameBase(BaseModel):
    name: str

class ShotNameCreate(ShotNameBase):
    pass

class ShotNameRead(ShotNameBase):
    id: int

    class Config:
        orm_mode = True
