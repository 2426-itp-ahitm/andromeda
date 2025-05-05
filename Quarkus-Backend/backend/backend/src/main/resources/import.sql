-- This file allow to write SQL commands that will be emitted in test and dev.
-- The commands are commented as their support depends of the database
-- insert into command (id, field) values(1, 'field-1');
-- insert into myentity (id, field) values(2, 'field-2');
-- insert into myentity (id, field) values(3, 'field-3');
-- alter sequence myentity_seq restart with 4;

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
