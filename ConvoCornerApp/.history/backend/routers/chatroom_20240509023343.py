from typing import List
from fastapi import APIRouter, Depends, status, HTTPException
from .. import models, schemas, oauth2
from ..database import get_db
from sqlalchemy.orm import Session


router = APIRouter(
    prefix="/chatrooms",
    tags=["Chatrooms"]
)


@router.get("/{flag}", response_model=List[schemas.ChatRoomOut])
def get_chatroom(flag: int, db: Session = Depends(get_db), 
            current_user: int = Depends(oauth2.get_current_user)):
    
    # flag = 1: gives joined chatrooms
    # flag = 0: gives not yet joined chatrooms
    if flag:
        chatrooms = db.query(models.ChatRoom).join(models.Participant, 
            models.ChatRoom.id == models.Participant.chatroom_id).filter(
            models.Participant.user_id == current_user.id).all()
    else:
        chatrooms = db.query(models.ChatRoom).outerjoin(models.Participant, 
            (models.ChatRoom.id == models.Participant.chatroom_id) & 
            (models.Participant.user_id == current_user.id)).filter(
            models.Participant.user_id == None).all()
    
    return chatrooms


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.ChatRoomOut)
def create_chatroom(chatroom: schemas.ChatRoomCreate, db: Session = Depends(get_db), 
                current_user: int = Depends(oauth2.get_current_user)):
    
    new_chatroom = models.ChatRoom(owner_id=current_user.id, **chatroom.dict())
    db.add(new_chatroom)
    db.commit()
    db.refresh(new_chatroom)
    
    return new_chatroom



