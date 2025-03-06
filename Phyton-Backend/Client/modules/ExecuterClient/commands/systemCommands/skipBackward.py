import ctypes

class skipBackward:
    def run(self):
        VK_MEDIA_PREV_TRACK = 0xB1
        KEYEVENTF_EXTENDEDKEY = 0x0001
        KEYEVENTF_KEYUP = 0x0002
        
        # Simulate key press and release for media previous track
        ctypes.windll.user32.keybd_event(VK_MEDIA_PREV_TRACK, 0, KEYEVENTF_EXTENDEDKEY, 0)
        ctypes.windll.user32.keybd_event(VK_MEDIA_PREV_TRACK, 0, KEYEVENTF_EXTENDEDKEY | KEYEVENTF_KEYUP, 0)
        print("Skipped backward in media playback")

if __name__ == "__main__":
    skipper = skipBackward()
    skipper.run()