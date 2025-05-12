from pydantic import BaseSettings, AnyHttpUrl, PostgresDsn, validator, Field
from typing import List, Optional


def _assemble_cors_origins(origins: str) -> List[str]:
    return [origin.strip() for origin in origins.split(",") if origin]


class Settings(BaseSettings):
    # Database
    DATABASE_URL: PostgresDsn

    # Security
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(30, description="Token expiration in minutes")

    # CORS
    CORS_ORIGINS: Optional[str] = Field(
        "http://localhost:3000,https://localhost:3000",
        description="Comma-separated list of allowed origins"
    )
    cors_origins: List[AnyHttpUrl] = []

    # Application
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Practice Analytics API"

    @validator("cors_origins", pre=True)
    def assemble_cors_origins(cls, v, values):
        origins = values.get("CORS_ORIGINS")
        if isinstance(origins, str):
            return _assemble_cors_origins(origins)
        return origins

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
