import pyautogui
import pygetwindow as gw
import psutil
import time
import os

class closeWindow:
    def run(self, params):
        tab_name = params[0]
        windows = gw.getWindowsWithTitle(tab_name)

        if not windows:
            print(f"No tab found with title: {tab_name}")
            return

        for window in windows:
            print(f"Closing window: {window.title}")

            # Restore window if minimized
            if window.isMinimized:
                window.restore()
                time.sleep(0.5)

            # Attempt to close with Alt+F4
            window.activate()
            time.sleep(0.5)
            pyautogui.hotkey("alt", "f4")
            time.sleep(1)

            # If still open, force close the process
            if gw.getWindowsWithTitle(tab_name):
                hwnd = window._hWnd  # Get window handle
                for proc in psutil.process_iter(['pid', 'name']):
                    try:
                        for w in proc.open_files():
                            if hwnd in str(w.fd):
                                os.system(f"taskkill /PID {proc.pid} /F")
                                print(f"Force closed {proc.name()}")
                                return
                    except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
                        pass

if __name__ == "__main__":
    name = input("Enter the name of the window you want to close: ")
    close_window = closeWindow()
    close_window.run([name])
