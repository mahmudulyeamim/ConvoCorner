import time
import os
from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect
from .. import oauth2, sender, receiver
from ..connection import ConnectionManager
from colorama import Fore, Style

ENCODER = 'utf-8'

router = APIRouter(
    prefix="/messages",
    tags=["Messages"]
)


@router.get("/{chatroom_id}")
async def get_message(chatroom_id: int, current_user: int = Depends(oauth2.get_current_user)):
    start_time = time.time()
    
    file_name = f'caches/message{chatroom_id}.txt'
    
    if os.path.exists(file_name) is False:
        with open(file_name, 'w') as file:
            pass
    
    file = open(file_name, 'r')
    file_contents = file.read()
    file.close()
    
    messages = []
    
    if len(file_contents):
        information = file_contents.split('<d>')
        for info in information:
            cols = info.split('<c>')
            message = {
                'id': int(cols[0]),
                'user_id': int(cols[1]),
                'chatroom_id': int(cols[2]),
                'text': None if cols[3] == '' else cols[3],
                'image_data': None if cols[4] == '' else cols[4],
                'sent_at': cols[5],
                'username': cols[6]
            }
            messages.append(message)
            
            if message['image_data'] is None:
                print(message)
    else:    
        mSender = sender.Sender()
        request = f"get_messages<m>{chatroom_id}"
        mSender.read_file(request.encode(ENCODER))
        mSender.start_sending()  
        
        mReceiver =  receiver.Receiver()
        data = mReceiver.start_receiving()
        
        if data != '':
            information = data.split('<d>')
            for info in information:
                cols = info.split('<c>')
                message = {
                    'id': int(cols[0]),
                    'user_id': int(cols[1]),
                    'chatroom_id': int(cols[2]),
                    'text': None if cols[3] == '' else cols[3],
                    'image_data': None if cols[4] == '' else cols[4],
                    'sent_at': cols[5],
                    'username': cols[6]
                }
                messages.append(message)
                
                if message['image_data'] is None:
                    print(message)
        
        with open(file_name, 'w') as file:        
            file.write(data)
            
    print(Fore.LIGHTMAGENTA_EX + f'Execution time: {(time.time() - start_time) * 1000} ms' + Style.RESET_ALL)
    
    return messages


manager = ConnectionManager()

@router.get("/images/{chatroom_id}")
async def get_images(chatroom_id: int, current_user: int = Depends(oauth2.get_current_user)):
    start_time = time.time()
    
    file_name = f'caches/image{chatroom_id}.txt'
    
    if os.path.exists(file_name) is False:
        with open(file_name, 'w') as file:
            pass
    
    file = open(file_name, 'r')
    file_contents = file.read()
    file.close()
    
    messages = []
    
    if len(file_contents):
        information = file_contents.split('<d>')
        for info in information:
            cols = info.split('<c>')
            message = {
                'id': int(cols[0]),
                'user_id': int(cols[1]),
                'chatroom_id': int(cols[2]),
                'text': None if cols[3] == '' else cols[3],
                'image_data': cols[4],
                'sent_at': cols[5],
                'username': cols[6]
            }
            messages.append(message)
    else:
        mSender = sender.Sender()
        request = f"get_images<m>{chatroom_id}"
        mSender.read_file(request.encode(ENCODER))
        mSender.start_sending()  
        
        mReceiver =  receiver.Receiver()
        data = mReceiver.start_receiving()
        
        
        if data != '':
            information = data.split('<d>')
            for info in information:
                cols = info.split('<c>')
                message = {
                    'id': int(cols[0]),
                    'user_id': int(cols[1]),
                    'chatroom_id': int(cols[2]),
                    'text': None if cols[3] == '' else cols[3],
                    'image_data': cols[4],
                    'sent_at': cols[5],
                    'username': cols[6]
                }
                messages.append(message)
    
        with open(file_name, 'w') as file:        
            file.write(data)
    
    print(Fore.LIGHTMAGENTA_EX + f'Execution time: {(time.time() - start_time) * 1000} ms' + Style.RESET_ALL)
    
    return messages


@router.websocket("/ws/{chatroom_id}")
async def create_message(websocket: WebSocket, chatroom_id: int, user_id : int):
    await manager.connect(websocket, user_id, chatroom_id)
    try: 
        while True:
            data = await websocket.receive_text()
            image_flag = True if data[:2] == "~`" else False
            if image_flag :
                message = None
                if len(data) > 2 :
                    message = data[2 : ]
                image_data = await websocket.receive_text()
                
                mSender = sender.Sender()
                request = f"get_user<m>{user_id}"
                mSender.read_file(request.encode(ENCODER))
                mSender.start_sending()  
                
                mReceiver =  receiver.Receiver()
                data = mReceiver.start_receiving()
                
                cols = data.split('<c>')
                username = cols[1]
                
                text = '' if message is None else message
                
                mSender = sender.Sender()
                request = f"create_message<m>{user_id}<p>{chatroom_id}<p>{text}<p>{image_data}"
                mSender.read_file(request.encode(ENCODER))
                mSender.start_sending()  
                
                mReceiver =  receiver.Receiver()
                data = mReceiver.start_receiving()
                
                new_message_id = int(data)
                
                message = {
                    "id" : new_message_id,
                    "chatroom_id" : chatroom_id,
                    "text" : message,
                    "username" : username,
                    "user_id" : user_id,
                    "image_data" : image_data
                }
            else :
                message = data
                
                mSender = sender.Sender()
                request = f"get_user<m>{user_id}"
                mSender.read_file(request.encode(ENCODER))
                mSender.start_sending()  
                
                mReceiver =  receiver.Receiver()
                data = mReceiver.start_receiving()
                
                cols = data.split('<c>')
                username = cols[1]
                
                mSender = sender.Sender()
                request = f"create_message<m>{user_id}<p>{chatroom_id}<p>{message}<p>{''}"
                mSender.read_file(request.encode(ENCODER))
                mSender.start_sending()  
                
                mReceiver =  receiver.Receiver()
                data = mReceiver.start_receiving()
                
                new_message_id = int(data)
                
                message = {
                    "id" : new_message_id,
                    "chatroom_id" : chatroom_id,
                    "text" : message,
                    "username" : username,
                    "user_id" : user_id,
                    "image_data" : None
                }
                
                print(message)
            await manager.broadcast(message, user_id, chatroom_id)
            
            file_name = f'caches/message{chatroom_id}.txt'
            with open(file_name, 'w') as file:
                pass
            
            file_name = f'caches/image{chatroom_id}.txt'
            with open(file_name, 'w') as file:
                pass

            
            
    except WebSocketDisconnect:
        await manager.disconnect(websocket, user_id=user_id, chatroom_id = chatroom_id)
        # print("disconnected")