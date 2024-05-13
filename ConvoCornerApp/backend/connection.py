from fastapi import APIRouter, WebSocket, status
from typing import Dict, Tuple

class ConnectionManager:
    def __init__(self):
        self.connections: Dict[Tuple[int, int], WebSocket] = {}

    async def connect(self, websocket: WebSocket, user_id: int, chatroom_id: int):
        await websocket.accept()
        self.connections[(user_id, chatroom_id)] = websocket

    async def disconnect(self, websocket: WebSocket, user_id: int, chatroom_id: int):
        key = (user_id, chatroom_id)
        if key in self.connections:
            del self.connections[key]
            await websocket.close()

    async def broadcast(self, message: str, sender_user_id: int, chatroom_id: int):
        for (user_id, room_id), websocket in self.connections.items():
            if room_id == chatroom_id :
                await websocket.send_json(message) 
            