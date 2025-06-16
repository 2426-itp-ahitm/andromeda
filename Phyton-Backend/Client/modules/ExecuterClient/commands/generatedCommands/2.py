class shutdown:
    def run(self, params):
        import os
        os.system("shutdown -f -s -t 0")
