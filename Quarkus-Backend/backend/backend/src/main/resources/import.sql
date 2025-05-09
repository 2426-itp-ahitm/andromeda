
-- Funktion und Trigger müssen manuell in einer query console in die Datenbank eingefügt werden. Trigger und Function
-- über inport.sql erstellen funktioniert nicht.
-- todo: das Einfügen der default settins bei Anlegen eines Users muss im Code stattfinden.

/*
CREATE OR REPLACE FUNCTION insert_default_settings()
    RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO dbSetting(name, type, value, user_id)
    VALUES ('pathToSysCommandList', 'string', 'C:\\Users\\gabri\\Desktop\\Schule\\ITP\\4.Klasse\\andromeda\\Phyton-Backend\\Client\\modules\\ExecuterClient\\sysCommandList.json', NEW.id);

    INSERT INTO dbSetting(name, type, value, user_id)
    VALUES ('pathToPromtList', 'string', 'http://localhost:8080/api/andromeda/user/userId/prompts', NEW.id);

    INSERT INTO dbSetting(name, type, value, user_id)
    VALUES ('pathToErrorList', 'string', 'C:\\Users\\gabri\\Desktop\\Schule\\ITP\\4.Klasse\\andromeda\\Phyton-Backend\\Client\\modules\\GPTClient\\errorList.json', NEW.id);

    INSERT INTO dbSetting(name, type, value, user_id)
    VALUES ('MODEL_ENGLISH_PATH', 'string', 'C:\\Users\\gabri\\Desktop\\Schule\\ITP\\4.Klasse\\andromeda\\Phyton-Backend\\Client\\modules\\SpeachClient\\speach-modules\\vosk-model-en-us-0.42-gigaspeech\\vosk-model-en-us-0.42-gigaspeech', NEW.id);

    INSERT INTO dbSetting(name, type, value, user_id)
    VALUES ('MODEL_GERMAN_PATH', 'string', 'C:\\Users\\gabri\\Desktop\\Schule\\ITP\\4.Klasse\\andromeda\\Phyton-Backend\\Client\\modules\\SpeachClient\\speach-modules\\vosk-model-de-0.21\\vosk-model-de-0.21', NEW.id);

    INSERT INTO dbSetting(name, type, value, user_id)
    VALUES ('pathToScreenshotFolder', 'string', 'C:\\Users\\gabri\\Desktop\\Schule\\ITP\\4.Klasse\\andromeda\\Phyton-Backend\\Client\\modules\\ExecuterClient\\screenshots', NEW.id);

    RETURN NEW;
END
$$ LANGUAGE plpgsql;


CREATE TRIGGER trigger_insert_default_settings
    AFTER INSERT ON dbUser
    FOR EACH ROW
EXECUTE FUNCTION insert_default_settings();
*/

insert into command(id, type, prompt, code) values (1, 'default', 'Verschiebe Datei (A) nach (B)', null);
insert into command(id, type, prompt, code) values (2, 'default', 'Schalte den Rechner aus', null);
insert into command(id, type, prompt, code) values (3, 'default', 'Öffne Programm (A)', null);
insert into command(id, type, prompt, code) values (4, 'default', 'Schließe Programm (A)', null);
insert into command(id, type, prompt, code) values (5, 'default', 'Führe ein git commit aus', null);
insert into command(id, type, prompt, code) values (6, 'default', 'Spiel die Wiedergabe', null);
insert into command(id, type, prompt, code) values (7, 'default', 'Pausiere die Wiedergabe', null);
insert into command(id, type, prompt, code) values (8, 'default', 'Komprimiere Datei (A)', null);
insert into command(id, type, prompt, code) values (9, 'default', 'Suche Datei (A)', null);
insert into command(id, type, prompt, code) values (10, 'default', 'Geh in Verzeichnis (A)', null);
insert into command(id, type, prompt, code) values (11, 'default', 'Schalte dich selbst aus', null);
insert into command(id, type, prompt, code) values (12, 'default', 'öffne das Fenster (A)', null);
insert into command(id, type, prompt, code) values (13, 'default', 'schließe das Fenster (A)', null);
insert into command(id, type, prompt, code) values (14, 'default', 'maximiere das Fenster (A)', null);
insert into command(id, type, prompt, code) values (15, 'default', 'minimiere das Fenster (A)', null);
insert into command(id, type, prompt, code) values (16, 'default', 'setze die Lautstärke auf (A)', null);
insert into command(id, type, prompt, code) values (17, 'default', 'stumme die Audio', null);
insert into command(id, type, prompt, code) values (18, 'default', 'setze die Helligkeit auf (A)', null);
insert into command(id, type, prompt, code) values (19, 'default', 'Erhöhe die Helligkeit um (A)', null);
insert into command(id, type, prompt, code) values (20, 'default', 'Mach die Helligkeit niedriger um (A)', null);
insert into command(id, type, prompt, code) values (21, 'default', 'Erhöhe die Lautstärke um (A)', null);
insert into command(id, type, prompt, code) values (22, 'default', 'Mach die Lautstärke niedriger um (A)', null);
insert into command(id, type, prompt, code) values (23, 'default', 'Mache einen Screenshot von (A)', null);
insert into command(id, type, prompt, code) values (24, 'default', 'Nächstes Lied', null);
insert into command(id, type, prompt, code) values (25, 'default', 'Lied zurück', null);
