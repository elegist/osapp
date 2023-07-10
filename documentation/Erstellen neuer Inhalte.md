# Anleitung zum Erstellen neuer Inhalte
[toc]
## Template zum Erstellen neuer Inhalte
Ein Template, welches weitere Erklärungen enthält (oben angestellte Kommentare), sowie einen Einblick in die geforderte JSON-Datenstruktur gibt befindet sich unter `/main/src/data/taskTemplate.json` \
*!Wichtig: Diese Datei sollte mit jeder Änderung der Datenstruktur entsprechend angepasst werden!*
## Allgemeine Hinweise
### Auswertung
Sofern die Datenstruktur korrekt befüllt ist, erfolgt die Auswertung der Aufgaben ohne weitere Anpassungen des Codes, mit Ausnahme der InteractiveTask. Diese brauchen eine individuelle Auswertung innerhalb der Task, diese brauchen als Schnittstelle nur die Task selbst (Parentclass AssessmentTask) um auf die entsprechenden Methoden zur Auswertung (z.B.: setTaskSuccess()) zugreifen zu können.
### Kategorien der Zusammenfassung am Ende
Das Feld "summarySubSection" in der Datenstruktur sollte, um die Zusammenfassung und Auswertung am Ende übersichtlich zu halten in jeder angelegten Task vorhanden sein. Tasks mit identischem Inhalt in diesem Feld werden im SummaryScreen zusammengefasst und geordnet.

Beispiel: Eine ReadingTask, eine QuizTask und eine InteractiveTask haben alle unter summarySubSection den Eintrag "Teil 1 - Mathematik". Diese drei Tasks erscheinen nun in der Zusammenfassung am Ende unter der Überschrift "Teil 1 - Mathematik".

## Texte und Bilder (Reading Task)
### Texte
Texte müssen einfach in der jeweiligen ReadingTask in einzelne Sätze aufgespalten eingefügt werden (siehe Template). Dabei sollte darauf geachtet werden, diese sehr kurz zu halten, um eine gute Darstellung auch auf kleineren Bildschirmen sicherzustellen.
### Bilder
Bilder werden zwischen die Texte eingefügt mit einem vorangestellten [img]. Ein Beispiel findet sich im Template. Zusätzlich muss das Bild im Ordner `/main/src/assets/osa_images` vorhanden sein und im MediaMapper unter `getOsaImage()` im Ordner `/main/src/screens/helper/MediaMapper.js` eingetragen werden.
## Single- und Multiple Choice Aufgaben (Quiz Task)
Sowohl Single- als auch Multiple Choice Tasks haben eine identische Datenstruktur. Es muss dabei angegeben werden, um welche Art Quiz (single / multiple) es sich handelt sowie die gewünschten dargestellen Antwortoptionen und die korrekten Antworten. Durch die identische Struktur ist es ebenso möglich eine Single Choice Aufgabe mit mehreren korrekten Antworten zu erstellen. Genauere Beispiele finden sich im Template.
## Komplexere Aufgaben (Interactive Task)
Das Konzept der Interactive Tasks ist es, aus dem herkömmlichen "Quiz" auszubrechen und Nutzer\*innen etwas Abwechslung und Interaktivität zu bieten. Jede Aufgabe muss individuell gestaltet und eingebunden werden. Die zugehörige JSON-Datenstruktur findet sich im Template. Hier werden vergleichbar zu Reading- und QuizTask die generellen Daten eingetragen, wichtig hierbei sind die Hilfen, die Nutzer\*innen das Lösen der Aufgabe ermöglicht. Die Task selbst ist eine Single File Component und muss zusätzlich zur JSON-Datenstruktur noch im InteractiveScreen `/main/src/screens/InteractiveScreen.js` importiert und dort unter `renderTask()` eingetragen werden.

Beispiele für konkrete Implementierungen der InteractiveTask finden sich unter `/main/src/screens/interactive_tasks`.
## Anlegen eines neuen Themas
Wenn nicht nur die vorhandenen Themen erweitert, sondern ein gänzlich neues Thema angelegt werden soll, sind zusätzliche Schritte nötig:
### 1. Anlegen einer neuen JSON-Datei
Unter `/main/src/data` muss für das neue Thema eine entsprechende Datei angelegt werden, die die Datenstruktur für das neue Thema enthält. Dabei steht das Template und auch die schon vorhandenen JSON-Dateien der anderen Themen als Beispiel zur Verfügung.
### 2. Anpassen des TaskManager
Die Datei `/main/src/container/TaskManager.js` muss an drei Stellen angepasst werden.
* Einbinden der neuen JSON-Datei (import im head)
* In der Methode #initTaskManager() sind zwei Anpassungen nötig: 1. Eintragen des Themas unter this.#topics und 2. Aufrufen von this.#generateTasks() direkt darunter, Parameter ist die neue JSON-Datei.