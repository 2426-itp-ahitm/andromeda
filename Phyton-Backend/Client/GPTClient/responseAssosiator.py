import ollama
import json
from GPTClient.helpers.listBuilder import listBuilder
from GPTClient.helpers.errorListBuilder import errorListBuilder
from GPTClient.helpers.config import system_promt, pathToPromtList, pathToErrorList

class responseAssosiator(): 
    assosListBuilder = None
    errListBuilder = None
    standartPromt = None

    def __init__(self):
        self.assosListBuilder = listBuilder(pathToPromtList)
        self.errListBuilder = errorListBuilder(pathToErrorList)
        self.standartPromt = [
        {
            'role': 'system',
            'content': system_promt
        },
        {
            'role': 'system',
            'content': self.assosListBuilder.format_actions()
        }, 
        {
            'role': 'system',
            'content':self.errListBuilder.format_actions()
        }
    ]
    
    def generateResponse(self, user_input):
        response = ollama.chat(
            model='gemma2:27b', 
            messages=self.standartPromt + [
                {
                    'role': 'user',
                    'content': f'Dein Satz ist: "{user_input}"'
                }
            ]
        )
        return response['message']['content']