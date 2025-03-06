
import ctypes
class skipForward:
    def run(self, params):
        VK_MEDIA_NEXT_TRACK = 0xB0
        KEYEVENTF_EXTENDEDKEY = 0x0001
        KEYEVENTF_KEYUP = 0x0002
        
        # Simulate key press and release for media next track
        ctypes.windll.user32.keybd_event(VK_MEDIA_NEXT_TRACK, 0, KEYEVENTF_EXTENDEDKEY, 0)
        ctypes.windll.user32.keybd_event(VK_MEDIA_NEXT_TRACK, 0, KEYEVENTF_EXTENDEDKEY | KEYEVENTF_KEYUP, 0)
        print("Skipped forward in media playback")
if __name__ == "__main__":
    skipper = skipForward()
    skipper.run("")
