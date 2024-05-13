from typing import List
from fastapi import APIRouter, Depends, status, HTTPException
from .. import models, schemas, oauth2
from ..database import get_db
from sqlalchemy.orm import Session


router = APIRouter(
    prefix="/participants",
    tags=["Participant"]
)


@router.get("/{id}", response_model=List[schemas.UserOut])
def get_participant(id: int, db: Session = Depends(get_db), 
            current_user: int = Depends(oauth2.get_current_user)):
    
    participants = db.query(models.User.id, models.User.name).join(models.Participant, 
        models.User.id == models.Participant.user_id).filter(models.Participant.chatroom_id == id).all()
    
    print(participants)
    return participants


@router.post("/{id}", status_code=status.HTTP_201_CREATED, response_model=schemas.Participant)
def create_participant(id: int, db: Session = Depends(get_db), 
                current_user: int = Depends(oauth2.get_current_user)):
    
    chatroom = db.query(models.ChatRoom).filter(models.ChatRoom.id == id).first()
    
    if chatroom.owner_id == current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You are already the owner of the room")
    
    new_participant = models.Participant(user_id=current_user.id, chatroom_id=id)
    db.add(new_participant)
    db.commit()
    db.refresh(new_participant)
    
    return new_participant