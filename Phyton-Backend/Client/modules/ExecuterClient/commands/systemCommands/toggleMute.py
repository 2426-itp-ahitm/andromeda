import pycaw.pycaw as pycaw
from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume
from comtypes import CLSCTX_ALL

class toggleMute:
    def run(self):
        devices = AudioUtilities.GetSpeakers()
        interface = devices.Activate(
            IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
        volume = interface.QueryInterface(IAudioEndpointVolume)
        
        is_muted = volume.GetMute()
        volume.SetMute(not is_muted, None)
        status = "Muted" if not is_muted else "Unmuted"
        print(f"Volume {status}")

if __name__ == "__main__":
    toggle_mute = ToggleMute()
    toggle_mute.run()
