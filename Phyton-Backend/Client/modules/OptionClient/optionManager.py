import requests
from helpers.config import (
    system_promt, error_promt, pathToSysCommandList, pathToPromtList,
    pathToErrorList, MODEL_ENGLISH_PATH, MODEL_GERMAN_PATH,
    pathToScreenshotFolder, selected_module, keyword, CONFIG_FILE_PATH
)

class OptionManager:
    def __init__(self):
        self.system_prompt = system_promt.replace("\\", "\\\\")
        self.error_prompt = error_promt.replace("\\", "\\\\")
        self.path_to_sys_command_list = pathToSysCommandList.replace("\\", "\\\\")
        self.path_to_prompt_list = pathToPromtList.replace("\\", "\\\\")
        self.path_to_error_list = pathToErrorList.replace("\\", "\\\\")
        self.model_english_path = MODEL_ENGLISH_PATH.replace("\\", "\\\\")
        self.model_german_path = MODEL_GERMAN_PATH.replace("\\", "\\\\")
        self.path_to_screenshot_folder = pathToScreenshotFolder.replace("\\", "\\\\")
        self.selected_module = selected_module.replace("\\", "\\\\")
        self.keyword = keyword.replace("\\", "\\\\")
        self.CONFIG_FILE_PATH = CONFIG_FILE_PATH.replace("\\", "\\\\")


    def _update_config(self):
        with open(CONFIG_FILE_PATH, 'w') as configfile:
            configfile.write(f'CONFIG_FILE_PATH = "{self.CONFIG_FILE_PATH}"\n')
            configfile.write(f'system_promt = "{self.system_prompt}"\n')
            configfile.write(f'error_promt = "{self.error_prompt}"\n')
            configfile.write(f'pathToSysCommandList = "{self.path_to_sys_command_list}"\n')
            configfile.write(f'pathToPromtList = "{self.path_to_prompt_list}"\n')
            configfile.write(f'pathToErrorList = "{self.path_to_error_list}"\n')
            configfile.write(f'MODEL_ENGLISH_PATH = "{self.model_english_path}"\n')
            configfile.write(f'MODEL_GERMAN_PATH = "{self.model_german_path}"\n')
            configfile.write(f'pathToScreenshotFolder = "{self.path_to_screenshot_folder}"\n')
            configfile.write(f'selected_module = "{self.selected_module}"\n')
            configfile.write(f'keyword = "{self.keyword}"\n')
      

    def _set_value_from_url(self, attribute, url):
        try:
            response = requests.get(url)
            response.raise_for_status()
            value = response.text
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

    def set_model_english_path(self, url):
        self._set_value_from_url('model_english_path', url)

    def set_model_german_path(self, url):
        self._set_value_from_url('model_german_path', url)

    def set_path_to_screenshot_folder(self, url):
        self._set_value_from_url('path_to_screenshot_folder', url)

    def set_selected_module(self, url):
        self._set_value_from_url('selected_module', url)

    def set_keyword(self, url):
        self._set_value_from_url('keyword', url)
