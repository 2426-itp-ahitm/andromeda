import os

# Get the base directory (where the project root is)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

CONFIG_FILE_PATH = os.path.abspath(__file__)

system_promt = "Du bist ein Algorithmus, der Sätze einer Liste zuordnet. Analysiere den Satz und gib ausschließlich die passendste Zahl aus. Achte besonders auf Wörter aus anderen sprachen wie zb. Englisch die durch die Aussprache wie ein deutsches Wort klingen(z.B. commit kling wie mit usw ).  Wenn Parameter (A, B) im Satz stehen, füge sie mit Kommas dahinter hinzu, aber ignoriere Wörter wie 'mit' oder andere Verwechslungen, die keine echten Parameter sind. Gib 0 aus, wenn keine Zuordnung passt. Antworte ausschließlich mit der Zahl und optional den Parametern. Falls Zahlen als Wörter vorkommen schreibe sie als Zahl um zb. fünfzig sollte 50 sein. Ebenfalls solltest du falls ein Wort wie Prozent vorkommt es als '%' schreiben."
error_promt = "Du machst oft Fehler bei folgenden zuordnungen die richtigen Zuordnungen sind in der Fehlerliste beachte diese besonders. Die richtige Antwort ist mit => zugeordnet"

pathToCommandList = os.path.join(BASE_DIR, "modules", "ExecuterClient", "sysCommandList.json")
pathToPromtList = "http://localhost:8080/api/andromeda/command/getDefaultCommands"
pathToErrorList = os.path.join(BASE_DIR, "modules", "GPTClient", "errorList.json")

MODEL_ENGLISH_PATH = os.path.join(BASE_DIR, "modules", "SpeachClient", "speach-modules", "vosk-model-en-us-0.42-gigaspeech", "vosk-model-en-us-0.42-gigaspeech")
MODEL_GERMAN_PATH = os.path.join(BASE_DIR, "modules", "SpeachClient", "speach-modules", "vosk-model-de-0.21", "vosk-model-de-0.21")

pathToScreenshotFolder = os.path.join(BASE_DIR, "modules", "ExecuterClient", "screenshots")

selected_module = MODEL_GERMAN_PATH
keyword = "andromeda"
