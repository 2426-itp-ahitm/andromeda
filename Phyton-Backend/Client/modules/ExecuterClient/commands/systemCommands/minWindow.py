import pygetwindow as gw
class minWindow:
    def run(self, params):
        window_name = params[0]
        windows = gw.getWindowsWithTitle(window_name)
        if not windows:
            print(f"No window found with title containing: {window_name}")
            return
        window = windows[0]  # Take the first matching window          
        window.minimize()
        print(f"Minimized window: {window.title}")

if __name__ == "__main__":
        window_name = input("Enter the name of the window you want to min: ")
        max_window = minWindow()
        max_window.run([window_name])