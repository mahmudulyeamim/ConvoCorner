from fastapi import APIRouter, Depends, HTTPException, status, Body
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from .. import schemas, models, utils, oauth2
from ..database import get_db


router = APIRouter(
    tags=["Authentication"]
)

@router.post("/login")
def login(user_credentials: dict = Body(...), db: Session = Depends(get_db)):
    username = user_credentials.get("username")
    password = user_credentials.get("password")

    if username is None or password is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="error")

    user = db.query(models.User).filter(models.User.email == username).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="error")

    if not utils.verify(password, user.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="error")

    access_token = oauth2.create_access_token({"id": user.id, "email": user.email})
        
    return {"access_token": access_token, "token_type": "bearer", id : user.id}