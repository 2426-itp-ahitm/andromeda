import requests
import json
from helpers.listBuilder import listBuilder
from helpers.errorListBuilder import errorListBuilder
from helpers.key import ollama_key
from helpers.config import system_promt, pathToPromtList, pathToPersonalisedPromtList, pathToErrorList, error_promt

class responseAssosiator(): 
    assosListBuilder = None
    errListBuilder = None
    system_messages = None

    def __init__(self):
        # Your Ollama Cloud API Key
        self.api_key = ollama_key
        
        # Ollama Cloud's OpenAI-compatible endpoint
        self.url = "https://ollama.com/v1/chat/completions" 
        
        self.assosListBuilder = listBuilder(defURL=pathToPromtList, persURL=pathToPersonalisedPromtList)
        self.errListBuilder = errorListBuilder(pathToErrorList)
        
        # Structure the system context correctly for the API
        self.system_messages = [
            {"role": "system", "content": system_promt},
            {"role": "system", "content": self.assosListBuilder.format_actions()},
            {"role": "system", "content": f"{error_promt} {self.errListBuilder.format_actions()}"}
        ]

    def generateResponse(self, user_input):
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

        # Combine system messages with the user input
        messages = self.system_messages + [
            {"role": "user", "content": f'Dein Satz ist: "{user_input}"'}
        ]

        payload = {
            "model": "ministral-3:14b-cloud",
            "messages": messages,
            "stream": True
        }

        print("Request sent to Ollama Cloud API, awaiting response...")
        response = requests.post(self.url, headers=headers, json=payload, stream=True)

        if response.status_code == 200:
            full_response = ""
            for line in response.iter_lines(decode_unicode=True):
                # Skip empty lines
                if not line:
                    continue
                
                # Process Server-Sent Events (SSE)
                if line.startswith("data: "):
                    data_str = line[6:].strip()
                    
                    # Stop if the stream is finished
                    if data_str == "[DONE]":
                        break
                    
                    try:
                        chunk = json.loads(data_str)
                        # Safely extract the chunk content 
                        content = chunk.get("choices", [{}])[0].get("delta", {}).get("content", "")
                        full_response += content
                    except json.JSONDecodeError:
                        continue
            
            return full_response
        else:
            print("Request failed with status code:", response.status_code)
            print("Response content:", response.text)
            response.raise_for_status()