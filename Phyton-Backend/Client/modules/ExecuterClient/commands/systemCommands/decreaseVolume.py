import pycaw.pycaw as pycaw
from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume
from comtypes import CLSCTX_ALL
import pycaw.pycaw as pycaw

class decreaseVolume:
    def run(self, params):
        increment = 0
        if not params:
            print("No volume level provided.")
            increment = 20
        else:
            increment = params[0]
            increment = increment.replace("%", "")  # Remove % sign if present
        if isinstance(increment, str):
            increment = increment.lower()
            if increment.__contains__("max"):
                increment = 100
            elif increment.__contains__("min"):
                increment = 0
        
        try:
            increment = int(increment)
            devices = AudioUtilities.GetSpeakers()
            interface = devices.Activate(
                IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
            volume = interface.QueryInterface(IAudioEndpointVolume)
            current_volume = volume.GetMasterVolumeLevelScalar()
            new_volume = current_volume - (increment / 100)
            new_volume = max(0, min(new_volume, 1))  # Ensure volume is between 0 and 1
            volume.SetMasterVolumeLevelScalar(new_volume, None)
            print(f"Decrease volume by {increment}%. New volume is {int(new_volume * 100)}%")
        except ValueError:
            increment = 20
            devices = AudioUtilities.GetSpeakers()
            interface = devices.Activate(
                IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
            volume = interface.QueryInterface(IAudioEndpointVolume)
            current_volume = volume.GetMasterVolumeLevelScalar()
            new_volume = current_volume - (increment / 100)
            new_volume = max(0, min(new_volume, 1))  # Ensure volume is between 0 and 1
            volume.SetMasterVolumeLevelScalar(new_volume, None)
            print(f"Decrease volume by {increment}%. New volume is {int(new_volume * 100)}%")

if __name__ == "__main__":
    increment = input("Enter volume increment (0-100) or 'min'/'max': ")
    increase_volume = decreaseVolume()
    increase_volume.run([increment])