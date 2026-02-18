import socket
import sounddevice as sd
import numpy as np

def StartClient(port):
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

    server_ip = input("Ingrese IP del servidor: ")

    frames = 16000
    samplerate = 8000

    print("Grabando audio...")
    audio = sd.rec(frames, samplerate=samplerate, channels=1, dtype='float32')
    sd.wait()
    print("Grabación terminada.")

    # Convertir a bytes
    audio_bytes = audio.tobytes()

    sock.sendto(audio_bytes, (server_ip, port))
    print("Audio enviado.")

if __name__ == "__main__":
    port = int(input("Ingrese puerto: "))
    StartClient(port)
