import requests
import json
from helpers.listBuilder import listBuilder
from helpers.errorListBuilder import errorListBuilder
from helpers.config import system_promt, pathToPromtList, pathToPersonalisedPromtList, pathToErrorList, error_promt
from helpers.key import key,realm
import google.generativeai as genai
import os

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
        # Configure the API key
        # BEST PRACTICE: Set this in your environment variables: export GOOGLE_API_KEY="your_key"
        # If you must hardcode it for testing, paste your key below:
        genai.configure(api_key="AIzaSyAcF7SpPbPPSWIoexqpgB82O3K_m7ItEOE")

        # Configuration for the model
        generation_config = {
            "temperature": 1,
            "top_p": 0.95,
            "max_output_tokens": 8192,
        }

        # Initialize the model
        # Note: "gemini-1.5-flash" is the current standard. 
        # Use "gemini-2.0-flash-exp" if you specifically need the 2.0 preview.
        model = genai.GenerativeModel(
            model_name="gemini-2.0-flash",
            generation_config=generation_config,
            # You can move self.standartPromt here if it serves as a static system instruction:
            # system_instruction=self.standartPromt 
        )

        # Construct the message content
        # If self.standartPromt is chat history, you might want to look into model.start_chat(history=...)
        # For now, we combine it with the input as context.
        full_prompt = f"{self.standartPromt}\n\nDein Satz ist: \"{user_input}\""

        try:
            # Generate the content
            response = model.generate_content(full_prompt)
            
            # Return the text
            print(f"Generated Response: {response.text}")
            return response.text
            
        except Exception as e:
            print(f"Request failed: {e}")
            # Optional: re-raise the error if you want the main program to handle it
            # raise e 
            return None