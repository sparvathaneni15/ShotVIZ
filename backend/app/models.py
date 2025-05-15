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

    
class Action(Base):
    __tablename__ = "actions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    description = Column(Text, nullable=False)


class Role(Base):
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    description = Column(Text, nullable=False)


class Result(Base):
    __tablename__ = "results"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)


class Shot(Base):
    __tablename__ = "shots"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)


class TagActionResult(Base):
    __tablename__ = "tag_action_result"

    id = Column(Integer, primary_key=True, index=True)
    practice_sessions_id = Column(Integer, ForeignKey("practice_sessions.id", ondelete="CASCADE"), nullable=False)
    start_time = Column(Integer, nullable=False)
    end_time = Column(Integer, nullable=False)
    action_id = Column(Integer, ForeignKey("actions.id", ondelete="CASCADE"), nullable=False)
    result_id = Column(Integer, ForeignKey("results.id", ondelete="CASCADE"), nullable=False)
    shot_id = Column(Integer, ForeignKey("shots.id", ondelete="CASCADE"))
    occurred_at = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)


class ShotDetail(Base):
    __tablename__ = "shot_details"

    id = Column(Integer, primary_key=True, index=True)
    tag_id = Column(Integer, ForeignKey("tag_action_result.id", ondelete="CASCADE"), nullable=False)
    player_id = Column(Integer, ForeignKey("players.id", ondelete="CASCADE"), nullable=False)
    distance = Column(Integer, nullable=False)
    made = Column(Boolean, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)


class TagPlayer(Base):
    __tablename__ = "tag_players"

    id = Column(Integer, primary_key=True, index=True)
    tag_id = Column(Integer, ForeignKey("tag_action_result.id", ondelete="CASCADE"))
    role_id = Column(Integer, ForeignKey("roles.id"))
    player_id = Column(Integer, ForeignKey("players.id"))


class Stat(Base):
    __tablename__ = "stats"

    id = Column(Integer, primary_key=True, index=True)
    practice_session_id = Column(Integer, ForeignKey("practice_sessions.id", ondelete="CASCADE"), nullable=False)
    player_id = Column(Integer, ForeignKey("players.id", ondelete="CASCADE"), nullable=False)
    points = Column(Integer, default=0)
    assists = Column(Integer, default=0)
    rebounds = Column(Integer, default=0)
    steals = Column(Integer, default=0)
    turnovers = Column(Integer, default=0)
    blocks = Column(Integer, default=0)
    fouls = Column(Integer, default=0)