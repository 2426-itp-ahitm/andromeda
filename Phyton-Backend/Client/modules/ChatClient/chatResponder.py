import requests
import json
from helpers.key import key,realm

class chatResponder(): 

    def __init__(self):
        self.standartPromt = [
            ["system", "antworte kurz und prägnant"],
            ["system", "du bist ein Chatbot namens Andromeda"],
        ]
    
    def generateResponse(self, user_input):
        url = "https://nexusdev.winkk.ai/streamChat"
        headers = {
            "api-key": key,  # Replace with your actual API key
            "Content-Type": "application/json"
        }
        payload = {
            "realm_id": realm,  # Replace with your actual realm ID
            "prompt": f'"{user_input}"',
            "history":  self.standartPromt,
            "system_prompt":""
        }

        response = requests.post(url, headers=headers, json=payload, stream=True)
        
        if response.status_code == 200:
            full_response = ""
            for line in response.iter_lines():
                if line:
                    try:
                        data = line.decode('utf-8').replace("data: ", "")
                        json_data = json.loads(data)
                        full_response += json_data["content"]
                    except ValueError:
                        print("Skipping invalid JSON line:", line)
            return full_response
        else:
            print("Request failed with status code:", response.status_code)
            print("Response content:", response.text)
            response.raise_for_status()