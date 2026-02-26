import requests
import os
from helpers.config import (
    system_promt, error_promt, pathToCommandList, pathToPromtList,
    pathToErrorList, pathToScreenshotFolder, selected_module, keyword, 
    CONFIG_FILE_PATH, BASE_DIR, SPEACH_MODULE_PATH, active_speach_module, model_state_path
)

class OptionManager:
    def __init__(self):
        self.system_prompt = system_promt.replace("\\", "\\\\")
        self.error_prompt = error_promt.replace("\\", "\\\\")
        self.path_to_sys_command_list = pathToCommandList.replace("\\", "\\\\")
        self.path_to_prompt_list = pathToPromtList.replace("\\", "\\\\")
        self.path_to_error_list = pathToErrorList.replace("\\", "\\\\")
        self.path_to_screenshot_folder = pathToScreenshotFolder.replace("\\", "\\\\")
        self.selected_module = selected_module.replace("\\", "\\\\")
        self.keyword = keyword.replace("\\", "\\\\")
        self.CONFIG_FILE_PATH = CONFIG_FILE_PATH.replace("\\", "\\\\")
        self.base_dir = BASE_DIR.replace("\\", "\\\\")
        self.speach_module_path = SPEACH_MODULE_PATH.replace("\\", "\\\\")
        self.active_speach_module = active_speach_module.replace("\\", "\\\\")
        self.model_state_path = model_state_path.replace("\\", "\\\\")

    def _update_config(self):
        with open(CONFIG_FILE_PATH, 'w', encoding='utf-8') as configfile:
            configfile.write(f'import os\n\n')
            configfile.write(f'BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))\n\n')
            configfile.write(f'CONFIG_FILE_PATH = "{self.CONFIG_FILE_PATH}"\n')
            configfile.write(f'system_promt = "{self.system_prompt}"\n')
            configfile.write(f'error_promt = "{self.error_prompt}"\n')
            configfile.write(f'pathToCommandList = "{self.path_to_sys_command_list}"\n')
            configfile.write(f'pathToPromtList = "{self.path_to_prompt_list}"\n')
            configfile.write(f'pathToErrorList = "{self.path_to_error_list}"\n')
            configfile.write(f'pathToScreenshotFolder = "{self.path_to_screenshot_folder}"\n')
            configfile.write(f'SPEACH_MODULE_PATH = "{self.speach_module_path}"\n')
            configfile.write(f'active_speach_module = "{self.active_speach_module}"\n')
            configfile.write(f'selected_module = "{self.active_speach_module}"\n')
            configfile.write(f'keyword = "{self.keyword}"\n')
            configfile.write(f'model_state_path = "{self.model_state_path}"\n')
            configfile.write(f'pathToPersonalisedPromtList = "http://localhost:8080/api/andromeda/command/getCommandsByUser/1"\n')
            
      
    def _set_value_from_url(self, attribute, url):
        try:
            response = requests.get(url)
            json_data = response.json()
            value = json_data.get("value", url)
        except requests.RequestException:
            value = url
        setattr(self, attribute, value)
        self._update_config()

    def set_system_prompt(self, url):
        self._set_value_from_url('system_prompt', url)

    def set_error_prompt(self, url):
        self._set_value_from_url('error_prompt', url)

    def set_path_to_sys_command_list(self, url):
        self._set_value_from_url('path_to_sys_command_list', url)

    def set_path_to_prompt_list(self, url):
        self._set_value_from_url('path_to_prompt_list', url)

    def set_path_to_error_list(self, url):
        self._set_value_from_url('path_to_error_list', url)

    def set_path_to_screenshot_folder(self, url):
        self._set_value_from_url('path_to_screenshot_folder', url)

    def set_selected_module(self, url):
        self._set_value_from_url('selected_module', url)

    def set_keyword(self, url):
        self._set_value_from_url('keyword', url)

    def set_speach_module_path(self, url):
        self._set_value_from_url('speach_module_path', url)

    def set_active_speach_module(self, url):
        self._set_value_from_url('active_speach_module', url)

    def set_base_dir(self, url):
        self._set_value_from_url('base_dir', url)
    
    def set_model_state_path(self, url):
        self._set_value_from_url('model_state_path', url)
    