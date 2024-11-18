import ollama
import helpers
from helpers import config
from helpers import listBuilder
from helpers.listBuilder import listBuilder
from helpers.config import system_promt, pathToPromtList

builder = listBuilder(pathToPromtList)

standartPromt = [
    {
        'role': 'system',
        'content': system_promt
    },
    {
        'role': 'system',
        'content': builder.format_actions()
    }
]

while True:
    user_input = input("Bitte gib deinen Satz ein (oder 'exit', um zu beenden): ")
    if user_input.lower() == 'exit':
        print("Programm beendet.")
        break

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
