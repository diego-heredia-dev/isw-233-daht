import socket
from seaBattle import SeaBattleField

def read_exact(sock, n):
    data = b""

    while len(data) < n:
        chunk = sock.recv(n - len(data))

        if not chunk:
            raise ConnectionError("Conexion cerrada")
        
        data += chunk
    
    return data

def StartServer(seed, port):
    field = SeaBattleField()
    field.get_random_field(seed)

    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind(("", port))
    server.listen(1)

    print("Esperando conexion...")
    conn, addr = server.accept()
    print("Conectado con", addr)

    agent = SeaBattleAgent(field, conn, False)
    agent.start_game()
    
    

def StartClient(seed, server_ip, port):
    field = SeaBattleField()
    field.get_random_field(seed)

    client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client.connect((server_ip, port))

    agent = SeaBattleAgent(field, client, True)
    agent.start_game()

def parse_move(text):
    if len(text) != 2:
        return None
    
    col = text[0].upper()
    row = text[1]

    if col < 'A' or col > 'H':
        return None
    
    if row < '1' or row > '8':
        return None
    
    x = ord(col) - ord('A')
    y = int(row) - 1

    return (x, y)

class SeaBattleAgent:
    def __init__(self, field, conn, is_my_turn):
        self.field = field
        self.conn = conn
        self.is_my_turn = is_my_turn

    def start_game(self):
        while True:
            if self.is_my_turn:
                move = input("Tu turno: ")
                coords = parse_move(move)

                if coords is None:
                    continue

                self.conn.sendall(move.encode())
                result = int.from_bytes(read_exact(self.conn, 1), "big")

                print("Resultado:", result)

                if result == 0:
                    self.is_my_turn = False
            else:
                move_bytes = read_exact(self.conn, 2)
                move_text = move_bytes.decode()

                coords = parse_move(move_text)

                if coords is None:
                    continue
                
                (x, y) = coords

                result = self.field.shoot(x, y)
                self.conn.sendall(bytes([result]))

                print("Oponente disparo:", move_text)

                if result == 0:
                    self.is_my_turn = True

                if self.field.is_loser():
                    print("Perdiste")
                    break

if __name__ == "__main__":
    mode = input("server/client: ")

    if mode == "server":
        seed = int(input("Seed: "))
        port =  int(input("Puerto: "))
        StartServer(seed, port)
    else:
        seed = int(input("Seed: "))
        ip = input("IP servidor: ")
        port = int(input("Puerto: "))
        StartClient(seed, ip, port)