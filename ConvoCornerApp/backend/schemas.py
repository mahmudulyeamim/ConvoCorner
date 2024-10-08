from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime


class UserLogin(BaseModel):
    username: EmailStr
    password: str


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    
    
class UserOut(BaseModel):
    id: int
    name: str
    email: str



class Token(BaseModel):
    access_token: str
    token_type: str
    
    
class TokenData(BaseModel):
    id: Optional[int] = None
    
    
class ChatRoomCreate(BaseModel):
    name: str
    topic: str
    
    
class ChatRoomOut(BaseModel):
    id: int
    name: str
    topic: str
    owner_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True


class Participant(BaseModel):
    user_id: int
    chatroom_id: int
    
    class Config:
        from_attributes = True
        
        
class Message(BaseModel):
    id: int
    user_id: int
    chatroom_id: int
    text: str | None = None
    sent_at: datetime
    image_data : bytes | None = None
    
    
class MessageCreate(BaseModel):
    text: str
    
    class Config:
        from_attributes = True
    
    
class MessageOut(BaseModel):
    name: str
    text: str
    sent_at: datetime