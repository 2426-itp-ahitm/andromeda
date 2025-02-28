import pyautogui

class startPlayback: 
    def run(self, params):
        pyautogui.press("playpause")

if __name__ == "__main__":
    pyautogui.press("playpause")