from sqlalchemy.orm import Session # type: ignore
import app.models as models, app.schemas as schemas
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

def delete_practice_session(db: Session, session_id: int):
    db_session = db.query(models.PracticeSession).filter(models.PracticeSession.id == session_id).first()
    if db_session:
        db.delete(db_session)
        db.commit()
        return db_session
    return None

# --- Role CRUD ---
def get_role_type(db: Session, role_id: int):
    return db.query(models.Role).filter(models.Role.id == role_id).first()


def get_role_types(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Role).offset(skip).limit(limit).all()


def create_role_type(db: Session, role: schemas.RoleTypeCreate):
    db_role = models.Role(**role.dict())
    db.add(db_role)
    db.commit()
    db.refresh(db_role)
    return db_role


# --- Action CRUD ---
def get_action_name(db: Session, action_id: int):
    return db.query(models.Action).filter(models.Action.id == action_id).first()


def get_action_names(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Action).offset(skip).limit(limit).all()


def create_action_name(db: Session, action: schemas.ActionNameCreate):
    db_action = models.Action(**action.dict())
    db.add(db_action)
    db.commit()
    db.refresh(db_action)
    return db_action


# --- Result CRUD ---
def get_result_name(db: Session, result_id: int):
    return db.query(models.Result).filter(models.Result.id == result_id).first()


def get_result_names(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Result).offset(skip).limit(limit).all()


def create_result_name(db: Session, result: schemas.ResultNameCreate):
    db_result = models.Result(**result.dict())
    db.add(db_result)
    db.commit()
    db.refresh(db_result)
    return db_result


# --- Shot CRUD ---
def get_shot_name(db: Session, shot_id: int):
    return db.query(models.Shot).filter(models.Shot.id == shot_id).first()


def get_shot_names(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Shot).offset(skip).limit(limit).all()


def create_shot_name(db: Session, shot: schemas.ShotNameCreate):
    db_shot = models.Shot(**shot.dict())
    db.add(db_shot)
    db.commit()
    db.refresh(db_shot)
    return db_shot


# --- Tag Action Result CRUD ---
def get_tag_action_result(db: Session, tag_id: int):
    return db.query(models.TagActionResult).filter(models.TagActionResult.id == tag_id).first()

def get_tag_action_results(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.TagActionResult).offset(skip).limit(limit).all()

def create_tag_action_result(db: Session, tag: schemas.TagActionResultCreate):
    db_tag = models.TagActionResult(**tag.dict())
    db.add(db_tag)
    db.commit()
    db.refresh(db_tag)
    return db_tag


# --- Stats CRUD ---
def get_all_stats(db: Session):
    return db.query(models.Stat).all()

def get_stat(db: Session, practice_session_id: int, player_id: int):
    return db.query(models.Stat).filter(
        models.Stat.practice_session_id == practice_session_id,
        models.Stat.player_id == player_id
    )

def create_stat(db: Session, stat: schemas.StatCreate, practice_session_id: int, player_id: int):
    existing_stat = db.query(models.Stat).filter_by(
        practice_session_id=practice_session_id,
        player_id=player_id
    ).first()

    if existing_stat:
        for field, value in stat.dict().items():
            setattr(existing_stat, field, value)
        db.commit()
        db.refresh(existing_stat)
        return existing_stat

    db_stat = models.Stat(**stat.dict())
    db_stat.practice_session_id = practice_session_id
    db_stat.player_id = player_id
    db.add(db_stat)
    db.commit()
    db.refresh(db_stat)
    return db_stat