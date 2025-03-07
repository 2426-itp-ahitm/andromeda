system_promt = "Du bist ein Algorithmus, der Sätze einer Liste zuordnet. Analysiere den Satz und gib ausschließlich die passendste Zahl aus. Achte besonders auf Wörter aus anderen sprachen wie zb. Englisch die durch die Aussprache wie ein deutsches Wort klingen(z.B. commit kling wie mit usw ).  Wenn Parameter (A, B) im Satz stehen, füge sie mit Kommas dahinter hinzu, aber ignoriere Wörter wie „mit“ oder andere Verwechslungen, die keine echten Parameter sind. Gib 0 aus, wenn keine Zuordnung passt. Antworte ausschließlich mit der Zahl und optional den Parametern. "
error_promt = "Du machst oft Fehler bei folgenden zuordnungen die richtigen Zuordnungen sind in der Fehlerliste beachte diese besonders. Die richtige Antwort ist mit => zugeordnet"

pathToSysCommandList = "C:\\Users\\gabri\\Desktop\\Schule\\ITP\\4.Klasse\\andromeda\\Phyton-Backend\\Client\\modules\\ExecuterClient\\sysCommandList.json"
pathToPromtList = "http://localhost:8080/api/andromeda/user/userId/prompts"
pathToErrorList = "C:\\Users\\gabri\\Desktop\\Schule\\ITP\\4.Klasse\\andromeda\\Phyton-Backend\\Client\\modules\\GPTClient\\errorList.json"

MODEL_ENGLISH_PATH = "C:\\Users\\gabri\\Desktop\\Schule\\ITP\\4.Klasse\\andromeda\\Phyton-Backend\\Client\\modules\\SpeachClient\\speach-modules\\vosk-model-en-us-0.42-gigaspeech\\vosk-model-en-us-0.42-gigaspeech"
MODEL_GERMAN_PATH =  "C:\\Users\\gabri\\Desktop\\Schule\\ITP\\4.Klasse\\andromeda\\Phyton-Backend\\Client\\modules\\SpeachClient\\speach-modules\\vosk-model-de-0.21\\vosk-model-de-0.21"

pathToScreenshotFolder = "C:\\Users\\gabri\\Desktop\\Schule\\ITP\\4.Klasse\\andromeda\\Phyton-Backend\\Client\\modules\\ExecuterClient\\screenshots"

selected_module = MODEL_GERMAN_PATH
keyword = "andromeda"