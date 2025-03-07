import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import json
from helpers.config import  pathToErrorList
from responseAssosiator import responseAssosiator

assosiator = responseAssosiator()
originalUserInput = ""

while True:
    user_input = input("Bitte gib deinen Satz ein: ")
    originalUserInput = user_input
    print(assosiator.generateResponse(user_input))
    user_input = input("Stimmt diese Angabe? (J/N)")
    if user_input.lower() == 'j':
        print("")
    else:
        user_input = input("Welche Zahl sollte es sein?")
        new_entry = {
            "prompt": originalUserInput,
            "number": user_input
        }
        with open(pathToErrorList, "r", encoding="utf-8") as file:
            data = json.load(file)
        data.append(new_entry)
        with open(pathToErrorList, "w", encoding="utf-8") as file:
            json.dump(data, file, indent=4, ensure_ascii=False)
        print("correction was added to prompt")