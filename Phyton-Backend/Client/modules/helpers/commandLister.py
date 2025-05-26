import json
class commandLister:
        def __init__(self, command_list_file, custom_list_file):
            with open(command_list_file, 'r') as file:
                self.commands = json.load(file)
            with open(custom_list_file, 'r') as file:
                self.custom_commands = json.load(file)

        def get_default_command(self, number):
        
            return self.commands.get(str(number), None)
        

        def get_custom_command(self, number):
            return self.custom_commands.get(str(number-len(self.commands)), None)