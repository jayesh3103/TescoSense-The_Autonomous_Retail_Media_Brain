import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "TescoSense"
    API_V1_STR: str = "/api/v1"
    DATABASE_URL: str = "sqlite:///./tescosense.db"
    
    # Agent Settings
    SENSING_INTERVAL: int = 10  # seconds
    
    class Config:
        env_file = ".env"

settings = Settings()
