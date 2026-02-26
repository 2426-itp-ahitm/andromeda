import requests
import json
from helpers.listBuilder import listBuilder
from helpers.errorListBuilder import errorListBuilder
from helpers.config import system_promt, pathToPromtList, pathToPersonalisedPromtList, pathToErrorList, error_promt
from helpers.key import key,realm



class responseAssosiator(): 
    assosListBuilder = None
    errListBuilder = None
    standartPromt = None

    def __init__(self):
        self.assosListBuilder = listBuilder(defURL=pathToPromtList, persURL=pathToPersonalisedPromtList)
        self.errListBuilder = errorListBuilder(pathToErrorList)
        self.standartPromt = [
            ["system", system_promt],
            ["system", self.assosListBuilder.format_actions()],
            ["system", error_promt + str(self.errListBuilder.format_actions())]
        ]


    def generateResponse(self, user_input):
        url = "https://dev.api.winkk.ai/streamChat"
        headers = {
            "api-key": key,  # Replace with your actual API key
            "Content-Type": "application/json"
        }
        payload = {
            "realm_id": realm,  # Replace with your actual realm ID
            "prompt": f'Dein Satz ist: "{user_input}"',
            "history":  self.standartPromt,
            "system_prompt":""
        }

        response = requests.post(url, headers=headers, json=payload, stream=True)
        print("Request sent to Winkk API, awaiting response...")
        if response.status_code == 200:
            print("Response received from Winkk API, processing...")
            full_response = ""
            for line in response.iter_lines(decode_unicode=True):
                # Skip empty lines and ping heartbeats
                if not line or not line.startswith("data:"):
                    continue
                try:
                    # Remove "data: " prefix and parse JSON
                    json_data = json.loads(line[6:])  # [6:] skips "data: "
                    full_response += json_data.get("content", "")
                except json.JSONDecodeError:
                    # Skip lines that aren't valid JSON
                    continue
            return full_response
        else:
            print("Request failed with status code:", response.status_code)
            print("Response content:", response.text)
            response.raise_for_status()


