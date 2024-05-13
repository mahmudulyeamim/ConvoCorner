from datetime import datetime, timedelta, timezone
from fastapi import Depends, HTTPException, status
from jose import JWTError, jwt
from . import schemas
from fastapi.security import OAuth2PasswordBearer
from .database import get_db
from . import models
from sqlalchemy.orm import Session


SECRET_KEY = "0hfhgf4e094faa6ca2556c87q84fdsf166b7a9563b93f7099aa6cf63b88e88hg5ft8"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


oath2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def create_access_token(data: dict):
    to_encode = data.copy()
    
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    
    access_token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    
    return access_token


def verify_access_token(token: str, credentials_exception):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        
        id: int = payload.get("user_id")
        
        if id is None:
            raise credentials_exception
        
        token_data = schemas.TokenData(id=id)
    except JWTError:
        raise credentials_exception
    
    return token_data
    
    
def get_current_user(token: str = Depends(oath2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException (status_code=status.HTTP_401_UNAUTHORIZED, 
        detail="Could not validate credentials", headers={"WWW-Authenticate": "Bearer"})
    
    token_data = verify_access_token(token, credentials_exception)
    
    user = db.query(models.User).filter(models.User.id == token_data.id).first()
    
    return user