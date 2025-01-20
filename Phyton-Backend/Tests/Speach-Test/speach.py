import pyttsx3

# Initialize the text-to-speech engine
engine = pyttsx3.init()

# Set the text you want to say
text = "Hello, I am a text-to-speech engine."

# Use the engine to say the text
engine.say(text)

# Wait for the speech to finish
engine.runAndWait()