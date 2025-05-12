from sqlalchemy.orm import Session
import backend.app.models as models, backend.app.schemas as schemas
import datetime

# --- User CRUD ---
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    # NOTE: replace this with real password hashing!
    db_user = models.User(
        email=user.email,
        name=user.name,
        password_hash=user.password  # TODO: hash password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


# --- Player CRUD ---
def get_player(db: Session, player_id: int):
    return db.query(models.Player).filter(models.Player.id == player_id).first()


def get_players(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Player).offset(skip).limit(limit).all()


def create_player(db: Session, player: schemas.PlayerCreate):
    db_player = models.Player(**player.dict())
    db.add(db_player)
    db.commit()
    db.refresh(db_player)
    return db_player


# --- Practice Session CRUD ---
def get_practice_session(db: Session, session_id: int):
    return db.query(models.PracticeSession).filter(models.PracticeSession.id == session_id).first()


def get_practice_sessions(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.PracticeSession).offset(skip).limit(limit).all()


def create_practice_session(db: Session, session: schemas.PracticeSessionCreate):
    db_session = models.PracticeSession(**session.dict())
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    return db_session


# --- RoleType CRUD ---
def get_role_type(db: Session, role_id: int):
    return db.query(models.RoleType).filter(models.RoleType.id == role_id).first()


def get_role_types(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.RoleType).offset(skip).limit(limit).all()


def create_role_type(db: Session, role: schemas.RoleTypeCreate):
    db_role = models.RoleType(**role.dict())
    db.add(db_role)
    db.commit()
    db.refresh(db_role)
    return db_role


# --- ActionName CRUD ---
def get_action_name(db: Session, action_id: int):
    return db.query(models.ActionName).filter(models.ActionName.id == action_id).first()


def get_action_names(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.ActionName).offset(skip).limit(limit).all()


def create_action_name(db: Session, action: schemas.ActionNameCreate):
    db_action = models.ActionName(**action.dict())
    db.add(db_action)
    db.commit()
    db.refresh(db_action)
    return db_action


# --- ResultName CRUD ---
def get_result_name(db: Session, result_id: int):
    return db.query(models.ResultName).filter(models.ResultName.id == result_id).first()


def get_result_names(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.ResultName).offset(skip).limit(limit).all()


def create_result_name(db: Session, result: schemas.ResultNameCreate):
    db_result = models.ResultName(**result.dict())
    db.add(db_result)
    db.commit()
    db.refresh(db_result)
    return db_result


# --- ShotName CRUD ---
def get_shot_name(db: Session, shot_id: int):
    return db.query(models.ShotName).filter(models.ShotName.id == shot_id).first()


def get_shot_names(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.ShotName).offset(skip).limit(limit).all()


def create_shot_name(db: Session, shot: schemas.ShotNameCreate):
    db_shot = models.ShotName(**shot.dict())
    db.add(db_shot)
    db.commit()
    db.refresh(db_shot)
    return db_shot
