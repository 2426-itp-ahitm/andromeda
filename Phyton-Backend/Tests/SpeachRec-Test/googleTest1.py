import speech_recognition as sr
import pyttsx3

# Constants for languages (use these codes to switch language models)
LANGUAGE_ENGLISH = 'en-US'
LANGUAGE_SPANISH = 'es-ES'
LANGUAGE_GERMAN = 'de-DE' 

# Choose the language model to use (e.g., 'en-US' for English, 'es-ES' for Spanish)
SELECTED_LANGUAGE = LANGUAGE_GERMAN  # Change this to LANGUAGE_SPANISH for Spanish

def recognize_speech_from_mic():
    recognizer = sr.Recognizer()

    # Initialize the microphone as the audio source
    with sr.Microphone() as source:
        print("Adjusting for ambient noise... Please wait.")
        recognizer.adjust_for_ambient_noise(source)  # Reduces background noise
        print("Listening... Please speak.")

        try:
            audio = recognizer.listen(source)
            print("Recognizing speech...")
            
            # Recognize speech based on the selected language
            text = recognizer.recognize_google(audio, language=SELECTED_LANGUAGE).lower()
            if "andy" in text:
                print("keyword detected")
            print(f"You said: {text}")
        
        except sr.UnknownValueError:
            print("Sorry, I could not understand the audio.")
        except sr.RequestError:
            print("Sorry, there seems to be an issue with the Google API.")

def main():
    print(f"Using language model: {SELECTED_LANGUAGE}")
    recognize_speech_from_mic()

if __name__ == "__main__":
    main()
