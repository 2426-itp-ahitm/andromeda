import json
from helpers.listLoader import listLoader
from helpers.commandFileCreator import commandFileCreator
from helpers.config import pathToSysCommandList, pathToCustomCommandList

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
        
        assosCounter = 0
        assosiateList = []
        defaultCmd = []
        personalisedCmd = []


        counter = 0
        for action in self.personalisedCommands:
                counter += 1
                assosCounter += 1
                assosiateList.append(f'{assosCounter}: "{action["prompt"]}"')   
                personalisedCmd.append(f'{counter}: {counter}.py')
               # self.creator.write_code(filename=str(counter),code=action["code"], folder_path=r'C:\Users\gabri\Desktop\Schule\ITP\4.Klasse\andromeda\Phyton-Backend\Client\modules\ExecuterClient\commands\testFolder2')
        counter = 0
        for action in self.defaultCommands:
                counter += 1
                assosCounter += 1
                assosiateList.append(f'{assosCounter}: "{action["prompt"]}"')   
                defaultCmd.append(f'{counter}: {counter}.py')
              #  self.creator.write_code(filename=str(counter),code=action["code"], folder_path=r'C:\Users\gabri\Desktop\Schule\ITP\4.Klasse\andromeda\Phyton-Backend\Client\modules\ExecuterClient\commands\testFolder')
                
        with open(pathToSysCommandList, 'w') as f:
                json.dump(defaultCmd, f, indent=4)
        with open(pathToCustomCommandList, 'w') as f:
                json.dump(personalisedCmd, f, indent=4)
                     
        return f"Liste: ({', '.join(assosiateList)})"
