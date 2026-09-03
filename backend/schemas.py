from pydantic import BaseModel, Field

class SongCreate(BaseModel):
    title: str = Field(min_length=1, max_length=100)
    artist: str = Field(min_length=1, max_length=100)
    play_count: int = Field(ge=1, le=999999)

class ReportCreate(BaseModel):
    year: int = Field(ge=2000, le=2999)
    month: int = Field(ge=1, le=12)
    total_hours: int = Field(ge=1, le=999999)
    songs: list[SongCreate] = Field(min_length=1, max_length=10)