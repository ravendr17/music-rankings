from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    DATABASE_URL: set

    model_config = SettingsConfigDict(env_file='.env')


settings = Settings()