import os
import subprocess
import json
from pathlib import Path

CACHE_FILE = "file_cache.json"
SPECIAL_FOLDERS = {
    "Desktop": str(Path.home() / "Desktop"),
    "Downloads": str(Path.home() / "Downloads"),
    "Dokumente": str(Path.home() / "Documents"),
    "Bilder": str(Path.home() / "Pictures"),
    "Musik": str(Path.home() / "Music"),
    "Videos": str(Path.home() / "Videos"),
    "Papierkorb": "shell:RecycleBinFolder"
}

class openFileOrFolder:
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
    
    def search_and_open(self, name):
        if name in self.cache:
            path = self.cache[name]
            if os.path.exists(path) or path.startswith("shell:"):
                subprocess.run(["explorer", "/select,", path])
                print(f"Opened from cache: {path}")
                return
            else:
                del self.cache[name]  # Remove invalid path
                self.save_cache()
        
        # Check special folders
        if name in SPECIAL_FOLDERS:
            path = SPECIAL_FOLDERS[name]
            subprocess.run(["explorer", path])
            print(f"Opened special folder: {path}")
            return
        
        search_path = "C:\\"  # Change this to the root directory you want to search in
        
        # Iterate over all folders and files in the directory
        for root, dirs, files in os.walk(search_path):
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
                    self.cache[name] = file_path
                    self.save_cache()
                    subprocess.run(["explorer", "/select,", file_path])
                    print(f"Opened file location: {file_path}")
                    return
        
        print("File or folder not found.")

if __name__ == "__main__":
    name = input("Enter the file or folder name to search: ")
    opener = openFileOrFolder()
    opener.search_and_open(name)
