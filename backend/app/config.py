from dotenv import load_dotenv
from pathlib import Path
from pydantic_settings import BaseSettings
from pydantic import validator

# Load .env from the same directory as config.py
load_dotenv(dotenv_path=Path(__file__).resolve().parent.parent / ".env")
class Settings(BaseSettings):
    DATABASE_URL: str 
    MONGO_URL : str
    BACKEND_CORS_ORIGINS: list[str]
    S3_BUCKET_NAME: str
    AWS_REGION: str
    AWS_ACCESS_KEY_ID: str
    AWS_SECRET_ACCESS_KEY: str
    VITE_S3_BUCKET_URL: str
    POSTGRES_DB : str
    POSTGRES_USER : str
    POSTGRES_PASSWORD : str
    MONGO_DB : str
    MONGO_ROOT_USER : str
    MONGO_ROOT_PASSWORD : str


    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def parse_origins(cls, v):
        if isinstance(v, str):
            return [i.strip() for i in v.split(",")]
        return v

    class Config:
        env_file = ".env"

settings = Settings()
