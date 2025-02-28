import screen_brightness_control as sbc

class setLightning: 
    def run(self, params):
        if not params:
            print("No brightness level provided.")
            return
        
        level = params[0]
        
        if isinstance(level, str):
            level = level.lower()
            if level == "max":
                level = 100
            elif level == "min":
                level = 0
            
        try:
            level = int(level)
            if 0 <= level <= 100:
                sbc.set_brightness(level)
                print(f"Set brightness to {level}%")
            else:
                print("Please enter a brightness level between 0 and 100.")
        except ValueError:
            print("Invalid input. Enter a number between 0 and 100, or 'min'/'max'.")

if __name__ == "__main__":
    level = input("Enter brightness level (0-100) or 'min'/'max': ")
    set_lightning = SetLightning()
    set_lightning.run([level])
