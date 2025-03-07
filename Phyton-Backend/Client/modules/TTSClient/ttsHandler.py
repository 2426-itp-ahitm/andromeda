import pyttsx3

class ttsHandler:
    def __init__(self):
        self.engine = pyttsx3.init()

    def say(self, text):
        self.engine.say(text)
        self.engine.runAndWait()

# Example usage
if __name__ == "__main__":
    tts = ttsHandler()
    tts.say("Hello, I am a text-to-speech engine.")