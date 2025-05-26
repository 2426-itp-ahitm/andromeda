
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
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-small-en-us-0.15', '40M', 'English', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-en-us-0.22', '1.8G', 'English', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-en-us-0.22-lgraph', '128M', 'English', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-en-us-0.42-gigaspeech', '2.3G', 'English', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-en-us-daanzu-20200905', '1.0G', 'English', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-en-us-daanzu-20200905-lgraph', '129M', 'English', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-en-us-librispeech-0.2', '845M', 'English', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-small-en-us-zamia-0.5', '49M', 'English', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-en-us-aspire-0.2', '1.4G', 'English', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-en-us-0.21', '1.6G', 'English', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-en-in-0.5', '1G', 'Indian English', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-small-en-in-0.4', '36M', 'Indian English', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-small-cn-0.22', '42M', 'Chinese', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-cn-0.22', '1.3G', 'Chinese', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-cn-kaldi-multicn-0.15', '1.5G', 'Chinese', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-ru-0.42', '1.8G', 'Russian', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-small-ru-0.22', '45M', 'Russian', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-ru-0.22', '1.5G', 'Russian', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-ru-0.10', '2.5G', 'Russian', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-small-fr-0.22', '41M', 'French', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-fr-0.22', '1.4G', 'French', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-small-fr-pguyot-0.3', '39M', 'French', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-fr-0.6-linto-2.2.0', '1.5G', 'French', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-de-0.21', '1.9G', 'German', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-de-tuda-0.6-900k', '4.4G', 'German', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-small-de-zamia-0.3', '49M', 'German', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-small-de-0.15', '45M', 'German', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-small-es-0.42', '39M', 'Spanish', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-es-0.42', '1.4G', 'Spanish', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-small-pt-0.3', '31M', 'Portuguese', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-pt-fb-v0.1.1-20220516_2113', '1.6G', 'Portuguese', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-el-gr-0.7', '1.1G', 'Greek', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-small-tr-0.3', '35M', 'Turkish', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-small-vn-0.4', '32M', 'Vietnamese', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-vn-0.4', '78M', 'Vietnamese', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-small-it-0.22', '48M', 'Italian', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-it-0.22', '1.2G', 'Italian', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-small-nl-0.22', '39M', 'Dutch', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-nl-spraakherkenning-0.6', '860M', 'Dutch', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-nl-spraakherkenning-0.6-lgraph', '100M', 'Dutch', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-small-ca-0.4', '42M', 'Catalan', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-ar-mgb2-0.4', '318M', 'Arabic', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-ar-0.22-linto-1.1.0', '1.3G', 'Arabic', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-small-ar-tn-0.1-linto', '158M', 'Arabic Tunisian', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-ar-tn-0.1-linto', '517M', 'Arabic Tunisian', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-fa-0.42', '1.6G', 'Farsi', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-small-fa-0.42', '53M', 'Farsi', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-fa-0.5', '1G', 'Farsi', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-small-fa-0.5', '60M', 'Farsi', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-tl-ph-generic-0.6', '320M', 'Filipino', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-small-uk-v3-nano', '73M', 'Ukrainian', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-small-uk-v3-small', '133M', 'Ukrainian', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-uk-v3', '343M', 'Ukrainian', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-uk-v3-lgraph', '325M', 'Ukrainian', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-small-kz-0.15', '42M', 'Kazakh', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-kz-0.15', '378M', 'Kazakh', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-small-sv-rhasspy-0.15', '289M', 'Swedish', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-small-ja-0.22', '48M', 'Japanese', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-ja-0.22', '1G', 'Japanese', 0);
INSERT INTO model(name, size, language, precision) VALUES ('vosk-model-small-eo-0.42', '42M', 'Esperanto', 0);

