import socket
import sounddevice as sd
import numpy as np

def StartClient(port):
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

    frames = 16000
    samplerate = 8000
    frame_size = np.dtype('float32').itemsize

    while True:
        server_ip = input("Ingrese IP del servidor (o 'q' para salir): ")
        if server_ip.lower() == 'q':
            break

        input("Presione Enter para grabar...")

        print("Grabando...")
        audio = sd.rec(frames, samplerate=samplerate, channels=1, dtype='float32')
        sd.wait()

        audio_bytes = audio.tobytes()

        bytes_to_send = frames * frame_size
        print(f"Enviando {bytes_to_send} bytes")

        sock.sendto(audio_bytes, (server_ip, port))
        print("Audio enviado.\n")

if __name__ == "__main__":
    port = int(input("Ingrese puerto: "))
    StartClient(port)
