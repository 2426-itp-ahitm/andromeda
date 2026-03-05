from queue import Queue
from SpeachClient.speachRecogniser import SpeechRecognizer
from WinkkClient.responseAssosiator import responseAssosiator
from ChatClient.chatResponder import chatResponder
from TTSClient.ttsHandler import ttsHandler
from ExecuterClient.commandAssosiator import commandAssosiator
from FlaskClient.flaskClient import app, run_flask
from helpers.config import keyword, selected_module
import threading
import subprocess
import sys

class ClientRunner:
    def __init__(self):

        
        self.data_queue = Queue()
        self.response_associator = responseAssosiator()
        self.chat_responder = chatResponder()
        self.command_associator = commandAssosiator()
        print(f"Selected module for speech recognition: {selected_module}")
        self.speech_recognizer = SpeechRecognizer(selected_module, keyword, self.data_queue)

        self.tts = ttsHandler()
    def run(self):
        print("Starting ClientRunner...")
        self.tts.say("Starting ClientRunner...")
        while True:
            try:
                speech_text = self.data_queue.get(timeout=1)
                print(f"Recognized Speech: {speech_text}")
                if speech_text.lower() == "restart":
                    print("Restarting program...")
                    self.tts.say("Restarting program")
                    subprocess.Popen([sys.executable, __file__])
                    break
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
            except:
                continue
    

if __name__ == "__main__":
    client_runner = ClientRunner()
    speech_thread = threading.Thread(target=client_runner.speech_recognizer.recognize_speech)
    flask_thread = threading.Thread(target=run_flask)
    speech_thread.daemon = True
    speech_thread.start()
    flask_thread.daemon = True
    flask_thread.start()
    client_runner.run()