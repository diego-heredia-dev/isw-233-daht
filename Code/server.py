import socket
import sounddevice as sd
import numpy as np

def StartServer(port):
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.bind(("", port))

    print(f"Servidor escuchando en puerto {port}...")

    while True:
        data, addr = sock.recvfrom(65535)
        print(f"Audio recibido de {addr}")

        # Convertir bytes a numpy array
        audio_array = np.frombuffer(data, dtype='float32')

        # Reproducir
        sd.play(audio_array, samplerate=8000)
        sd.wait()

if __name__ == "__main__":
    port = int(input("Ingrese puerto: "))
    StartServer(port)
