import pygetwindow as gw
import time
import ctypes

class maxWindow:
    def run(self, params):
        if not params:
            window = gw.getActiveWindow()
            if not window:
                print("No active window found.")
                return
        else:
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
        window.maximize()  # Properly maximize the window
        ctypes.windll.user32.SetForegroundWindow(window._hWnd)  # Bring the window to the foreground
        print(f"Maximized and activated window: {window.title}")

if __name__ == "__main__":
    window_name = input("Enter the name of the window you want to maximize (leave empty to maximize the current active window): ")
    max_window = maxWindow()
    max_window.run([window_name] if window_name else [])
