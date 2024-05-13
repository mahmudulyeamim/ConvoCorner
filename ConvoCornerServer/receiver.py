import base64
import random
import socket
import threading
import time
from colorama import Fore, Style
import database, sender

SERVER_IP = socket.gethostbyname(socket.gethostname())
SERVER_PORT = 9895
ENCODER = 'utf-8'
MSS = 1024 * 8
MAX_TCP_SEGMENT_SIZE = MSS + 76
RECEIVER_BUFFER = MSS * 10
TIMEOUT = 1000
ERROR = 3

receiver = socket.socket(socket.AF_INET, socket.SOCK_STREAM)


class Receiver:
    
    def __init__(self):
        self.recv_count = 0

        self.last_segment_read = 0
        self.next_seq_num = 0

        self.file_bytes_received = b''
        self.buffered_segments = []


    def make_packet(self, ack_number, data=b''):
        source_port = b'0000008989'
        destination_port = b'0000008989'
        sequence_number = b'00000000000000000000'
        ack_number = str(ack_number).zfill(20).encode(ENCODER)
        header_length = b'00004'
        ack_flag = b'1'
        last_segment_received = self.next_seq_num - MSS
        rwnd = str(RECEIVER_BUFFER - (last_segment_received - self.last_segment_read)).zfill(10).encode(ENCODER)

        header = source_port + destination_port + sequence_number + ack_number + header_length + ack_flag + rwnd

        packet = header + data

        return packet


    def extract(self, packet):
        source_port = int(packet[:10].decode(ENCODER))
        destination_port = int(packet[10:20].decode(ENCODER))
        sequence_number = int(packet[20:40].decode(ENCODER))
        ack_number = int(packet[40:60].decode(ENCODER))
        header_length = int(packet[60:65].decode(ENCODER))
        ack_flag = int(packet[65:66].decode(ENCODER))
        rwnd = int(packet[66:76].decode(ENCODER))
        data = packet[76:]

        return source_port, destination_port, sequence_number, ack_number, header_length, ack_flag, rwnd, data


    def send_data(self, data):
        mSender = sender.Sender()
        mSender.read_file(data)
        mSender.start_sending()

    #request formate: method<m>parameter1<p>parameter2<p>....<p>parameterN

    #information return format: data1<d>data2<d>...<d>dataN
    #every data formate: col1<c>col2<c>...<c>colN
    def process_request(self, request):
        method, parameters = request.split('<m>')
        parameter = parameters.split('<p>')
        
        if method == 'get_user':
            print(method)
            print(parameter)
            
            user = database.get_user(int(parameter[0]))
            
            data = str(user['id']).encode(ENCODER) + b'<c>' + user['name'].encode(ENCODER) + b'<c>' + user['email'].encode(ENCODER) + b'<c>' + user['password'].encode(ENCODER) + b'<c>' + str(user['created_at']).encode(ENCODER)
            self.send_data(data)
        elif method == 'create_user':
            print(method)
            print(parameter)
            
            user = database.create_user(parameter[0], parameter[1], parameter[2])
            
            data = str(user['id']).encode(ENCODER) + b'<c>' + user['name'].encode(ENCODER) + b'<c>' + user['email'].encode(ENCODER) + b'<c>' + user['password'].encode(ENCODER) + b'<c>' + str(user['created_at']).encode(ENCODER)
            self.send_data(data)
        elif method == 'login_user':
            print(method)
            print(parameter)
            
            user = database.login_user(parameter[0])
            
            data = str(user['id']).encode(ENCODER) + b'<c>' + user['name'].encode(ENCODER) + b'<c>' + user['email'].encode(ENCODER) + b'<c>' + user['password'].encode(ENCODER) + b'<c>' + str(user['created_at']).encode(ENCODER)
            self.send_data(data)
        elif method == 'get_chatrooms':
            print(method)
            print(parameter)
            
            chatrooms = database.get_chatroom(int(parameter[0]), int(parameter[1]))
            
            data = b''
            for chatroom in chatrooms:
                id = str(chatroom['id']).encode(ENCODER)
                topic = chatroom['topic'].encode(ENCODER)
                created_at = str(chatroom['created_at']).encode(ENCODER)
                name = chatroom['name'].encode(ENCODER)
                owner_id = str(chatroom['owner_id']).encode(ENCODER)
                data += id + b'<c>' + topic + b'<c>' + created_at + b'<c>' + name + b'<c>' + owner_id + b'<d>'
            
            self.send_data(data[:-3])
        elif method == 'create_chatroom':
            print(method)
            print(parameter)
            
            database.create_chatroom(parameter[0], parameter[1], int(parameter[2]))
        elif method == 'get_participants':
            print(method)
            print(parameter)
            
            participants = database.get_participants(int(parameter[0]))
            
            data = b''
            for participant in participants:
                data += str(participant['id']).encode(ENCODER) + b'<c>' + participant['name'].encode(ENCODER) + b'<d>'
            
            self.send_data(b'' if data == b'' else data[:-3])
        elif method == 'create_participant':
            print(method)
            print(parameter)
            
            database.create_participant(int(parameter[0]), int(parameter[1]))
        elif method == 'get_messages':
            print(method)
            
            messages = database.get_messages(int(parameter[0]))
            
            data = b''
            for message in messages:
                id = str(message['id']).encode(ENCODER)
                user_id = str(message['user_id']).encode(ENCODER)
                chatroom_id = str(message['chatroom_id']).encode(ENCODER)
                text = b'' if message['text'] is None else message['text'].encode(ENCODER)
                image_data = b'' if message['image_data'] is None else message['image_data']
                sent_at = str(message['sent_at']).encode(ENCODER)
                username = message['username'].encode(ENCODER)
                data += id + b'<c>' + user_id + b'<c>' + chatroom_id + b'<c>' + text + b'<c>' + image_data + b'<c>' + sent_at + b'<c>' + username + b'<d>'
            
            self.send_data(b'' if data == b'' else data[:-3])
        elif method == 'get_images':
            print(method)
            
            messages = database.get_messages(int(parameter[0]))
            
            data = b''
            for message in messages:
                id = str(message['id']).encode(ENCODER)
                user_id = str(message['user_id']).encode(ENCODER)
                chatroom_id = str(message['chatroom_id']).encode(ENCODER)
                text = b'' if message['text'] is None else message['text'].encode(ENCODER)
                image_data = b'' if message['image_data'] is None else message['image_data']
                sent_at = str(message['sent_at']).encode(ENCODER)
                username = message['username'].encode(ENCODER)
                data += id + b'<c>' + user_id + b'<c>' + chatroom_id + b'<c>' + text + b'<c>' + image_data + b'<c>' + sent_at + b'<c>' + username + b'<d>'
            
            self.send_data(b'' if data == b'' else data[:-3])
        elif method == 'create_message':
            print(method)
 
            message = database.create_message(int(parameter[0]), int(parameter[1]), parameter[2], parameter[3])
            
            id = str(message['id']).encode(ENCODER)
            
            data = id
            self.send_data(b'' if data == b'' else data)

    def receive_data(self, sender):
        try:
            packet = sender.recv(MAX_TCP_SEGMENT_SIZE)
            if packet:
                if self.recv_count < 101 or random.randint(1, 10) > ERROR:
                    self.recv_count += 1
                    return packet
                else:
                    source_port, destination_port, sequence_number, ack_number, header_length, ack_flag, rwnd, data = self.extract(packet)
                    self.recv_count = (self.recv_count + 1) % 127
                    print(Fore.LIGHTRED_EX + f'Packet {sequence_number} dropped' + Style.RESET_ALL)
        except socket.timeout:
            pass


    def read_data(self):
        if random.randint(1, 10) > ERROR and len(self.buffered_segments):

            self.last_segment_read = self.next_seq_num - MSS

            print('\n')
            for seq_no in self.buffered_segments:
                print(Fore.LIGHTBLUE_EX + f'Sequence no {seq_no} is transferred to the upper layer' + Style.RESET_ALL)
            self.buffered_segments = []
            print('\n')


    def timeout(self, start_time):
        return (time.time() - start_time) * 1000 >= TIMEOUT


    def start_receiving(self, sender, address):
        received_segments = {}

        start_time = time.time()

        while True:
            received_data = self.receive_data(sender)
            if received_data:
                source_port, destination_port, sequence_number, ack_number, header_length, ack_flag, rwnd, data = self.extract(received_data)
                print(Fore.LIGHTMAGENTA_EX + f'Seq no {sequence_number} has arrived' + Style.RESET_ALL)

                if sequence_number not in received_segments:
                    received_segments[sequence_number] = data
                    print(Fore.LIGHTGREEN_EX + f'Seq no {sequence_number} is received' + Style.RESET_ALL)

                while self.next_seq_num in received_segments:
                    self.file_bytes_received += received_segments[self.next_seq_num]
                    self.buffered_segments.append(self.next_seq_num)
                    self.next_seq_num = self.next_seq_num + MSS

                packet = self.make_packet(ack_number=self.next_seq_num)
                print(Fore.LIGHTGREEN_EX + f'Sent ack {self.next_seq_num}' + Style.RESET_ALL)
                sender.send(packet)

                start_time = time.time()

            self.read_data()

            if self.timeout(start_time):
                print(Fore.LIGHTGREEN_EX + f'Successfully received file' + Style.RESET_ALL)

                break
        sender.close()
        
        request = self.file_bytes_received.decode(ENCODER)
        self.process_request(request)


def start_receiver():
    receiver.bind((SERVER_IP, SERVER_PORT))
    receiver.listen()
    print('[RECEIVER] Server waiting for the Client')

    while True:
        sender, address = receiver.accept()
        print(f'[RECEIVER] Server connected to Client: {address}')
        sender.settimeout(0.01)
        
        new_receiver = Receiver()
        
        thread = threading.Thread(target=new_receiver.start_receiving, args=(sender, address))
        thread.start()
