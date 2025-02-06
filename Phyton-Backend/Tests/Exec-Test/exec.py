class Executor:
    def __init__(self):
        self.cls = None
    def execute(self, cls, params = [] ):
        self.cls = cls
        instance = self.cls()
        if hasattr(instance, 'run') and callable(getattr(instance, 'run')):
            instance.run(params)
        else:
            raise AttributeError(f"The class {self.cls.__name__} does not have a callable 'run' method.")

# Example usage:
class ExampleClass:
    def run(self, params):
        import os
        print("Running ExampleClass")
        print("Params:", params)
        os.system("dir")




executor = Executor()
executor.execute(ExampleClass, params=["param1", "param2"])