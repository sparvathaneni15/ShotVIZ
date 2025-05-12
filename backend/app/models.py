from sqlalchemy import Column, Integer, String, Text, DateTime, Date, ForeignKey
from sqlalchemy.orm import relationship
from backend.app.database import Base
import datetime


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False, index=True)
    name = Column(String, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    practice_sessions = relationship("PracticeSession", back_populates="user")


class Player(Base):
    __tablename__ = "players"

    id = Column(Integer, primary_key=True, index=True)
    jersey_no = Column(Integer)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    position = Column(String)
    shooting_hand = Column(String)
    year = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)


class PracticeSession(Base):
    __tablename__ = "practice_sessions"

    id = Column(Integer, primary_key=True, index=True)
    uploaded_by = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    session_date = Column(Date, nullable=False)
    video_url = Column(String, nullable=False)

    user = relationship("User", back_populates="practice_sessions")


class RoleType(Base):
    __tablename__ = "role_types"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    description = Column(Text)


class ActionName(Base):
    __tablename__ = "action_name"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)


class ResultName(Base):
    __tablename__ = "result_name"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)


class ShotName(Base):
    __tablename__ = "shot_names"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
