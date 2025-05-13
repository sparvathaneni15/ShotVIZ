from sqlalchemy import Column, Integer, String, Text, DateTime, Date, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.database import Base
import datetime


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False, index=True)
    name = Column(String, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Player(Base):
    __tablename__ = "players"

    id = Column(Integer, primary_key=True, index=True)
    jersey_no = Column(Integer)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    position = Column(String)
    shooting_hand = Column(String)
    year = Column(String)
    height = Column(String)
    weight = Column(String)


class PracticeSession(Base):
    __tablename__ = "practice_sessions"

    id = Column(Integer, primary_key=True, index=True)
    uploaded_by = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    session_date = Column(Date, nullable=False)
    video_url = Column(String, nullable=False)
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class ActionTypes(Base):
    __tablename__ = "action_types"

    id = Column(Integer, primary_key=True, index=True)
    action_name_id = Column(Integer, ForeignKey("action_name.id", ondelete="CASCADE"), nullable=False)
    role_type_id = Column(Integer, ForeignKey("role_types.id", ondelete="CASCADE"), nullable=False)
    player_id = Column(Integer, ForeignKey("players.id", ondelete="CASCADE"), nullable=False)


class ActionName(Base):
    __tablename__ = "action_name"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)


class RoleType(Base):
    __tablename__ = "role_types"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    description = Column(Text)

class ResultTypes(Base):
    __tablename__ = "result_types"

    id = Column(Integer, primary_key=True, index=True)
    result_name_id = Column(Integer, ForeignKey("result_name.id", ondelete="CASCADE"), nullable=False)
    player_id = Column(Integer, ForeignKey("players.id", ondelete="CASCADE"), nullable=False)

class ResultName(Base):
    __tablename__ = "result_name"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)

class ShotDetails(Base):
    __tablename__ = "shot_details"

    id = Column(Integer, primary_key=True, index=True)
    shot_name_id = Column(Integer, ForeignKey("shot_names.id", ondelete="CASCADE"), nullable=False)
    x_coordinate = Column(Integer, nullable=False)
    y_coordinate = Column(Integer, nullable=False)
    made = Column(Boolean, nullable=False)

class ShotName(Base):
    __tablename__ = "shot_names"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)

class TagInstances(Base):
    __tablename__ = "tag_instances"

    id = Column(Integer, primary_key=True, index=True)
    practice_session_id = Column(Integer, ForeignKey("practice_sessions.id", ondelete="CASCADE"), nullable=False)
    start_time = Column(Integer, nullable=False)
    end_time = Column(Integer, nullable=False)
    action_type_id = Column(Integer, ForeignKey("action_types.id", ondelete="CASCADE"), nullable=False)
    result_type_id = Column(Integer, ForeignKey("result_types.id", ondelete="CASCADE"), nullable=False)
    occurred_at = Column(DateTime, default=datetime.datetime.utcnow)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class ShotAttempt(Base):
    __tablename__ = "shot_attempts"

    id = Column(Integer, primary_key=True, index=True)
    result_type_id = Column(Integer, ForeignKey("result_types.id", ondelete="CASCADE"), nullable=False)
    player_id = Column(Integer, ForeignKey("players.id", ondelete="CASCADE"), nullable=False)
    shot_details_id = Column(Integer, ForeignKey("shot_details.id", ondelete="CASCADE"), nullable=False)