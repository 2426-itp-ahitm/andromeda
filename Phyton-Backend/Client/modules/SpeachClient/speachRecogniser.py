import os
import json
import queue
import sounddevice as sd
from queue import Queue
from vosk import Model, KaldiRecognizer
from helpers.txtWriter import txtWriter
from helpers.textFormatter import TextFormatter
from helpers.config import keyword, selected_module


class SpeechRecognizer:
    def __init__(self, model_path, keyword, data_queue = None):
        self.model_path = model_path
        self.keyword = keyword
        self.audio_queue = queue.Queue()
        self.data_queue = data_queue  # Shared queue for external use
        self.keyword_detected = False
        self.writer = txtWriter("log.txt")
        self.formatter = TextFormatter(keyword)
        self.model = Model(self.model_path)
        self.recognizer = KaldiRecognizer(self.model, 16000)
    def callback(self, indata, frames, time, status):
        """Callback function to handle audio from the microphone."""
        if status:
            print(status, file=sys.stderr)
        self.audio_queue.put(bytes(indata))

    def recognize_speech(self):
        with sd.RawInputStream(samplerate=16000, blocksize=4000, dtype='int16', channels=1, callback=self.callback):
            print(f"Listening for the keyword '{self.keyword}'...")

            while True:
                data = self.audio_queue.get()
                if data is None:
                    self.keyword_detected = False
                if self.recognizer.AcceptWaveform(data):
                    result = self.recognizer.Result()
                    result_dict = json.loads(result)
                    text = result_dict.get("text", "").lower()
                    #print(f"Text: {text}")
                    text = self.formatter.clearTextBeforeKeyword(text)
                    if self.keyword_detected:
                        print(f"You said {text}")
                        self.writer.writeInFile(text)
                        self.keyword_detected = False
                        if(self.data_queue is not None):
                            self.data_queue.put(text)
                        else:
                            print("no data queue")
                else:
                        #print(f"Audio chunk size: {len(data)}")
                        #print(f"First 10 bytes of data: {data[:10]}")

                        partial_result = self.recognizer.PartialResult()
                        partial_dict = json.loads(partial_result)
                        partial_text = partial_dict.get("partial", "").lower()
                        #print(f"Partial Text: {partial_result}")
                        if not self.keyword_detected and self.keyword in partial_text:
                            print(f"Keyword '{self.keyword}' detected in partial result! Now actively listening...")
                            self.keyword_detected = True
                            self.writer.openTextEditor()


if __name__ == "__main__":
    recognizer = SpeechRecognizer(selected_module, keyword, None)
    recognizer.recognize_speech()