import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from optionManager import OptionManager

def main():
    option_manager = OptionManager()
    
    # Define attributes with their numbers
    attributes = {
        '1': 'keyword',
        '2': 'selected_module',
        '3': 'MODEL_GERMAN_PATH',
        '4': 'MODEL_ENGLISH_PATH',
        '5': 'CONFIG_FILE_PATH',
        '6': 'pathToSysCommandList',
        '7': 'pathToPromtList',
        '8': 'pathToErrorList',
        '9': 'pathToScreenshotFolder'
    }
    
    valid_attributes = {
        'keyword': str,
        'selected_module': str,
        'MODEL_GERMAN_PATH': str,
        'MODEL_ENGLISH_PATH': str,
        'CONFIG_FILE_PATH': str,
        'pathToSysCommandList': str,
        'pathToPromtList': str,
        'pathToErrorList': str,
        'pathToScreenshotFolder': str
    }
    
    print("Welcome to the Option Manager!")
    print("\nAvailable attributes:")
    for num, attr in attributes.items():
        print(f"{num}. {attr}")
    
    while True:
        try:
            input_value = input("\nEnter the number or name of the attribute you want to set (or 'q' to quit): ").lower()
            
            if input_value == 'q':
                print("Goodbye!")
                break
            
            # Check if input is a number
            if input_value in attributes:
                attribute = attributes[input_value]
            else:
                attribute = input_value
                
            if attribute not in valid_attributes:
                print("Invalid attribute! Please choose from the list above.")
                continue
                
            value = input(f"Enter the value for {attribute}: ")
            
            # Convert value to appropriate type
            try:
                value = valid_attributes[attribute](value)
            except ValueError:
                print(f"Error: Invalid value type for {attribute}")
                continue
            
            option_manager._set_value_from_url(url=value, attribute=attribute)
            print(f"Successfully set {attribute} to {value}")
            
        except Exception as e:
            print(f"Error: {str(e)}")
            continue

if __name__ == "__main__":
    main()