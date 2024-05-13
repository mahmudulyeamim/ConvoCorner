import os
import random
import socket
import time
from colorama import Fore, Style

SERVER_IP = socket.gethostbyname(socket.gethostname())
SERVER_PORT = 9895
ENCODER = 'utf-8'
MSS = 1024 * 8
MAX_TCP_SEGMENT_SIZE = MSS + 76
TIMEOUT = 250
ERROR = 3

class Sender:
    
    def __init__(self):
        self.sender = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.sender.connect((SERVER_IP, SERVER_PORT))
        print(f'[CLIENT] Connected to the server')
        self.sender.settimeout(0.01)
        
        self.recv_count = 0
        self.last_segment_send = -MSS
        self.last_segment_acked = -MSS
        self.next_seq_num = 0
        self.receive_window = MSS * 10
        self.cwnd = 1 * MSS
        self.ssthresh = (1 << 50) * MSS
        self.file_data = []
        
        
    def read_file(self, file):
        i = 0
        while True:
            if i + MSS < len(file):
                chunk = file[i: i + MSS]
                self.file_data.append(chunk)
                i = i + MSS
            else:
                chunk = file[i:]
                self.file_data.append(chunk)
                break


    def make_packet(self, data, sequence_number):
        source_port = b'0000008989'
        destination_port = b'0000008989'
        sequence_number = str(sequence_number).zfill(20).encode(ENCODER)
        ack_number = b'00000000000000000000'
        header_length = b'00004'
        ack_flag = b'0'
        rwnd = b'0000000000'

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


    def timer_running(self, start_time):
        return (time.time() - start_time) * 1000 < TIMEOUT


    def timeout(self, start_time):
        return (time.time() - start_time) * 1000 >= TIMEOUT


    def receive_data(self):
        segment_no = self.next_seq_num // MSS
        if segment_no < len(self.file_data):
            self.last_segment_sent = self.next_seq_num - MSS
            if self.last_segment_sent - self.last_segment_acked <= self.cwnd:
                print(Fore.LIGHTBLUE_EX + f'Seq no {self.next_seq_num} is sent')
                print(Style.RESET_ALL)
                return self.file_data[segment_no]


    def retransmit_data(self, flag=True):
        segment_no = self.last_segment_acked // MSS + 1
        if segment_no < len(self.file_data):
            if flag:
                print(Fore.LIGHTRED_EX + 'Timeout!')
            print(Fore.LIGHTRED_EX + f'Seq no {self.last_segment_acked + MSS} is resent')
            print(Style.RESET_ALL)
            return self.file_data[segment_no]


    def receive_ack(self):
        try:
            received_ack = self.sender.recv(MAX_TCP_SEGMENT_SIZE)
            if received_ack:
                if self.recv_count < 223 or random.randint(1, 10) > ERROR:
                    self.recv_count += 1
                    return received_ack
                else:
                    source_port, destination_port, sequence_number, ack_number, header_length, ack_flag, rwnd, data = self.extract(
                        received_ack)
                    self.recv_count = (self.recv_count + 1) % 227
                    print(Fore.LIGHTRED_EX + f'Ack {ack_number} dropped')
        except socket.timeout:
            pass


    def more_not_yet_acked_segments(self):
        return self.last_segment_sent - self.last_segment_acked > 0


    def start_sending(self):
        global TIMEOUT
        
        exec_start_time = time.time()
        start_time = time.time()

        count_ack_no = {self.last_segment_acked + MSS: 0}

        estimatedRTT = 0
        devRTT = 0

        slow_start = True
        congestion_avoidance = False
        fast_recovery = False

        expected_ack = -MSS
        triggered_ack = -MSS

        send_count = 0
        resend_count = 0
        while True:
            data = self.receive_data()
            if data:
                send_count += 1
                if not self.timer_running(start_time):
                    start_time = time.time()

                packet = self.make_packet(data, self.next_seq_num)

                self.sender.send(packet)
                self.next_seq_num = self.next_seq_num + MSS

            if self.timeout(start_time):
                data = self.retransmit_data()
                if data:
                    send_count += 1
                    resend_count += 1
                    count_ack_no[self.last_segment_acked + MSS] = 1
                    packet = self.make_packet(data, self.last_segment_acked + MSS)
                    self.sender.send(packet)
                    start_time = time.time()

                    # congestion control - slow start + congestion avoidance + fast recovery
                    self.ssthresh = self.cwnd / 2
                    self.cwnd = 1 * MSS
                    slow_start = True
                    congestion_avoidance = False
                    fast_recovery = False

                    print(Fore.LIGHTYELLOW_EX)
                    if slow_start:
                        print("[SLOW START]")
                    elif congestion_avoidance:
                        print("[CONGESTION AVOIDANCE]")
                    else:
                        print("[FAST RECOVERY]")
                        print(Fore.LIGHTBLUE_EX + f'Estimated last packet of the congestion window is {expected_ack - MSS}')
                    print(Style.RESET_ALL)

                    print(Fore.LIGHTMAGENTA_EX + 'CWND:' + Style.RESET_ALL + f' {self.cwnd / MSS} MSS')
                    print(Fore.LIGHTMAGENTA_EX + 'SSTHRESH:' + Style.RESET_ALL + f' {self.ssthresh / MSS} MSS')
                else:
                    print(Fore.LIGHTGREEN_EX + f'Sent file successfully')
                    print(Style.RESET_ALL)
                    break

            received_ack = self.receive_ack()
            if received_ack:
                (source_port, destination_port, sequence_number, ack_number,
                header_length, ack_flag, rwnd, data) = self.extract(received_ack)

                self.last_segment_acked = ack_number - MSS
                self.receive_window = rwnd

                if self.more_not_yet_acked_segments():
                    start_time = time.time()

                print(Fore.LIGHTGREEN_EX + f'Received ack {ack_number}')
                print(Style.RESET_ALL)

                if fast_recovery:
                    if triggered_ack < ack_number < expected_ack:
                        print(Fore.LIGHTCYAN_EX + 'Partial ack' + Style.RESET_ALL)
                        self.cwnd = self.cwnd + 1 * MSS
                    elif ack_number >= expected_ack:
                        count_ack_no[ack_number] = 1
                        print(Fore.LIGHTCYAN_EX + 'New ack' + Style.RESET_ALL)
                        self.cwnd = self.ssthresh
                        congestion_avoidance = True
                        fast_recovery = False
                    elif ack_number == triggered_ack:
                        self.cwnd = self.cwnd + 1 * MSS
                        print(Fore.LIGHTRED_EX + 'Duplicate ack' + Style.RESET_ALL)

                if ack_number in count_ack_no:
                    print(Fore.LIGHTRED_EX + 'Duplicate ack' + Style.RESET_ALL)
                    if count_ack_no[ack_number] == 3:
                        send_count += 1
                        resend_count += 1
                        print(Fore.LIGHTRED_EX + f'Fast retransmit. Received 3 duplicate ack for {ack_number} before timeout')
                        print(Style.RESET_ALL)
                        data = self.retransmit_data(flag=False)
                        packet = self.make_packet(data, self.last_segment_acked + MSS)
                        self.sender.send(packet)
                        count_ack_no[ack_number] = 1

                        # congestion control - fast recovery
                        slow_start = False
                        congestion_avoidance = False
                        fast_recovery = True

                        self.ssthresh = self.cwnd / 2
                        self.cwnd = self.ssthresh + 3 * MSS

                        triggered_ack = ack_number
                        expected_ack = self.last_segment_sent + MSS
                    else:
                        count_ack_no[ack_number] += 1

                else:
                    count_ack_no[ack_number] = 1
                    sampleRTT = time.time() - start_time
                    alpha = 0.125
                    estimatedRTT = (1 - alpha) * estimatedRTT + alpha * sampleRTT
                    beta = 0.25
                    devRTT = (1 - beta) * devRTT + beta * abs(sampleRTT - estimatedRTT)
                    RTO = estimatedRTT + 4 * devRTT
                    # print(f'SampleRTT {sampleRTT * 1000}ms')
                    # print(f'EstimatedRTT {estimatedRTT * 1000}ms')
                    # print(f'DevRTT {devRTT * 1000}ms')
                    # print(f'RTO {RTO * 1000}ms')
                    TIMEOUT = RTO * 1000

                    # congestion control
                    if slow_start:
                        self.cwnd = self.cwnd + MSS
                    elif congestion_avoidance:
                        self.cwnd = self.cwnd + MSS * MSS / self.cwnd

                print(Fore.LIGHTYELLOW_EX)
                if slow_start:
                    print("[SLOW START]")
                elif congestion_avoidance:
                    print("[CONGESTION AVOIDANCE]")
                else:
                    print("[FAST RECOVERY]")
                    print(Fore.LIGHTBLUE_EX + f'Estimated last packet of the congestion window is {expected_ack - MSS}')
                print(Style.RESET_ALL)

                print(Fore.LIGHTMAGENTA_EX + 'CWND:' + Style.RESET_ALL + f' {self.cwnd / MSS} MSS')
                print(Fore.LIGHTMAGENTA_EX + 'SSTHRESH:' + Style.RESET_ALL + f' {self.ssthresh / MSS} MSS')

            if slow_start and self.cwnd >= self.ssthresh:
                slow_start = False
                congestion_avoidance = True

        execution_time = time.time() - exec_start_time

        print(Fore.LIGHTYELLOW_EX + 'Execution time: ' + Style.RESET_ALL + f'{execution_time * 1000} ms')
        print(Fore.LIGHTYELLOW_EX + 'Packet loss rate: ' + Style.RESET_ALL + f'{resend_count / send_count * 100} %')
        print(Fore.LIGHTYELLOW_EX + 'Estimated Round Trip: ' + Style.RESET_ALL + f'{estimatedRTT * 1000} ms')