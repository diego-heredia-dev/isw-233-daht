import socket

def StartClient(port):
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

    server_ip = input("Ingrese IP del servidor: ")
    message = input("Mensaje a enviar: ")

    sock.sendto(message.encode(), (server_ip, port))
    print("Mensaje enviado.")

if __name__ == "__main__":
    port = int(input("Ingrese puerto: "))
    StartClient(port)
