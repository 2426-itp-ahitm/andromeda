import importlib
from helpers.commandLister import commandLister
from helpers.commandExecuter import commandExecuter
from helpers.config import pathToCommandList


class commandAssosiator:
    def __init__(self):
        self.executer = commandExecuter()
        self.lister = commandLister(pathToCommandList)
        
    def assosiate(self,number,params):
        command_name = str(number)
        if str(command_name).endswith('.py'):
            command_name = command_name[:-3]
            
        module_path = f"ExecuterClient.commands.generatedCommands.{command_name}"
        module = importlib.import_module(module_path)
        # Get the first class defined in the module
        command_class = None
        for attr_name in dir(module):
            attr = getattr(module, attr_name)
            if isinstance(attr, type):  # Check if it's a class
                command_class = attr
                break
        if command_class:
            print("EXEC" + command_class.__name__)
            executer = commandExecuter()
            executer.execute(command_class, params=params)
        else:
            raise ValueError(f"No class found in module {module_path}")
