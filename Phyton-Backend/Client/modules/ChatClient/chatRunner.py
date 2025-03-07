import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from chatResponder import chatResponder

def main():
    responder = chatResponder()
    while True:
        user_input = input("You: ")
        if user_input.lower() in ["exit", "quit"]:
            break
        response = responder.generateResponse(user_input)
        print("Bot:", response)


if __name__ == "__main__":
    main()