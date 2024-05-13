from fastapi import APIRouter, HTTPException, status
from .. import schemas, utils, oauth2, sender, receiver

ENCODER = 'utf-8'


router = APIRouter(
    tags=["Authentication"]
)


@router.post("/login", tags=['auth'])
def login_user(user_credentials: schemas.UserLogin):
    username = user_credentials.username
    password = user_credentials.password

    if username is None or password is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="error")
    
    mSender = sender.Sender()
    request = f"login_user<m>{username}"
    mSender.read_file(request.encode(ENCODER))
    mSender.start_sending()
    
    mReceiver =  receiver.Receiver()
    data = mReceiver.start_receiving()
    
    if data != '':
        cols = data.split('<c>')
        user = {
            'id': int(cols[0]),
            'name': cols[1],
            'email': cols[2],
            'password': cols[3],
            'created_at': cols[4]
        }
        
    print(user)
    
    if data == '':
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="error")

    if not utils.verify(password, user['password']):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="error")

    access_token = oauth2.create_access_token({"id": user['id'], "email": user['email']})
    return {
        "accessToken": access_token,
        "token_type": "Bearer",
        "id": user['id'],
        "name" : user['name']
    }