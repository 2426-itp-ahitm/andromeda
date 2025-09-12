
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
/*
insert into command(id, type, prompt, code) values (1, 'default', 'Verschiebe Datei (A) nach (B)', 'testCode1');
insert into command(id, type, prompt, code) values (2, 'default', 'Schalte den Rechner aus', 'testCode2');
insert into command(id, type, prompt, code) values (3, 'default', 'Öffne Programm (A)', 'testCode3');
insert into command(id, type, prompt, code) values (4, 'default', 'Schließe Programm (A)', 'testCode4');
insert into command(id, type, prompt, code) values (5, 'default', 'Führe ein git commit aus', 'testCode5');
insert into command(id, type, prompt, code) values (6, 'default', 'Spiel die Wiedergabe', 'testCode6');
insert into command(id, type, prompt, code) values (7, 'default', 'Pausiere die Wiedergabe', 'testCode7');
insert into command(id, type, prompt, code) values (8, 'default', 'Komprimiere Datei (A)', 'testCode8');
insert into command(id, type, prompt, code) values (9, 'default', 'Suche Datei (A)', 'testCode9');
insert into command(id, type, prompt, code) values (10, 'default', 'Geh in Verzeichnis (A)', 'testCode10');
insert into command(id, type, prompt, code) values (11, 'default', 'Schalte dich selbst aus', 'testCode11');
insert into command(id, type, prompt, code) values (12, 'default', 'öffne das Fenster (A)', 'testCode12');
insert into command(id, type, prompt, code) values (13, 'default', 'schließe das Fenster (A)', 'testCode13');
insert into command(id, type, prompt, code) values (14, 'default', 'maximiere das Fenster (A)', 'testCode14');
insert into command(id, type, prompt, code) values (15, 'default', 'minimiere das Fenster (A)', 'testCode15');
insert into command(id, type, prompt, code) values (16, 'default', 'setze die Lautstärke auf (A)', 'testCode16');
insert into command(id, type, prompt, code) values (17, 'default', 'stumme die Audio', 'testCod17e');
insert into command(id, type, prompt, code) values (18, 'default', 'setze die Helligkeit auf (A)', 'testCode18');
insert into command(id, type, prompt, code) values (19, 'default', 'Erhöhe die Helligkeit um (A)', 'testCode19');
insert into command(id, type, prompt, code) values (20, 'default', 'Mach die Helligkeit niedriger um (A)', 'testCode20');
insert into command(id, type, prompt, code) values (21, 'default', 'Erhöhe die Lautstärke um (A)', 'testCode21');
insert into command(id, type, prompt, code) values (22, 'default', 'Mach die Lautstärke niedriger um (A)', 'testCode22');
insert into command(id, type, prompt, code) values (23, 'default', 'Mache einen Screenshot von (A)', 'testCode23');
insert into command(id, type, prompt, code) values (24, 'default', 'Nächstes Lied', 'testCode24');
insert into command(id, type, prompt, code) values (25, 'default', 'Lied zurück', 'testCode25');
*/

 */
--SELECT setval('command_id_seq', (SELECT MAX(id) FROM command));

/* insert into command("codexy", "code xy ausführen", "personalized");

 */

-- Model Inserts

-- Englisch
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-small-en-us-0.15', '40M', 'English', 0, 'https://alphacephei.com/vosk/models/vosk-model-small-en-us-0.15.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-en-us-0.22', '1.8G', 'English', 0, 'https://alphacephei.com/vosk/models/vosk-model-en-us-0.22.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-en-us-0.22-lgraph', '128M', 'English', 0, 'https://alphacephei.com/vosk/models/vosk-model-en-us-0.22-lgraph.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-en-us-0.42-gigaspeech', '2.3G', 'English', 0, 'https://alphacephei.com/vosk/models/vosk-model-en-us-0.42-gigaspeech.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-en-us-daanzu-20200905', '1.0G', 'English', 0, 'https://alphacephei.com/vosk/models/vosk-model-en-us-daanzu-20200905.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-en-us-daanzu-20200905-lgraph', '129M', 'English', 0, 'https://alphacephei.com/vosk/models/vosk-model-en-us-daanzu-20200905-lgraph.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-en-us-librispeech-0.2', '845M', 'English', 0, 'https://alphacephei.com/vosk/models/vosk-model-en-us-librispeech-0.2.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-small-en-us-zamia-0.5', '49M', 'English', 0, 'https://alphacephei.com/vosk/models/vosk-model-small-en-us-zamia-0.5.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-en-us-aspire-0.2', '1.4G', 'English', 0, 'https://alphacephei.com/vosk/models/vosk-model-en-us-aspire-0.2.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-en-us-0.21', '1.6G', 'English', 0, 'https://alphacephei.com/vosk/models/vosk-model-en-us-0.21.zip');

-- Indisches Englisch
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-en-in-0.5', '1G', 'Indian English', 0, 'https://alphacephei.com/vosk/models/vosk-model-en-in-0.5.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-small-en-in-0.4', '36M', 'Indian English', 0, 'https://alphacephei.com/vosk/models/vosk-model-small-en-in-0.4.zip');

-- Chinesisch
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-small-cn-0.22', '42M', 'Chinese', 0, 'https://alphacephei.com/vosk/models/vosk-model-small-cn-0.22.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-cn-0.22', '1.3G', 'Chinese', 0, 'https://alphacephei.com/vosk/models/vosk-model-cn-0.22.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-cn-kaldi-multicn-0.15', '1.5G', 'Chinese', 0, 'https://alphacephei.com/vosk/models/vosk-model-cn-kaldi-multicn-0.15.zip');

-- Russisch
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-ru-0.42', '1.8G', 'Russian', 0, 'https://alphacephei.com/vosk/models/vosk-model-ru-0.42.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-small-ru-0.22', '45M', 'Russian', 0, 'https://alphacephei.com/vosk/models/vosk-model-small-ru-0.22.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-ru-0.22', '1.5G', 'Russian', 0, 'https://alphacephei.com/vosk/models/vosk-model-ru-0.22.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-ru-0.10', '2.5G', 'Russian', 0, 'https://alphacephei.com/vosk/models/vosk-model-ru-0.10.zip');

-- Französisch
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-small-fr-0.22', '41M', 'French', 0, 'https://alphacephei.com/vosk/models/vosk-model-small-fr-0.22.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-fr-0.22', '1.4G', 'French', 0, 'https://alphacephei.com/vosk/models/vosk-model-fr-0.22.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-small-fr-pguyot-0.3', '39M', 'French', 0, 'https://alphacephei.com/vosk/models/vosk-model-small-fr-pguyot-0.3.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-fr-0.6-linto-2.2.0', '1.5G', 'French', 0, 'https://alphacephei.com/vosk/models/vosk-model-fr-0.6-linto-2.2.0.zip');

-- Deutsch
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-de-0.21', '1.9G', 'German', 0, 'https://alphacephei.com/vosk/models/vosk-model-de-0.21.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-de-tuda-0.6-900k', '4.4G', 'German', 0, 'https://alphacephei.com/vosk/models/vosk-model-de-tuda-0.6-900k.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-small-de-zamia-0.3', '49M', 'German', 0, 'https://alphacephei.com/vosk/models/vosk-model-small-de-zamia-0.3.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-small-de-0.15', '45M', 'German', 0, 'https://alphacephei.com/vosk/models/vosk-model-small-de-0.15.zip');

-- Spanisch
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-small-es-0.42', '39M', 'Spanish', 0, 'https://alphacephei.com/vosk/models/vosk-model-small-es-0.42.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-es-0.42', '1.4G', 'Spanish', 0, 'https://alphacephei.com/vosk/models/vosk-model-es-0.42.zip');

-- Portugiesisch
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-small-pt-0.3', '31M', 'Portuguese', 0, 'https://alphacephei.com/vosk/models/vosk-model-small-pt-0.3.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-pt-fb-v0.1.1-20220516_2113', '1.6G', 'Portuguese', 0, 'https://alphacephei.com/vosk/models/vosk-model-pt-fb-v0.1.1-20220516_2113.zip');

-- Griechisch
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-el-gr-0.7', '1.1G', 'Greek', 0, 'https://alphacephei.com/vosk/models/vosk-model-el-gr-0.7.zip');

-- Türkisch
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-small-tr-0.3', '35M', 'Turkish', 0, 'https://alphacephei.com/vosk/models/vosk-model-small-tr-0.3.zip');

-- Vietnamesisch
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-small-vn-0.4', '32M', 'Vietnamese', 0, 'https://alphacephei.com/vosk/models/vosk-model-small-vn-0.4.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-vn-0.4', '78M', 'Vietnamese', 0, 'https://alphacephei.com/vosk/models/vosk-model-vn-0.4.zip');

-- Italienisch
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-small-it-0.22', '48M', 'Italian', 0, 'https://alphacephei.com/vosk/models/vosk-model-small-it-0.22.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-it-0.22', '1.2G', 'Italian', 0, 'https://alphacephei.com/vosk/models/vosk-model-it-0.22.zip');

-- Niederländisch
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-small-nl-0.22', '39M', 'Dutch', 0, 'https://alphacephei.com/vosk/models/vosk-model-small-nl-0.22.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-nl-spraakherkenning-0.6', '860M', 'Dutch', 0, 'https://alphacephei.com/vosk/models/vosk-model-nl-spraakherkenning-0.6.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-nl-spraakherkenning-0.6-lgraph', '100M', 'Dutch', 0, 'https://alphacephei.com/vosk/models/vosk-model-nl-spraakherkenning-0.6-lgraph.zip');

-- Katalanisch
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-small-ca-0.4', '42M', 'Catalan', 0, 'https://alphacephei.com/vosk/models/vosk-model-small-ca-0.4.zip');

-- Arabisch
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-ar-mgb2-0.4', '318M', 'Arabic', 0, 'https://alphacephei.com/vosk/models/vosk-model-ar-mgb2-0.4.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-ar-0.22-linto-1.1.0', '1.3G', 'Arabic', 0, 'https://alphacephei.com/vosk/models/vosk-model-ar-0.22-linto-1.1.0.zip');

-- Tunesisches Arabisch
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-small-ar-tn-0.1-linto', '158M', 'Arabic Tunisian', 0, 'https://alphacephei.com/vosk/models/vosk-model-small-ar-tn-0.1-linto.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-ar-tn-0.1-linto', '517M', 'Arabic Tunisian', 0, 'https://alphacephei.com/vosk/models/vosk-model-ar-tn-0.1-linto.zip');

-- Farsi
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-fa-0.42', '1.6G', 'Farsi', 0, 'https://alphacephei.com/vosk/models/vosk-model-fa-0.42.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-small-fa-0.42', '53M', 'Farsi', 0, 'https://alphacephei.com/vosk/models/vosk-model-small-fa-0.42.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-fa-0.5', '1G', 'Farsi', 0, 'https://alphacephei.com/vosk/models/vosk-model-fa-0.5.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-small-fa-0.5', '60M', 'Farsi', 0, 'https://alphacephei.com/vosk/models/vosk-model-small-fa-0.5.zip');

-- Filipino
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-tl-ph-generic-0.6', '320M', 'Filipino', 0, 'https://alphacephei.com/vosk/models/vosk-model-tl-ph-generic-0.6.zip');

-- Ukrainisch
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-small-uk-v3-nano', '73M', 'Ukrainian', 0, 'https://alphacephei.com/vosk/models/vosk-model-small-uk-v3-nano.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-small-uk-v3-small', '133M', 'Ukrainian', 0, 'https://alphacephei.com/vosk/models/vosk-model-small-uk-v3-small.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-uk-v3', '343M', 'Ukrainian', 0, 'https://alphacephei.com/vosk/models/vosk-model-uk-v3.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-uk-v3-lgraph', '325M', 'Ukrainian', 0, 'https://alphacephei.com/vosk/models/vosk-model-uk-v3-lgraph.zip');

-- Kasachisch
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-small-kz-0.15', '42M', 'Kazakh', 0, 'https://alphacephei.com/vosk/models/vosk-model-small-kz-0.15.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-kz-0.15', '378M', 'Kazakh', 0, 'https://alphacephei.com/vosk/models/vosk-model-kz-0.15.zip');

-- Schwedisch
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-small-sv-rhasspy-0.15', '289M', 'Swedish', 0, 'https://alphacephei.com/vosk/models/vosk-model-small-sv-rhasspy-0.15.zip');

-- Japanisch
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-small-ja-0.22', '48M', 'Japanese', 0, 'https://alphacephei.com/vosk/models/vosk-model-small-ja-0.22.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-ja-0.22', '1G', 'Japanese', 0, 'https://alphacephei.com/vosk/models/vosk-model-ja-0.22.zip');

-- Esperanto
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-small-eo-0.42', '42M', 'Esperanto', 0, 'https://alphacephei.com/vosk/models/vosk-model-small-eo-0.42.zip');

-- Hindi
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-small-hi-0.22', '48M', 'Hindi', 0, 'https://alphacephei.com/vosk/models/vosk-model-small-hi-0.22.zip');
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-hi-0.22', '1.4G', 'Hindi', 0, 'https://alphacephei.com/vosk/models/vosk-model-hi-0.22.zip');

-- Tschechisch
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-small-cs-0.4-rhasspy', '36M', 'Czech', 0, 'https://alphacephei.com/vosk/models/vosk-model-small-cs-0.4-rhasspy.zip');

-- Polnisch
INSERT INTO model(name, size, language, precision, link) VALUES ('vosk-model-small-pl-0.22', '40M', 'Polish', 0, 'https://alphacephei.com/vosk/models/vosk-model-small-pl-0.22.zip');