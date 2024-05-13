from fastapi import APIRouter, Depends, status
from .. import schemas, oauth2, sender, receiver

ENCODER = 'utf-8'


router = APIRouter(
    prefix="/chatrooms",
    tags=["Chatrooms"]
)


@router.get("/{flag}")
async def get_chatroom(flag: int, current_user: int = Depends(oauth2.get_current_user)):
    mSender = sender.Sender()
    request = f"get_chatrooms<m>{flag}<p>{current_user.id}"
    mSender.read_file(request.encode(ENCODER))
    mSender.start_sending()
    
    mReceiver =  receiver.Receiver()
    data = mReceiver.start_receiving()
    chatrooms = []
    
    if data != '':
        information = data.split('<d>')
        for info in information:
            cols = info.split('<c>')
            chatroom = {
                'id': int(cols[0]),
                'topic': cols[1],
                'created_at': cols[2],
                'name': cols[3],
                'owner_id': int(cols[4])
            }
            chatrooms.append(chatroom)
            print(chatroom)
    
    return chatrooms


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_chatroom(chatroom: schemas.ChatRoomCreate, current_user: int = Depends(oauth2.get_current_user)):
    mSender = sender.Sender()
    request = f"create_chatroom<m>{chatroom.name}<p>{chatroom.topic}<p>{current_user.id}"
    mSender.read_file(request.encode(ENCODER))
    mSender.start_sending()
