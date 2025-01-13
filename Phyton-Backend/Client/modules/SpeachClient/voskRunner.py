import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import json
import queue
import sounddevice as sd

from vosk import Model, KaldiRecognizer
from helpers.txtWriter import txtWriter
from helpers.textFormatter import TextFormatter
from helpers.config import keyword, selected_module

audio_queue = queue.Queue()

def callback(indata, frames, time, status):
    """Callback function to handle audio from the microphone."""
    if status:
        print(status, file=sys.stderr)
    audio_queue.put(bytes(indata))

def recognize_speech():
    with open("customWords.json", "r") as file:
        custom_vocabulary = json.load(file)
    model = Model(selected_module)
    recognizer = KaldiRecognizer(model, 16000,json.dumps(custom_vocabulary) )
    keyword_detected = False
    writer = txtWriter("test.txt")
    formatter = TextFormatter(keyword)
    with sd.RawInputStream(samplerate=16000, blocksize=4000, dtype='int16', channels=1, callback=callback):
        print("Listening for the keyword "+keyword+"...")
    
        while True:
            data = audio_queue.get()
            if data is None:
                keyword_detected = False
            if recognizer.AcceptWaveform(data):
                result = recognizer.Result()
                result_dict = json.loads(result)
                text = result_dict.get("text", "").lower()
                text = formatter.clearTextBeforeKeyword(text)
                if keyword_detected:
                    print(f"You said {text}")
                    writer.writeInFile(text)
                    keyword_detected = False
                    print("Listening for the keyword "+keyword+"...")
            else:
                partial_result = recognizer.PartialResult()
                partial_dict = json.loads(partial_result)
                partial_text = partial_dict.get("partial", "").lower()
                # print(f"Audio chunk size: {len(data)}")
                # print(f"First 10 bytes of data: {data[:10]}")
                # print(f"Partial Text: {partial_result}")
                if not keyword_detected and keyword in partial_text:
                    print("Keyword "+keyword+" detected in partial result! Now actively listening...")
                    keyword_detected = True
                    writer.openTextEditor()

if __name__ == "__main__":
    recognize_speech()
