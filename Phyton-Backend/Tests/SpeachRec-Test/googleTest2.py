import speech_recognition as sr

def recognize_speech():
    # Create a recognizer instance
    recognizer = sr.Recognizer()

    # Default language set to English
    current_language = "de-DE"  # "de-DE" for German, "en-US" for English
    
    # Use the microphone as the source
    with sr.Microphone() as source:
        print("Adjusting for ambient noise... Please wait.")
        recognizer.adjust_for_ambient_noise(source, duration=1)  # Adjust for background noise

        keyword_detected = False  # A flag to check if keyword is detected

        print("Listening for the keyword 'andy'...")
        
        while True:
            try:
                audio = recognizer.listen(source, timeout=5)
                print("Recognizing speech...")
                if not keyword_detected:
                    text = recognizer.recognize_google(audio, language=current_language).lower()
                    if "andy" in text:
                        print("Keyword 'andy' detected. Starting active listening...")
                        keyword_detected = True
                else:
                    text = recognizer.recognize_google(audio, language=current_language)
                    if "switch language" in text.lower():
                        if current_language == "en-US":
                            current_language = "de-DE"
                            print("Language switched to German.")
                        else:
                            current_language = "en-US"
                            print("Language switched to English.")
                    else:
                        print(f"You said ({'German' if current_language == 'de-DE' else 'English'}): {text}")
                    
            except sr.UnknownValueError:
                # If speech is unintelligible
                if not keyword_detected:
                    print("Could not understand the audio while waiting for the keyword.")
                else:
                    print("Could not understand the audio.")
            except sr.RequestError as e:
                # If there's a request issue (e.g., no internet for Google API)
                print(f"Could not request results; {e}")
            except sr.WaitTimeoutError:
                # Timeout if no speech is detected
                if keyword_detected:
                    print("Waiting for more input...")
                else:
                    print("Still listening for the keyword 'Andromeda'...")

if __name__ == "__main__":
    recognize_speech()
