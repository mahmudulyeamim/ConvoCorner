import random
import socket
import threading
import time
from colorama import Fore, Style

CLIENT_IP = socket.gethostbyname(socket.gethostname())
CLIENT_PORT = 9896
ENCODER = 'utf-8'
MSS = 1024 * 8
MAX_TCP_SEGMENT_SIZE = MSS + 76
RECEIVER_BUFFER = MSS * 10
TIMEOUT = 1000
ERROR = 3


class Receiver:
    
    def __init__(self):
        self.receiver = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        
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


    def start_receiving(self):
        self.receiver.bind((CLIENT_IP, CLIENT_PORT))
        self.receiver.listen()
        print('[CLIENT] Waiting for the server')
        sender, address = self.receiver.accept()
        print(f'[CLIENT] Connected to server: {address}')
        sender.settimeout(0.01)
        
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
        self.receiver.close()
        
        data = self.file_bytes_received.decode(ENCODER)
        # print(data)
        
        return data
