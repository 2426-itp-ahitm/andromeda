import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from helpers.commandExecuter import commandExecuter
from commandAssosiator import commandAssosiator

if __name__ == "__main__":
    assosiator = commandAssosiator()
    while True:
        try:
            command = int(input("Enter command number (or -1 to exit): "))
            if command == -1:
                break
            params = input("Enter parameters separated by space: ").split()
            assosiator.assosiate(command, params)
        except ValueError:
            print("Invalid input. Please enter a valid command number.")
    
    assosiator.assosiate(command, params)