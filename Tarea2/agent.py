import socket

def read_exact(sock, n):
    data = b""

    while len(data) < n:
        chunk = sock.recv(n - len(data))

        if not chunk:
            raise ConnectionError("Conexion cerrada")
        
        data += chunk
    
    return data

def StartServer(port):
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind(("", port))
    server.listen(1)

    print("Esperando conexion...")
    conn, addr = server.accept()
    print("Conectando con", addr)

    while True:
        move = read_exact(conn, 2)
        print("Accion recibida:", move)

        conn.sendall(b"\x00")

def StartClient(server_ip, port):
    client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client.connect((server_ip, port))

    while True:
        move = input("Ingrese movimiento (ej C7) o q para salir: ")
        if move == "q":
            break

        client.sendall(move.encode())
        result = read_exact(client, 1)

        print("Resultado:", int.from_bytes(result, "big"))

if __name__ == "__main__":
    mode = input("server/client: ")

    if mode == "server":
        port =  int(input("Puerto: "))
        StartServer(port)
    else:
        ip = input("IP servidor: ")
        port = int(input("Puerto: "))
        StartClient(ip, port)