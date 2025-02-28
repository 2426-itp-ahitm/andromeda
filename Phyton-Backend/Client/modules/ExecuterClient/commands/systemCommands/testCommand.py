class testCommand:
    def run(self, params):
        import os
        print("Running testCommand")
        print("Params:", params)
        os.system("dir")
