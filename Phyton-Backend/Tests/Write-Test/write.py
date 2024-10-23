import subprocess
import time

# Path to the text file
file_path = "protocol_log.txt"

# Ensure the file exists
with open(file_path, 'w') as f:
    f.write("Starting protocol log...\n")

# Open Sublime Text with the file
subprocess.Popen(['C:/Program Files/Sublime Text/sublime_text.exe', file_path])

# Append 'Hello' to the file every 2 seconds
while True:
    with open(file_path, 'a') as f:  # 'a' mode appends to the file
        f.write("Hello\n")
    time.sleep(2)
