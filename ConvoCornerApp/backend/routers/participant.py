from fastapi import APIRouter, Depends, status
from .. import oauth2, sender, receiver

ENCODER = 'utf-8'


router = APIRouter(
    prefix="/participants",
    tags=["Participant"]
)


@router.get("/{id}")
async def get_participant(id: int, current_user: int = Depends(oauth2.get_current_user)):    
    mSender = sender.Sender()
    request = f"get_participants<m>{id}"
    mSender.read_file(request.encode(ENCODER))
    mSender.start_sending()
    
    mReceiver =  receiver.Receiver()
    data = mReceiver.start_receiving()
    participants = []
    
    if data != '':
        information = data.split('<d>')
        for info in information:
            cols = info.split('<c>')
            participant = {
                'user_id': int(cols[0]),
                'name': cols[1]
            }
            participants.append(participant)
            
            print(participant)

    return participants


@router.post("/{id}", status_code=status.HTTP_201_CREATED)
async def create_participant(id: int, current_user: int = Depends(oauth2.get_current_user)):    
    mSender = sender.Sender()
    request = f"create_participant<m>{current_user.id}<p>{id}"
    mSender.read_file(request.encode(ENCODER))
    mSender.start_sending()