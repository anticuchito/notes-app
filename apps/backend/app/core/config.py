from pydantic_settings import BaseSettings
from pydantic import Field
from sqlalchemy.engine import URL

class Settings(BaseSettings):
    postgres_user: str = Field(env="POSTGRES_USER")
    postgres_password: str = Field(env="POSTGRES_PASSWORD")
    postgres_host: str = Field(env="POSTGRES_HOST")
    postgres_port: int = Field(env="POSTGRES_PORT")  # Cambiado a int
    db_name: str = Field(env="DB_NAME")

    @property
    def DATABASE_URL(self):
        return f'postgresql://{self.postgres_user}:{self.postgres_password}@{self.postgres_host}:{self.postgres_port}/{self.db_name}'

    class Config:
        env_file = ".env"
        
        
   
settings = Settings()