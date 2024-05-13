from fastapi import FastAPI
from .routers import user, auth, chatroom, participant, message
from fastapi.middleware.cors import CORSMiddleware

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


app.include_router(user.router)
app.include_router(auth.router)
app.include_router(chatroom.router)
app.include_router(participant.router)
app.include_router(message.router)
