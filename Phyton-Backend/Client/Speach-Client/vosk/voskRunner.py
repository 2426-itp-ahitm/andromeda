import os
import json
import queue
import sounddevice as sd
import timer as t

from vosk import Model, KaldiRecognizer
from helpers.txtWriter import txtWriter
from helpers.config import keyword, selected_module

# Initialize audio queue for real-time streaming
audio_queue = queue.Queue()

def callback(indata, frames, time, status):
    """Callback function to handle audio from the microphone."""
    if status:
        print(status, file=sys.stderr)
    audio_queue.put(bytes(indata))

def recognize_speech():
    # Load the English model by default
    model = Model(selected_module)
    recognizer = KaldiRecognizer(model, 16000)
    current_language = "de"  # Start with English
    keyword_detected = False
    writer = txtWriter("test.txt")
    # Start the microphone stream with a smaller blocksize for faster recognition
    with sd.RawInputStream(samplerate=16000, blocksize=4000, dtype='int16', channels=1, callback=callback):
        print("Listening for the keyword "+keyword+"...")
    
        while True:
            data = audio_queue.get()
            
            if recognizer.AcceptWaveform(data):
                result = recognizer.Result()
                result_dict = json.loads(result)
                text = result_dict.get("text", "").lower()

                if not keyword_detected:
                    if keyword in text:
                        print("Keyword "+keyword+" detected! Now actively listening...")
                        keyword_detected = True
                else:
                    print(f"You said ({'German' if current_language == 'de' else 'English'}): {text}")
                    writer.writeInFile(text)
            else:
                # Partial result allows for faster response to shorter utterances
                partial_result = recognizer.PartialResult()
                partial_dict = json.loads(partial_result)
                partial_text = partial_dict.get("partial", "").lower()

                if not keyword_detected and keyword in partial_text:
                    print("Keyword "+keyword+" detected in partial result! Now actively listening...")
                    keyword_detected = True
                    writer.openTextEditor()

if __name__ == "__main__":
    recognize_speech()
