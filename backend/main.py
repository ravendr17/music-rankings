from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schemas import ReportCreate

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

@app.get('/')
def home():
    return {'message': 'hello world'}

@app.post('/api/reports')
def create_report(report: ReportCreate):
    return report
