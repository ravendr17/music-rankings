from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import ReportCreate, ReportResponse
from database import Base, engine, get_db
from sqlalchemy.orm import Session
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from models import Report, Song, Ranking

Base.metadata.create_all(engine)

app = FastAPI()

origins = [
    'http://localhost:5173'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

@app.post('/api/reports', status_code=201, response_model=ReportResponse)
def create_report(request: ReportCreate, session: Session = Depends(get_db)
):
    try:
        report = Report(
            year=request.year,
            month=request.month,
            total_hours=request.total_hours
        )
    
        session.add(report)
        session.flush()

        for s in request.songs:
            song = session.scalars(
                select(Song).filter_by(
                    title=s.title,
                    artist=s.artist
                ).limit(1)
            ).first()
    
            if song is None:
                song = Song(
                    title=s.title,
                    artist=s.artist
                )
                session.add(song)
                session.flush()
    
            ranking = Ranking(
                report_id=report.id,
                song_id=song.id,
                play_count=s.play_count
            )
            session.add(ranking)

        session.commit()

        return ReportResponse(
            id=report.id,
            year=report.year,
            month=report.month
        )
    except IntegrityError as e:
        session.rollback()
        constraint = getattr(e.orig.diag, 'constraint_name', None)

        if constraint == 'uq_reports_year_month':
            raise HTTPException(status_code=409, detail='Report for this year/month already exists.')
        elif constraint == 'uq_rankings_report_id_song_id':
            raise HTTPException(status_code=422, detail='Duplicate song entries submitted.')

        raise HTTPException(status_code=500, detail='Unexpected database error.')