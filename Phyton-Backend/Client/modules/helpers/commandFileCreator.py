import os

class commandFileCreator:
    def __init__(self):
        pass

    def write_code(self, code: str, folder_path: str, filename: str):
        if not filename.endswith(".py"):
            filename += ".py"

        # Combine folder and filename
        filepath = os.path.join(os.path.abspath(folder_path), filename)

        # Ensure the folder exists
        os.makedirs(os.path.dirname(filepath), exist_ok=True)

        try:
            with open(filepath, 'w', encoding='utf-8') as file:
                file.write(code)
            print(f"Code successfully written to {filepath}")
        except Exception as e:
            print(f"Error writing file: {e}")
