class commandExecuter:
    def __init__(self):
        self.cls = None
    def execute(self, cls, params = [] ):
        self.cls = cls
        instance = self.cls()
        if hasattr(instance, 'run') and callable(getattr(instance, 'run')):
            instance.run(params)
        else:
            raise AttributeError(f"The class {self.cls.__name__} does not have a callable 'run' method.")



