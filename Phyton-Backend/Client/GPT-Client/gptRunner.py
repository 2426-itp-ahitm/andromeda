import ollama
import json
import helpers
from helpers import config
from helpers import listBuilder
from helpers.listBuilder import listBuilder
from helpers.errorListBuilder import errorListBuilder
from helpers.config import system_promt, pathToPromtList, pathToErrorList

assosListBuilder = listBuilder(pathToPromtList)
errListBuilder = errorListBuilder(pathToErrorList)
originalUserInput = ""
standartPromt = [
    {
        'role': 'system',
        'content': system_promt
    },
    {
        'role': 'system',
        'content': assosListBuilder.format_actions()
    }, 
    {
        'role': 'system',
        'content':errListBuilder.format_actions()
    }
]
while True:
    user_input = input("Bitte gib deinen Satz ein: ")
    originalUserInput = user_input
    response = ollama.chat(
        model='gemma2:27b', 
        messages=standartPromt + [
            {
                'role': 'user',
                'content': f'Dein Satz ist: "{user_input}"'
            }
        ]
    )
    
    print(response['message']['content'])
    user_input = input("Stimmt diese Angabe? (J/N)")
    if user_input.lower() == 'j':
        print("")
    else:
         user_input = input("Welche Zahl sollte es sein?")
         if user_input.isdigit:
            new_entry = {
                "prompt":originalUserInput,
                "number":user_input
            }
            with open(pathToErrorList, "r", encoding="utf-8") as file:
              data = json.load(file)
            data.append(new_entry)
            with open(pathToErrorList, "w", encoding="utf-8") as file:
                json.dump(data, file, indent=4, ensure_ascii=False)
            print("correction was added to prompt")

         else:
             print("no number input")    

