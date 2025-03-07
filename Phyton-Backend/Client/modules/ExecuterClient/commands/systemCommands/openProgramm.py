import subprocess
import os
import winreg
import win32com.client
import json

class openProgramm: 
    

    COMMON_INSTALL_LOCATIONS = [
        r"C:\ProgramData\Microsoft\Windows\Start Menu\Programs",
        r"C:\Users\%USERNAME%\AppData\Roaming\Microsoft\Windows\Start Menu\Programs"
    ]

    json_file_path = 'knownPaths.json'

    # Load the JSON data from the file
    with open(json_file_path, 'r') as f:
        data = json.load(f)

    # Extract the 'known_applications' and make sure paths with %USERNAME% are correctly formatted
    KNOWN_APPS = {}
    for app_name, app_path in data['known_applications'].items():
        # Replace %USERNAME% with the actual username
        app_path = app_path.replace('%USERNAME%', os.getenv('USERNAME'))
        KNOWN_APPS[app_name] = app_path
    def run(self, params):
        app_name = params[0]
        app_name = app_name.strip().lower()
        self.open_application(app_name)

    def get_install_path_from_where(self, app_name):
        """
        Uses 'where.exe' to find the executable path.
        """
        try:
            result = subprocess.run(["where", app_name], capture_output=True, text=True, check=True)
            paths = result.stdout.strip().split("\n")
            return paths[0] if paths else None  # Return the first found path
        except subprocess.CalledProcessError:
            return None

    def resolve_shortcut(self, shortcut_path):
        """
        Resolves the target of a Windows shortcut (.lnk file).
        """
        shell = win32com.client.Dispatch("WScript.Shell")
        shortcut = shell.CreateShortcut(shortcut_path)
        return shortcut.TargetPath

    def search_common_install_paths(self,app_name):
        """
        Searches common install directories, including the Start Menu, for the application.
        Recursively checks subdirectories for .lnk files and resolves them.
        """
        for base_dir in self.COMMON_INSTALL_LOCATIONS:
            base_dir = os.path.expandvars(base_dir)  # Expand the %USERNAME% variable for user-specific paths
            if os.path.exists(base_dir):
                for root, dirs, files in os.walk(base_dir):
                    # Check for shortcut files (.lnk)
                    for file in files:
                        if file.lower().endswith(".lnk") and app_name.lower() in file.lower():
                            shortcut_path = os.path.join(root, file)
                            resolved_path = self.resolve_shortcut(shortcut_path)
                            if resolved_path:
                                return resolved_path  # Return the target of the shortcut
        return None

    def get_install_path_from_registry(self, app_name):
        """
        Searches the Windows registry for the installation path.
        """
        registry_paths = [
            r"SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall",
            r"SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall"
        ]
        
        for reg_path in registry_paths:
            try:
                with winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, reg_path) as reg:
                    for i in range(winreg.QueryInfoKey(reg)[0]):  # Iterate through subkeys
                        try:
                            subkey_name = winreg.EnumKey(reg, i)
                            with winreg.OpenKey(reg, subkey_name) as subkey:
                                display_name, _ = winreg.QueryValueEx(subkey, "DisplayName")
                                if app_name.lower() in display_name.lower():
                                    install_location, _ = winreg.QueryValueEx(subkey, "InstallLocation")
                                    return install_location if install_location else None
                        except (FileNotFoundError, OSError):
                            continue
            except Exception:
                continue
        
        return None

    def get_installation_path(self,app_name):
        """
        Attempts multiple methods to find an application's installation path.
        """
        print(f"Searching for '{app_name}'...\n")

        # Method 1: Check for known applications first
        if app_name in self.KNOWN_APPS:
            path = os.path.expandvars(self.KNOWN_APPS[app_name])
            print(f"Known app found: {path}")
            return path

        # Method 2: Using 'where.exe'
        path = self.get_install_path_from_where(app_name)
        if path:
            print(f"Found via where.exe: {path}")
            return path

        # Method 3: Search common installation directories (Start Menu and Program Files)
        path = self.search_common_install_paths(app_name)
        if path:
            print(f"Found via common paths: {path}")
            return path

        # Method 4: Registry lookup
        path = self.get_install_path_from_registry(app_name)
        if path:
            print(f"Found via registry: {path}")
            return path

        return None

    def open_application(self,app_name):
        """
        Finds and opens an application by its name.
        """
        path = self.get_installation_path(app_name)
        
        # Check if path is valid
        if path:
            print(f"Path before checking: {path}")
            path = os.path.expandvars(path)  # Ensure %USERNAME% or other variables are expanded
            # Check if the path points to a valid executable
            if os.path.isfile(path):
                print(f"Opening: {path}")
                try:
                    subprocess.Popen(path, shell=True)  # Open the application
                except Exception as e:
                    print(f"Error opening application: {e}")
            else:
                print("Error: path does not point to a valid executable.")
        else:
            print("Application not found.")
