import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

CONFIG_FILE_PATH = "C:\\Users\\gabri\\Desktop\\Schule\\ITP\\4.Klasse\\andromeda\\Phyton-Backend\\Client\\modules\\helpers\\config.py"
system_promt = "Du bist ein Algorithmus, der Saetze einer Liste zuordnet. Analysiere den Satz und gib ausschlieï¿½lich die passendste Zahl aus. Achte besonders auf Wï¿½rter aus anderen sprachen wie zb. Englisch die durch die Aussprache wie ein deutsches Wort klingen(z.B. commit kling wie mit usw ).  Wenn Parameter (A, B) im Satz stehen, fï¿½ge sie mit Kommas dahinter hinzu, aber ignoriere Wï¿½rter wie 'mit' oder andere Verwechslungen, die keine echten Parameter sind. Gib 0 aus, wenn keine Zuordnung passt. Antworte ausschlieï¿½lich mit der Zahl und optional den Parametern. Falls Zahlen als Wï¿½rter vorkommen schreibe sie als Zahl um zb. fï¿½nfzig sollte 50 sein. Ebenfalls solltest du falls ein Wort wie Prozent vorkommt es als '%' schreiben."
error_promt = "Du machst oft Fehler bei folgenden zuordnungen die richtigen Zuordnungen sind in der Fehlerliste beachte diese besonders. Die richtige Antwort ist mit => zugeordnet"
pathToCommandList = "C:\\Users\\gabri\\Desktop\\Schule\\ITP\\4.Klasse\\andromeda\\Phyton-Backend\\Client\\modules\\ExecuterClient\\sysCommandList.json"
pathToPromtList = "http://localhost:8080/api/andromeda/command/getDefaultCommands"
pathToErrorList = "C:\\Users\\gabri\\Desktop\\Schule\\ITP\\4.Klasse\\andromeda\\Phyton-Backend\\Client\\modules\\GPTClient\\errorList.json"
pathToScreenshotFolder = "C:\\Users\\gabri\\Desktop\\Schule\\ITP\\4.Klasse\\andromeda\\Phyton-Backend\\Client\\modules\\ExecuterClient\\screenshots"
SPEACH_MODULE_PATH = "C:\\Users\\gabri\\Desktop\\Schule\\ITP\\4.Klasse\\andromeda\\Phyton-Backend\\Client\\speach-modules"
active_speach_module = "vosk-model-de-0.21"
pathToPersonalisedPromtList = "http://localhost:8080/api/andromeda/command/getCommandsByUser/1"
selected_module = "vosk-model-de-0.21"
keyword = "andromeda"
model_state_path = "C:\\Users\\gabri\\Desktop\\Schule\\ITP\\4.Klasse\\andromeda\\Phyton-Backend\\Client\\speach-modules\\model_state.json"
