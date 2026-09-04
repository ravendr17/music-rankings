from database import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import UniqueConstraint, ForeignKey

class Song(Base):
    __tablename__ = 'songs'

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str]
    artist: Mapped[str]

    __table_args__= (
        UniqueConstraint('title', 'artist', name='uq_songs_title_artist'),
    )


class Report(Base):
    __tablename__ = 'reports'

    id: Mapped[int] = mapped_column(primary_key=True)
    year: Mapped[int]
    month: Mapped[int]
    total_hours: Mapped[int]

    __table_args__ = (
        UniqueConstraint('year', 'month', name='uq_reports_year_month'),
    )


class Ranking(Base):
    __tablename__ = 'rankings'

    id: Mapped[int] = mapped_column(primary_key=True)

    report_id: Mapped[int] = mapped_column(
        ForeignKey('reports.id', name='fk_rankings_report_id')
    )

    song_id: Mapped[int] = mapped_column(
        ForeignKey('songs.id', name='fk_rankings_song_id')
    )

    play_count: Mapped[int]

    __table_args__ = (
        UniqueConstraint(
            'report_id', 
            'song_id', 
            name='uq_rankings_report_id_song_id'
        ),
    )
