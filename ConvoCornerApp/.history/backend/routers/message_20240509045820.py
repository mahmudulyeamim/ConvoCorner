from typing import List
from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect, status, HTTPException
from .. import models, schemas, oauth2
from ..database import get_db
from sqlalchemy.orm import Session
from ..transport.client import Sender
from ..connection import ConnectionManager
import asyncio


router = APIRouter(
    prefix="/messages",
    tags=["Messages"]
)


@router.get("/{chatroom_id}")
async def get_message(chatroom_id: int, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    messages = db.query(models.Message).filter(models.Message.chatroom_id == chatroom_id).order_by(models.Message.sent_at).all()
    for message in messages:
        message.user = db.query(models.User).filter(models.User.id == message.user_id).first()
        message.user.password = None
    
    
    return messages


manager = ConnectionManager()


@router.websocket("/ws/{chatroom_id}")
async def create_message(websocket: WebSocket, chatroom_id: int, user_id : int, db: Session = Depends(get_db)):
    print("chat room id : " + str(chatroom_id))
    await manager.connect(websocket, user_id, chatroom_id)
    try: 
        while True:
            message = await websocket.receive_text()
            user = db.query(models.User).filter(models.User.id == user_id).first()
            await manager.broadcast(message, user_id, chatroom_id)
            # await manager.broadcast(message, chatroom_id)
            
            new_message = models.Message(user_id=user_id, chatroom_id=id, text=message)
            db.add(new_message)
            db.commit()
            db.refresh(new_message)
            await asyncio.sleep(5)
            
            
    except WebSocketDisconnect:
        manager.disconnect(websocket)