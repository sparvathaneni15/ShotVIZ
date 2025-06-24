from pydantic_settings import BaseSettings # type: ignore

class Settings(BaseSettings):
    DATABASE_URL: str  # e.g. postgres://user:pass@host:port/dbname
    BACKEND_CORS_ORIGINS: list[str] = ["http://localhost:3000"]
    s3_bucket_name: str
    aws_region: str
    aws_access_key_id: str
    aws_secret_access_key: str
    vite_s3_bucket_url: str

    class Config:
        env_file = ".env"

settings = Settings()