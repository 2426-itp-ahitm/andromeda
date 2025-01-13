from queue import Queue
from SpeachClient.vosk.speachRecogniser import SpeechRecognizer
from GPTClient.responseAssosiator import responseAssosiator
from SpeachClient.vosk.helpers.config import keyword, selected_module
from SpeachClient.vosk.helpers.txtWriter import txtWriter

class ClientRunner:
    def __init__(self):
        self.data_queue = Queue()
        self.speech_recognizer = SpeechRecognizer(selected_module, keyword, self.data_queue)
        self.response_associator = responseAssosiator()

    def run(self):
        print("Starting ClientRunner...")
        while True:
            if not self.data_queue.empty():
                speech_text = self.data_queue.get()
                print(f"Recognized Speech: {speech_text}")
                response = self.response_associator.generateResponse(speech_text)
                print(f"Analyzed Response: {response}")

if __name__ == "__main__":
    client_runner = ClientRunner()
    client_runner.speech_recognizer.recognize_speech()
    client_runner.run()