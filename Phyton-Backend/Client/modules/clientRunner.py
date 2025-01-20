from queue import Queue
from SpeachClient.speachRecogniser import SpeechRecognizer
from GPTClient.responseAssosiator import responseAssosiator
from TTSClient.ttsHandler import ttsHandler
from helpers.config import keyword, selected_module
import threading

class ClientRunner:
    def __init__(self):
        self.data_queue = Queue()
        self.speech_recognizer = SpeechRecognizer(selected_module, keyword, self.data_queue)
        self.response_associator = responseAssosiator()
        self.tts = ttsHandler()
    def run(self):
        print("Starting ClientRunner...")
        self.tts.say("Starting ClientRunner...")
        while True:
            if not self.data_queue.empty():
                speech_text = self.data_queue.get()
                print(f"Recognized Speech: {speech_text}")
                response = self.response_associator.generateResponse(speech_text)
                print(f"Analyzed Response: {response}")
                self.tts.say("Analyzed Response: " + response)


if __name__ == "__main__":
    client_runner = ClientRunner()
    speech_thread = threading.Thread(target=client_runner.speech_recognizer.recognize_speech)
    speech_thread.daemon = True
    speech_thread.start()
    client_runner.run()