import threading
from fastapi import FastAPI
import psycopg2
from psycopg2.extras import RealDictCursor
import time
from . import models, schemas, utils
from .database import engine, get_db
from .routers import user, auth, chatroom, participant, message
from sqlalchemy.orm import Session
from .transport.server import sReceiver
from .transport.client import cReceiver
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
    

while True:
    try:
        conn = psycopg2.connect(host='localhost', database='ConvoCorner', user='postgres',
                                password='Baba733700!', cursor_factory=RealDictCursor)
        cursor = conn.cursor()
        print('Database connection is successful')
        break
    except Exception as error:
        print('Database connection failed')
        print(f'Error: {error}')
        time.sleep(2)


app.include_router(user.router)
app.include_router(auth.router)
app.include_router(chatroom.router)
app.include_router(participant.router)
app.include_router(message.router)