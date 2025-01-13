import json

class errorListBuilder:
   
    def __init__(self, json_file_path):
        self.actions = self._load_actions_from_file(json_file_path)
    
    def _load_actions_from_file(self, file_path):
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                return json.load(file)
        except FileNotFoundError:
            raise FileNotFoundError(f"File not found: {file_path}")
        except json.JSONDecodeError:
            raise ValueError(f"Invalid JSON in file: {file_path}")
    
    def format_actions(self):
        if not isinstance(self.actions, list):
            raise ValueError("The JSON file must contain a list of actions.")
        formatted_list = [
            f'"{action["prompt"]}" => {action["number"]}' 
            for action in self.actions
            if isinstance(action, dict) and "prompt" in action and "number" in action
        ]
        return "Fehlerliste: ".join(formatted_list)
