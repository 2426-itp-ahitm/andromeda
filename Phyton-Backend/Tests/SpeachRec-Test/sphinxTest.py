import speech_recognition as sr

def recognize_speech_offline():
    # Initialize recognizer and microphone
    recognizer = sr.Recognizer()
    microphone = sr.Microphone()

    # Adjust for ambient noise
    with microphone as source:
        print("Adjusting for ambient noise... Please wait.")
        recognizer.adjust_for_ambient_noise(source, duration=1)
        print("Listening for speech...")

        # Start listening in real-time
        while True:
            try:
                print("Listening...")
                audio = recognizer.listen(source)

                # Use PocketSphinx for offline recognition
                print("Recognizing speech offline using PocketSphinx...")
                text = recognizer.recognize_sphinx(audio)

                print(f"You said: {text}")

            except sr.UnknownValueError:
                print("Sorry, I couldn't understand what you said.")
            except sr.RequestError as e:
                print(f"Error: {e}")

if __name__ == "__main__":
    recognize_speech_offline()
