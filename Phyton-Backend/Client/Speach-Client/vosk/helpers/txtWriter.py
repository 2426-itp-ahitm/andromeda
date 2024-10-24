import subprocess
class txtWriter: 
    selectedFile = ""
    def __init__(self, selectedFile) -> None:
        self.selectedFile = selectedFile
        pass
    def writeInFile(self, text):
        with open(self.selectedFile, 'a') as f:  # 'a' mode appends to the file
            f.write(text+ "\n")
        pass
    def openTextEditor(self):
        subprocess.Popen(['C:/Program Files/Sublime Text/sublime_text.exe', self.selectedFile])
        pass
