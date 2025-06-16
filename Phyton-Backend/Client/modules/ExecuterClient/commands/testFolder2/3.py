import subprocess
import os
import winreg
import win32com.client
import json

class openProgramm:

    COMMON_INSTALL_LOCATIONS = [
        "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs",
        "C:\\Users\\%USERNAME%\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs"
    ]

    json_file_path = "knownPaths.json"

    with open(json_file_path, "r") as f:
        data = json.load(f)

    KNOWN_APPS = {}
    for app_name, app_path in data["known_applications"].items():
        app_path = app_path.replace("%USERNAME%", os.getenv("USERNAME"))
        KNOWN_APPS[app_name] = app_path

    def run(self, params):
        app_name = params[0]
        app_name = app_name.strip().lower()
        self.open_application(app_name)

    def get_install_path_from_where(self, app_name):
        try:
            result = subprocess.run(["where", app_name], capture_output=True, text=True, check=True)
            paths = result.stdout.strip().split("\n")
            return paths[0] if paths else None
        except subprocess.CalledProcessError:
            return None

    def resolve_shortcut(self, shortcut_path):
        shell = win32com.client.Dispatch("WScript.Shell")
        shortcut = shell.CreateShortcut(shortcut_path)
        return shortcut.TargetPath

    def search_common_install_paths(self, app_name):
        for base_dir in self.COMMON_INSTALL_LOCATIONS:
            base_dir = os.path.expandvars(base_dir)
            if os.path.exists(base_dir):
                for root, dirs, files in os.walk(base_dir):
                    for file in files:
                        if file.lower().endswith(".lnk") and app_name.lower() in file.lower():
                            shortcut_path = os.path.join(root, file)
                            resolved_path = self.resolve_shortcut(shortcut_path)
                            if resolved_path:
                                return resolved_path
        return None

    def get_install_path_from_registry(self, app_name):
        registry_paths = [
            "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall",
            "SOFTWARE\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall"
        ]
        for reg_path in registry_paths:
            try:
                with winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, reg_path) as reg:
                    for i in range(winreg.QueryInfoKey(reg)[0]):
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
            except Exception:
                continue
        return None

    def get_installation_path(self, app_name):
        print(f"Searching for '{app_name}'...\n")
        if app_name in self.KNOWN_APPS:
            path = os.path.expandvars(self.KNOWN_APPS[app_name])
            print(f"Known app found: {path}")
            return path
        path = self.get_install_path_from_where(app_name)
        if path:
            print(f"Found via where.exe: {path}")
            return path
        path = self.search_common_install_paths(app_name)
        if path:
            print(f"Found via common paths: {path}")
            return path
        path = self.get_install_path_from_registry(app_name)
        if path:
            print(f"Found via registry: {path}")
            return path
        return None

    def open_application(self, app_name):
        path = self.get_installation_path(app_name)
        if path:
            print(f"Path before checking: {path}")
            path = os.path.expandvars(path)
            if os.path.isfile(path):
                print(f"Opening: {path}")
                try:
                    subprocess.Popen(path, shell=True)
                except Exception as e:
                    print(f"Error opening application: {e}")
            else:
                print("Error: path does not point to a valid executable.")
        else:
            print("Application not found.")
