from pydantic import BaseModel, EmailStr # type: ignore
from datetime import date, datetime
from typing import List, Optional

# --- Practice Session Schemas ---
class PracticeSessionBase(BaseModel):
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

    class Config:
        orm_mode = True

# --- Shot Name Schemas ---
class ShotBase(BaseModel):
    name: str

class ShotNameCreate(ShotBase):
    pass

class ShotNameRead(ShotBase):
    id: int

    class Config:
        orm_mode = True


# --- Stat Schemas ---
class StatBase(BaseModel):
    practice_session_id: int
    player_id: int
    points: int
    assists: int
    rebounds: int
    steals: int
    blocks: int
    turnovers: int
    fouls: int

class StatCreate(StatBase):
    pass

class StatRead(StatBase):
    id: int

    class Config:
        orm_mode = True
