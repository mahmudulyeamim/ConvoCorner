from fastapi import APIRouter, status
from .. import schemas, utils, sender, receiver

ENCODER = 'utf-8'

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get("/{id}")
def get_user(id: int):
    mSender = sender.Sender()
    request = f"get_user<m>{id}"
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
    
    return user


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_user(user: schemas.UserCreate):
    user.password = utils.hash(user.password)
    mSender = sender.Sender()
    request = f"create_user<m>{user.name}<p>{user.email}<p>{user.password}"
    mSender.read_file(request.encode(ENCODER))
    mSender.start_sending()
    
    mReceiver =  receiver.Receiver()
    data = mReceiver.start_receiving()
    
    cols = data.split('<c>')
    new_user = {
        'id': int(cols[0]),
        'name': cols[1],
        'email': cols[2],
        'password': cols[3],
        'created_at': cols[4]
    }
    
    print(new_user)
    
    return new_user