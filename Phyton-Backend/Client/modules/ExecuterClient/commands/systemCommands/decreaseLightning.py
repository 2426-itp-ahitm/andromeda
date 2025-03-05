import screen_brightness_control as sbc

class decreaseLightning: 
    def run(self, params):
        print(sbc.get_brightness())
        if not params:
            print("No brightness level provided.")
            sbc.set_brightness(sbc.get_brightness()[0]-20)
            return
        
        level = params[0]
        level = level.replace("%", "")  # Remove % sign if present
        if isinstance(level, str):
            level = level.lower()
            if level == "max":
                level = 100
            elif level == "min":
                level = 0
            
        try:
            level = int(level)
            if 0 <= level <= 100:
                sbc.set_brightness(sbc.get_brightness()[0]-level)
                print(f"Decreased brightness with {level}%")
            else:
                sbc.set_brightness(sbc.get_brightness()[0]-20)
        except ValueError:
             sbc.set_brightness(sbc.get_brightness()[0]-20)

if __name__ == "__main__":
    level = input("Enter brightness level (0-100) or 'min'/'max': ")
    set_lightning = decreaseLightning()
    set_lightning.run([level])
