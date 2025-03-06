import pycaw.pycaw as pycaw
from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume
from comtypes import CLSCTX_ALL

class setVolume:
    def run(self, params):
        if not params:
            print("No volume level provided.")
            return
        
        level = params[0]
        level = level.replace("%", "")  # Remove % sign if present
        if isinstance(level, str):
            level = level.lower()
            if level.__contains__("max"):
                level = 100
            elif level.__contains__("min"):
                level = 0
        
        try:
            level = int(level)
            if 0 <= level <= 100:
                devices = AudioUtilities.GetSpeakers()
                interface = devices.Activate(
                    IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
                volume = interface.QueryInterface(IAudioEndpointVolume)
                volume.SetMasterVolumeLevelScalar(level / 100, None)
                print(f"Set volume to {level}%")
            else:
                print("Please enter a volume level between 0 and 100.")
        except ValueError:
            print("Invalid input. Enter a number between 0 and 100, or 'min'/'max'.")

if __name__ == "__main__":
    level = input("Enter volume level (0-100) or 'min'/'max': ")
    set_volume = setVolume()
    set_volume.run([level])
