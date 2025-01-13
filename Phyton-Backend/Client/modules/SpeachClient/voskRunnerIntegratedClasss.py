import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))


from helpers.config import keyword, selected_module
from speachRecogniser import SpeechRecognizer

if __name__ == "__main__":
    recognizer = SpeechRecognizer(selected_module, keyword)
    recognizer.recognize_speech()