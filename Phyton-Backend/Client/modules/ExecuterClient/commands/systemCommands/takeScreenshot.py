import pyautogui
import datetime
import os
import sys
import pygetwindow as gw, win32gui, win32con;
import time
from helpers.config import pathToScreenshotFolder
import ctypes
class takeScreenshot: 
    def run(self, params):
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        directory = pathToScreenshotFolder
        if not os.path.exists(directory):
            os.makedirs(directory)
        
        filename = os.path.join(directory, f"screenshot_{timestamp}.png")
        
        if params:
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
            hwnd = gw.getWindowsWithTitle(window)[0]._hWnd; win32gui.ShowWindow(hwnd, win32con.SW_RESTORE); win32gui.SetForegroundWindow(hwnd)
            ctypes.windll.user32.SetForegroundWindow(window._hWnd)
            time.sleep(0.5)  # Small delay to ensure proper focus
            bbox = (window.left, window.top, window.width, window.height)
            screenshot = pyautogui.screenshot(region=bbox)
            screenshot.save(filename)
            print(f"Screenshot of window '{window.title}' saved as {filename}")
        else:
            screenshot = pyautogui.screenshot()
            screenshot.save(filename)
            print(f"Screenshot saved as {filename}")

if __name__ == "__main__":
    window_name = input("Enter window name (leave empty for full screen): ")
    take_screenshot = takeScreenshot()
    take_screenshot.run([window_name] if window_name else [])