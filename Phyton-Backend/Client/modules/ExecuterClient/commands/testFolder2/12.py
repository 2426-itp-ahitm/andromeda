import pygetwindow as gw
import pyautogui
import time

class openWindow:
    def run(self, params):
        window_name = params[0]
        windows = gw.getWindowsWithTitle(window_name)
        if not windows:
            print(f"No window found with title containing: {window_name}")
            return

        window = windows[0]  # Take the first matching window
        if window.isMinimized:
            window.restore()
            time.sleep(0.5)
            window.activate()
        time.sleep(0.5)  # Small delay to ensure proper focus
        print(f"Open window: {window.title}")

if __name__ == "__main__":
        window_name = input("Enter the name of the window you want to open: ")
        max_window = openWindow()
        max_window.run([window_name])