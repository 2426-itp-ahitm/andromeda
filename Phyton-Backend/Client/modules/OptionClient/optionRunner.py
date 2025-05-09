import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))


from optionManager import OptionManager

def main():
    option_manager = OptionManager()
    
    
    # Example usage
    option_manager._set_value_from_url(url="http://localhost:8080/getSettingByUser/1/keyword", attribute="keyword")

if __name__ == "__main__":
    main()