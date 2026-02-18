import socket

def StartServer(port):
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.bind(("", port))

    print(f"Servidor escuchando en puerto {port}...")

    while True:
        data, addr = sock.recvfrom(65535)
        print(f"Mensaje recibido de {addr}: {data.decode()}")

if __name__ == "__main__":
    port = int(input("Ingrese puerto: "))
    StartServer(port)
