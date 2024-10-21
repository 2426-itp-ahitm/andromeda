import os
import json
import queue
import sounddevice as sd
from vosk import Model, KaldiRecognizer

# Paths to the models (update these paths to where you've extracted the models)
MODEL_ENGLISH_PATH = "C:\\Users\\gabri\\Downloads\\vosk-model-en-us-0.42-gigaspeech\\vosk-model-en-us-0.42-gigaspeech"

MODEL_GERMAN_PATH = "C:\\Users\\gabri\Downloads\\vosk-model-de-0.21\\vosk-model-de-0.21"

# Initialize audio queue for real-time streaming
audio_queue = queue.Queue()

def callback(indata, frames, time, status):
    """Callback function to handle audio from the microphone."""
    if status:
        print(status, file=sys.stderr)
    audio_queue.put(bytes(indata))

def recognize_speech():
    # Load the English model by default
    model = Model(MODEL_GERMAN_PATH)
    recognizer = KaldiRecognizer(model, 16000)
    current_language = "de"  # Start with English
    keyword_detected = False

    # Start the microphone stream
    with sd.RawInputStream(samplerate=16000, blocksize=8000, dtype='int16', channels=1, callback=callback):
        print("Listening for the keyword 'Andromeda'...")

        while True:
            data = audio_queue.get()
            if recognizer.AcceptWaveform(data):
                result = recognizer.Result()
                result_dict = json.loads(result)
                text = result_dict.get("text", "").lower()
                print(text)
                if not keyword_detected:
                    if "andromeda" in text:
                        print("Keyword 'Andromeda' detected! Now actively listening...")
                        keyword_detected = True
                else:
                    # Switch language command
                    if "switch language" in text:
                        if current_language == "en":
                            model = Model(MODEL_GERMAN_PATH)
                            recognizer = KaldiRecognizer(model, 16000)
                            current_language = "de"
                            print("Language switched to German.")
                        else:
                            model = Model(MODEL_ENGLISH_PATH)
                            recognizer = KaldiRecognizer(model, 16000)
                            current_language = "en"
                            print("Language switched to English.")
                    else:
                        print(f"You said ({'German' if current_language == 'de' else 'English'}): {text}")

if __name__ == "__main__":
    recognize_speech()
