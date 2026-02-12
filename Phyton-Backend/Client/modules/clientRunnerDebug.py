from queue import Queue
from SpeachClient.speachRecogniser import SpeechRecognizer
from WinkkClient.responseAssosiator import responseAssosiator
from ChatClient.chatResponder import chatResponder
from TTSClient.ttsHandler import ttsHandler
from ExecuterClient.commandAssosiator import commandAssosiator
from helpers.config import keyword, selected_module
from FlaskClient.flaskClient import app, run_flask
import threading
import subprocess
import sys

class ClientRunner:
    def __init__(self): 
        self.response_associator = responseAssosiator()
        self.chat_responder = chatResponder()
        self.command_associator = commandAssosiator()
        self.tts = ttsHandler()
    def run(self):
        print("Starting ClientRunner...")
        self.tts.say("Starting ClientRunner...")
        while True:
                speech_text = input("Enter a text for debugging: ")
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
                    self.command_associator.assosiate(response_number, response_strings)
                

if __name__ == "__main__":
    flask_thread = threading.Thread(target=run_flask)
    flask_thread.daemon = True
    flask_thread.start()
    client_runner = ClientRunner()
    client_runner.run()
