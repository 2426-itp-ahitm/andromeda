# Configuration Options Documentation

## CONFIG_FILE_PATH
- **Description**: The file path to the configuration file itself.
- **Value**:  
  `C:\\Users\\gabri\\Desktop\\Schule\\ITP\\4.Klasse\\andromeda\\Phyton-Backend\\Client\\modules\\helpers\\config.py`
- **Purpose**: Used to locate and update the configuration file when changes are made programmatically.

---

## system_promt
- **Description**: The system prompt used by the GPT-based response generator.
- **Value**:  
  `"Du bist ein Algorithmus, der Sätze einer Liste zuordnet. Analysiere den Satz und gib ausschließlich die passendste Zahl aus. Achte besonders auf Wörter aus anderen sprachen wie zb. Englisch die durch die Aussprache wie ein deutsches Wort klingen(z.B. commit kling wie mit usw ).  Wenn Parameter (A, B) im Satz stehen, füge sie mit Kommas dahinter hinzu, aber ignoriere Wörter wie „mit“ oder andere Verwechslungen, die keine echten Parameter sind. Gib 0 aus, wenn keine Zuordnung passt. Antworte ausschließlich mit der Zahl und optional den Parametern. Falls Zahlen als Wörter vorkommen schreibe sie als Zahl um zb. fünfzig sollte 50 sein. Ebenfalls solltest du falls ein Wort wie Prozent vorkommt es als '%' schreiben."`
- **Purpose**: Provides the GPT model with specific instructions on how to process and respond to user input.

---

## error_promt
- **Description**: An additional prompt for the GPT model to handle common errors.
- **Value**:  
  `"Du machst oft Fehler bei folgenden zuordnungen die richtigen Zuordnungen sind in der Fehlerliste beachte diese besonders. Die richtige Antwort ist mit => zugeordnet"`
- **Purpose**: Helps the GPT model avoid common mistakes by referencing a predefined error list.

---

## pathToSysCommandList
- **Description**: The file path to the system command list JSON file.
- **Value**:  
  `C:\\Users\\gabri\\Desktop\\Schule\\ITP\\4.Klasse\\andromeda\\Phyton-Backend\\Client\\modules\\ExecuterClient\\sysCommandList.json`
- **Purpose**: Stores a list of system commands that can be executed by the `ExecuterClient` module.

---

## pathToPromtList
- **Description**: The URL to fetch user-defined prompts.
- **Value**:  
  `http://localhost:8080/api/andromeda/user/userId/prompts`
- **Purpose**: Provides a dynamic source for user-defined prompts, allowing the system to fetch updated prompts from a backend API.

---

## pathToErrorList
- **Description**: The file path to the error list JSON file.
- **Value**:  
  `C:\\Users\\gabri\\Desktop\\Schule\\ITP\\4.Klasse\\andromeda\\Phyton-Backend\\Client\\modules\\GPTClient\\errorList.json`
- **Purpose**: Contains a list of known errors and their corrections, used by the `errorListBuilder` and `responseAssosiator` classes to improve GPT responses.

---

## MODEL_ENGLISH_PATH
- **Description**: The file path to the English speech recognition model.
- **Value**:  
  `C:\\Users\\gabri\\Desktop\\Schule\\ITP\\4.Klasse\\andromeda\\Phyton-Backend\\Client\\modules\\SpeachClient\\speach-modules\\vosk-model-en-us-0.42-gigaspeech\\vosk-model-en-us-0.42-gigaspeech`
- **Purpose**: Used by the `SpeachClient` module for English speech-to-text processing.

---

## MODEL_GERMAN_PATH
- **Description**: The file path to the German speech recognition model.
- **Value**:  
  `C:\\Users\\gabri\\Desktop\\Schule\\ITP\\4.Klasse\\andromeda\\Phyton-Backend\\Client\\modules\\SpeachClient\\speach-modules\\vosk-model-de-0.21\\vosk-model-de-0.21`
- **Purpose**: Used by the `SpeachClient` module for German speech-to-text processing.

---

## pathToScreenshotFolder
- **Description**: The file path to the folder where screenshots are stored.
- **Value**:  
  `C:\\Users\\gabri\\Desktop\\Schule\\ITP\\4.Klasse\\andromeda\\Phyton-Backend\\Client\\modules\\ExecuterClient\\screenshots`
- **Purpose**: Used by the `ExecuterClient` module to save screenshots taken during command execution.

---

## selected_module
- **Description**: The currently selected speech recognition model.
- **Value**:  
  `C:\\Users\\gabri\\Desktop\\Schule\\ITP\\4.Klasse\\andromeda\\Phyton-Backend\\Client\\modules\\SpeachClient\\speach-modules\\vosk-model-de-0.21\\vosk-model-de-0.21`
- **Purpose**: Determines which speech recognition model (English or German) is currently active.

---

## keyword
- **Description**: The keyword used to trigger specific actions or commands.
- **Value**:  
  `"andromeda"`
- **Purpose**: Acts as a trigger word for the system to recognize and execute commands.