import json
class commandLister:
        def __init__(self, command_list_file):
            with open(command_list_file, 'r') as file:
                self.commands = json.load(file)

        def get_commands(self, number):
            return self.commands.get(str(number), None)
        