import ollama
response = ollama.chat(model='gemma2:27b', messages=[
  {
    'role': 'user',
    'content': 'Du bist ein Algorithmus, der Sätze einer Liste zuordnet. Analysiere den Satz und gib ausschließlich die passendste Zahl aus. Achte besonders auf Wörter aus anderen sprachen wie zb. Englisch die durch die Aussprache wie ein deutsches Wort klingen(z.B. commit kling wie mit usw ).  Wenn Parameter (A, B) im Satz stehen, füge sie mit Kommas dahinter hinzu, aber ignoriere Wörter wie „mit“ oder andere Verwechslungen, die keine echten Parameter sind. Gib 0 aus, wenn keine Zuordnung passt. Antworte ausschließlich mit der Zahl und optional den Parametern.Liste: (1: "Verschiebe Datei (A) nach (B)", 2: "Schalte den Rechner aus", 3: "Öffne Programm (A)", 4: "git commit") Dein Satz ist: "Führe ein disco mit aus"'
  },
])
print(response['message']['content'])