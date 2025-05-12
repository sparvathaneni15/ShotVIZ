import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Database URL: e.g. postgres://user:pass@host:port/dbname
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5432/dbname")

# Create the SQLAlchemy engine
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
)

# Create a configured "Session" class
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

# Base class for ORM models
Base = declarative_base()

# Dependency function for FastAPI to get DB session
def get_db():
    """
    FastAPI dependency that yields a database session and closes it after.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
