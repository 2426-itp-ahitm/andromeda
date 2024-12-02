@echo off
REM Überprüfen, ob ein Programmname übergeben wurde
if "%1"=="" (
    echo Bitte gib den Namen des Programms an, das gestartet werden soll.
    exit /b 1
)

REM Versuchen, das Programm zu starten
echo Starte %1...
%1

REM Überprüfen, ob das Programm erfolgreich gestartet wurde
if errorlevel 1 (
    echo Fehler: Das Programm %1 konnte nicht gestartet werden. Stelle sicher, dass es im PATH vorhanden ist.
) else (
    echo Das Programm %1 wurde erfolgreich gestartet.
)
pause
