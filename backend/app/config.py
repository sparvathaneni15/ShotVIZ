from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str  # e.g. postgres://user:pass@host:port/dbname
    BACKEND_CORS_ORIGINS: list[str] = ["http://localhost:3000"]

    class Config:
        env_file = ".env"

settings = Settings()