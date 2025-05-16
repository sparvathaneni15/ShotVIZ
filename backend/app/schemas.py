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
class RoleBase(BaseModel):
    name: str
    description: Optional[str]

class RoleTypeCreate(RoleBase):
    pass

class RoleTypeRead(RoleBase):
    id: int

    class Config:
        orm_mode = True


# --- Action Name Schemas ---
class ActionBase(BaseModel):
    name: str

class ActionNameCreate(ActionBase):
    pass

class ActionNameRead(ActionBase):
    id: int

    class Config:
        orm_mode = True


# --- Result Name Schemas ---
class ResultBase(BaseModel):
    name: str

class ResultNameCreate(ResultBase):
    pass

class ResultNameRead(ResultBase):
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

# --- Tag Action Result Schemas ---
class TagActionResultBase(BaseModel):
    practice_sessions_id: int
    start_time: float
    end_time: float
    action_id: int
    result_id: int
    shot_id: Optional[int]
    occurred_at: datetime

class TagActionResultCreate(TagActionResultBase):
    pass

class TagActionResultRead(TagActionResultBase):
    id: int
    created_at: datetime

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
    turnovers: int
    blocks: int
    fouls: int

class StatCreate(StatBase):
    pass

class StatRead(StatBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True