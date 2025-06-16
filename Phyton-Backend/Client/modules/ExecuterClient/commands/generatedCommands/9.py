import os
import subprocess
import json
from pathlib import Path

CACHE_FILE = "file_cache.json"
SPECIAL_FOLDERS = {
    "desktop": str(Path.home() / "Desktop"),
    "downloads": str(Path.home() / "Downloads"),
    "dokumente": str(Path.home() / "Documents"),
    "bilder": str(Path.home() / "Pictures"),
    "musik": str(Path.home() / "Music"),
    "videos": str(Path.home() / "Videos"),
    "papierkorb": "shell:RecycleBinFolder"
}

class findFileOrFolder:
    def __init__(self):
        self.cache = self.load_cache()

    def load_cache(self):
        if os.path.exists(CACHE_FILE):
            with open(CACHE_FILE, "r") as f:
                return json.load(f)
        return {}

    def save_cache(self):
        with open(CACHE_FILE, "w") as f:
            json.dump(self.cache, f)

    def run(self, params):
        name = params[0]
        if name.lower() in self.cache:
            path = self.cache[name.lower()]
            if os.path.exists(path) or path.startswith("shell:"):
                subprocess.run(["explorer", "/select,", path])
                print(f"Opened from cache: {path}")
                return
            else:
                del self.cache[name.lower()]  # Remove invalid path
                self.save_cache()

        # Check special folders
        if name.lower() in SPECIAL_FOLDERS:
            path = SPECIAL_FOLDERS[name]
            subprocess.run(["explorer", path])
            print(f"Opened special folder: {path}")
            return

        search_path = "C:\\"  

        # Iterate over all folders and files in the directory
        for root, dirs, files in os.walk(search_path):
            # Skip the "Recent" folder
            if "Recent" in root:
                continue

            # Check if the name matches exactly or partially (extension omitted)
            if name in dirs:
                folder_path = os.path.join(root, name)
                self.cache[name] = folder_path
                self.save_cache()
                subprocess.run(["explorer", folder_path])
                print(f"Opened folder: {folder_path}")
                return
            for file in files:
                if name in file:  # Matches if the name is part of the file name
                    file_path = os.path.join(root, file)
                    self.cache[name.lower()] = file_path
                    self.save_cache()
                    subprocess.run(["explorer", "/select,", file_path])
                    print(f"Opened file location: {file_path}")
                    return

        print("File or folder not found.")

if __name__ == "__main__":
    name = input("Enter the file or folder name to search: ")
    opener = findFileOrFolder()
    opener.run([name])
