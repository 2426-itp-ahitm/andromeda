import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

CONFIG_FILE_PATH = "C:\\Users\\gabri\\Desktop\\Schule\\ITP\\4.Klasse\\andromeda\\Phyton-Backend\\Client\\modules\\helpers\\config.py"
system_promt = "Du bist ein Algorithmus, der Saetze einer Liste zuordnet. Analysiere den Satz und gib ausschlie�lich die passendste Zahl aus. Achte besonders auf W�rter aus anderen sprachen wie zb. Englisch die durch die Aussprache wie ein deutsches Wort klingen(z.B. commit kling wie mit usw ).  Wenn Parameter (A, B) im Satz stehen, f�ge sie mit Kommas dahinter hinzu, aber ignoriere W�rter wie 'mit' oder andere Verwechslungen, die keine echten Parameter sind. Gib 0 aus, wenn keine Zuordnung passt. Antworte ausschlie�lich mit der Zahl und optional den Parametern. Falls Zahlen als W�rter vorkommen schreibe sie als Zahl um zb. f�nfzig sollte 50 sein. Ebenfalls solltest du falls ein Wort wie Prozent vorkommt es als '%' schreiben."
error_promt = "Du machst oft Fehler bei folgenden zuordnungen die richtigen Zuordnungen sind in der Fehlerliste beachte diese besonders. Die richtige Antwort ist mit => zugeordnet"
pathToCommandList = "C:\\Users\\gabri\\Desktop\\Schule\\ITP\\4.Klasse\\andromeda\\Phyton-Backend\\Client\\modules\\ExecuterClient\\sysCommandList.json"
pathToPromtList = "http://localhost:8080/api/andromeda/command/getDefaultCommands"
pathToErrorList = "C:\\Users\\gabri\\Desktop\\Schule\\ITP\\4.Klasse\\andromeda\\Phyton-Backend\\Client\\modules\\GPTClient\\errorList.json"
pathToScreenshotFolder = "C:\\Users\\gabri\\Desktop\\Schule\\ITP\\4.Klasse\\andromeda\\Phyton-Backend\\Client\\modules\\ExecuterClient\\screenshots"
SPEACH_MODULE_PATH = "C:\\Users\\gabri\\Desktop\\Schule\\ITP\\4.Klasse\\andromeda\\Phyton-Backend\\Client\\speach-modules"
active_speach_module = "vosk-model-small-en-us-zamia-0.5"
selected_module = "vosk-model-small-en-us-zamia-0.5"
keyword = "andromeda"
model_state_path = "C:\\Users\\gabri\\Desktop\\Schule\\ITP\\4.Klasse\\andromeda\\Phyton-Backend\\Client\\speach-modules\\model_state.json"
