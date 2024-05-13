import threading
import psycopg2
from psycopg2.extras import RealDictCursor
import time


cursor = None
conn = None
def init_database():
    global cursor, conn
    while True:
        try:
            conn = psycopg2.connect(host='localhost', database='ConvoCorner', user='postgres',
                                    password='iamgroot', cursor_factory=RealDictCursor)
            cursor = conn.cursor()
            print('Database connection is successful')
            break
        except Exception as error:
            print('Database connection failed')
            print(f'Error: {error}')
            time.sleep(2)


def get_user(id: int):
    cursor.execute(""" SELECT * FROM users where id = %s """, (str(id), ))
    user = cursor.fetchone()
    
    print(user)
    
    return user


def create_user(name: str, email: str, password: str):
    print(password)
    cursor.execute(""" INSERT INTO users (name, email, password) 
                    VALUES (%s, %s, %s) RETURNING * """, (name, email, password))
    new_user = cursor.fetchone()
    conn.commit()
    
    print(new_user)
    
    return new_user


def login_user(email: str):
    cursor.execute(""" SELECT * FROM users where email = %s """, (email, ))
    user = cursor.fetchone()
    
    print(user)
    
    return user


def create_participant(user_id: int, chatroom_id: int):
    cursor.execute(""" INSERT INTO participants (user_id, chatroom_id) 
                   VALUES (%s, %s) RETURNING *""", (str(user_id), str(chatroom_id)))
    new_participant = cursor.fetchone()
    conn.commit()
    
    print(new_participant)
    

def get_participants(chatroom_id: int):
    cursor.execute(""" SELECT users.id, users.name FROM users JOIN participants
                   ON participants.user_id = users.id
                   WHERE participants.chatroom_id = %s """, (str(chatroom_id), ))
    participants = cursor.fetchall()
    
    print(participants)
    
    return participants


def get_chatroom(flag: int, user_id: int):
    # flag = 1: gives joined chatrooms
    # flag = 0: gives not yet joined chatrooms
    if flag:
        cursor.execute(""" SELECT * FROM chatrooms JOIN participants ON 
                       chatrooms.id = participants.chatroom_id 
                       WHERE participants.user_id = %s """, (str(user_id), ))
        chatrooms = cursor.fetchall()
    else:
        cursor.execute(""" SELECT * FROM chatrooms LEFT JOIN participants 
                       ON chatrooms.id = participants.chatroom_id 
                       AND participants.user_id = %s 
                       WHERE participants.user_id IS NULL """, (str(user_id), ))
        chatrooms = cursor.fetchall()
        
    print(chatrooms)
        
    return chatrooms


def create_chatroom(name: str, topic: str, owner_id: int):
    cursor.execute(""" INSERT INTO chatrooms (name, topic, owner_id) 
                    VALUES (%s, %s, %s) RETURNING *""", (name, topic, str(owner_id)))
    new_chatroom = cursor.fetchone()
    conn.commit()
    
    print(new_chatroom)
    
    create_participant(owner_id, new_chatroom['id'])
    
    
def create_message(user_id: int, chatroom_id: int, text: str, image_data):
    if image_data == '':
        cursor.execute(""" INSERT INTO messages (user_id, chatroom_id, text) 
                       VALUES (%s, %s, %s) RETURNING * """, (str(user_id), str(chatroom_id), text))
    else:
        cursor.execute(""" INSERT INTO messages (user_id, chatroom_id, text, image_data)
                            VALUES (%s, %s, %s, %s) RETURNING * """, (str(user_id), str(chatroom_id), text, image_data.encode()))
    
    new_message = cursor.fetchone()
    conn.commit()
    
    return new_message

    
def get_messages(chatroom_id: int):
    cursor.execute(""" SELECT messages.*, users.name as username FROM messages
                        JOIN users ON messages.user_id = users.id
                        WHERE messages.chatroom_id = %s
                        ORDER BY messages.sent_at """, (str(chatroom_id), ))
    messages = cursor.fetchall()
    
    return messages

def get_images(chatroom_id: int):
    cursor.execute(""" SELECT messages.*, users.name as username FROM messages
                        JOIN users ON messages.user_id = users.id
                        WHERE messages.chatroom_id = %s
                        AND messages.image_data IS NOT NULL
                        ORDER BY messages.sent_at""", (str(chatroom_id), ))
    messages = cursor.fetchall()
    
    return messages