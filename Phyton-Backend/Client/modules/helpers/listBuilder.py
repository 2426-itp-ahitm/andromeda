import json
from helpers.listLoader import listLoader
from helpers.commandFileCreator import commandFileCreator
from helpers.config import pathToCommandList

class listBuilder: 
    def __init__(self, defURL,persURL):
        list_loader = listLoader()
        self.creator = commandFileCreator()
        self.defaultCommands = list_loader.getStandartURL(defURL) 
        #self.personalisedCommands = list_loader.getStandartURL(persURL) 
        self.personalisedCommands = {}
        
    def _load_actions_from_file(self, file_path):
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                return json.load(file)
        except FileNotFoundError:
            raise FileNotFoundError(f"File not found: {file_path}")
        except json.JSONDecodeError:
            raise ValueError(f"Invalid JSON in file: {file_path}")
    
    def format_actions(self):
        if not isinstance(self.defaultCommands, list):
            raise ValueError("The JSON file must contain a list of actions.")
        if not all(isinstance(action, dict) and "prompt" in action for action in self.defaultCommands):
            raise ValueError("Each action must be a dictionary containing a 'content' key.")
        
        assosiateList = []
        commands = self.defaultCommands
        print(f"Commands: {commands}")
        for action in commands:
            if isinstance(action, dict) and "prompt" in action:
                prompt = action["prompt"]
                id = action["id"]
                if isinstance(prompt, str):
                    assosiateList.append(str(id) + ": " + prompt)
                    self.creator.write_code(filename=str(id),code=action["code"], folder_path=r'C:\Users\gabri\Desktop\Schule\ITP\4.Klasse\andromeda\Phyton-Backend\Client\modules\ExecuterClient\commands\testFolder2')
                else:
                    raise ValueError("The 'prompt' key must contain a string value.")
            else:
                raise ValueError("Each action must be a dictionary containing a 'prompt' key.")
            
        with open(pathToCommandList, 'w') as f:
                json.dump(commands, f, indent=4)
                        
        return f"Liste: ({', '.join(assosiateList)})"