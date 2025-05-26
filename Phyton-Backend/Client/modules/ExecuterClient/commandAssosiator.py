import sys
import os
import importlib
from helpers.commandLister import commandLister
from helpers.commandExecuter import commandExecuter
from helpers.config import pathToSysCommandList, pathToCustomCommandList


class commandAssosiator:
    def __init__(self):
        self.executer = commandExecuter()
        self.lister = commandLister(pathToSysCommandList, pathToCustomCommandList)
    def assosiate(self,number,params):
        command_name = self.lister.get_default_command(number)

        if command_name is None:
            command_name = self.lister.get_custom_command(number)
            if str(command_name).endswith('.py'):
                command_name = command_name[:-3]
            print(f"Command name: {command_name}")
        
        else:
            if str(command_name).endswith('.py'):
                command_name = command_name[:-3]
            command_class_name = f"ExecuterClient.commands.systemCommands.{command_name}.{command_name}"
            module_name, class_name = command_class_name.rsplit('.', 1)
            module = importlib.import_module(module_name)
            command_class = getattr(module, class_name)
            executer = commandExecuter()
            executer.execute(command_class, params=params)
