from queue import Queue
from SpeachClient.speachRecogniser import SpeechRecognizer
from WinkkClient.responseAssosiator import responseAssosiator
from ChatClient.chatResponder import chatResponder
from TTSClient.ttsHandler import ttsHandler
from ExecuterClient.commandAssosiator import commandAssosiator
from helpers.config import keyword, selected_module
import threading

class ClientRunner:
    def __init__(self):

        
        self.data_queue = Queue()
        self.response_associator = responseAssosiator()
        self.chat_responder = chatResponder()
        self.command_associator = commandAssosiator()
        self.speech_recognizer = SpeechRecognizer(selected_module, keyword, self.data_queue)


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
                if response == 0 or response == "0":
                    #chatresponse = self.chat_responder.generateResponse(speech_text)
                    #self.tts.say(chatresponse)
                    #print(chatresponse)
                    print("this feature was removed due to stupid reasoning")
                else: 
                    response_parts = response.split(", ")
                    response_number = response_parts[0]
                    response_strings = response_parts[1:]
                    print(f"Executing command")
                    self.command_associator.assosiate(response_number, response_strings)


if __name__ == "__main__":
    client_runner = ClientRunner()
    speech_thread = threading.Thread(target=client_runner.speech_recognizer.recognize_speech)
    speech_thread.daemon = True
    speech_thread.start()
    client_runner.run()