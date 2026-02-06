import json
from helpers.listLoader import listLoader
from helpers.commandFileCreator import commandFileCreator
from helpers.config import pathToCommandList

class listBuilder: 
    def __init__(self, defURL, persURL):
        list_loader = listLoader()
        self.creator = commandFileCreator()
        
        self.defaultCommands = list_loader.getStandartURL(defURL)
        if not isinstance(self.defaultCommands, list):
            self.defaultCommands = []
        
        if persURL:
            self.personalisedCommands = list_loader.getStandartURL(persURL)
            if not isinstance(self.personalisedCommands, list):
                self.personalisedCommands = []
        else:
            self.personalisedCommands = []
        
    def _load_actions_from_file(self, file_path):
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                return json.load(file)
        except FileNotFoundError:
            raise FileNotFoundError(f"File not found: {file_path}")
    
    def format_actions(self):
        if not isinstance(self.defaultCommands, list):
            raise ValueError("The JSON file must contain a list of actions.")
        
        if len(self.defaultCommands) == 0:
            print("Warning: No default commands loaded")
            return "Liste: ()"
        
        if not all(isinstance(action, dict) and "prompt" in action and "id" in action and "code" in action for action in self.defaultCommands):
            raise ValueError("Each action must be a dictionary containing 'prompt', 'id', and 'code' keys.")
        
        assosiateList = []
        all_commands = []
        
        # Process default commands
        max_default_id = 0
        print(f"Default Commands: {len(self.defaultCommands)} commands loaded")
        for action in self.defaultCommands:
            prompt = action["prompt"]
            id = action["id"]
            max_default_id = max(max_default_id, id)
            assosiateList.append(str(id) + ": " + prompt)
            self.creator.write_code(filename=str(id), code=action["code"], folder_path=r'C:\Users\gabri\Desktop\Schule\ITP\4.Klasse\andromeda\Phyton-Backend\Client\modules\ExecuterClient\commands\generatedCommands')
            all_commands.append(action)
        
        # Process personalised commands with offset IDs
        if isinstance(self.personalisedCommands, list) and len(self.personalisedCommands) > 0:
            print(f"Personalised Commands: {len(self.personalisedCommands)} commands loaded")
            
            if not all(isinstance(action, dict) and "prompt" in action and "code" in action for action in self.personalisedCommands):
                print("Warning: Some personalised commands are malformed, skipping them")
            else:
                id_offset = max_default_id + 1
                for index, action in enumerate(self.personalisedCommands):
                    if isinstance(action, dict) and "prompt" in action and "code" in action:
                        prompt = action["prompt"]
                        new_id = id_offset + index
                        assosiateList.append(str(new_id) + ": " + prompt)
                        command_copy = action.copy()
                        command_copy["id"] = new_id
                        self.creator.write_code(filename=str(new_id), code=action["code"], folder_path=r'C:\Users\gabri\Desktop\Schule\ITP\4.Klasse\andromeda\Phyton-Backend\Client\modules\ExecuterClient\commands\generatedCommands')
                        all_commands.append(command_copy)
        else:
            print("Personalised Commands: No custom commands loaded")
        
        with open(pathToCommandList, 'w', encoding='utf-8') as f:
            json.dump(all_commands, f, indent=4, ensure_ascii=False)
                        
        return f"Liste: ({', '.join(assosiateList)})"