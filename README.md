# message-template-editor

[Русский](README.ru.md)

Nachrichtenvorlagen-Editor – Testaufgabe.

Das Ziel dieser Testaufgabe ist die Entwicklung eines Nachrichtenvorlagen-Editors und eines Nachrichten-Vorschau-Widgets. Der Benutzer soll mithilfe von Textfeldern und Schaltflächen eine Nachrichtenvorlage mit Variablen und bedingten Verzweigungen (WENN-DANN-SONST) erstellen können. Mit dieser Vorlage kann der Benutzer die Erstellung von Standard-Nachrichten automatisieren. Der Inhalt der Nachrichten hängt davon ab, welchen Variablen Werte zugewiesen werden und welchen nicht (welche Informationen verfügbar sind). Die Vorlage kann mithilfe des Nachrichten-Vorschau-Widgets getestet werden. Hier kann der Benutzer den Variablen Werte zuweisen, woraufhin die endgültige Nachricht sofort generiert wird.\
Aktuell wird die Nachrichtenvorlage im lokalen Speicher des Browsers gespeichert und von dort geladen. Wenn es keine gespeicherte Vorlage im lokalen Speicher gibt, besteht die Vorlage aus einem einzelnen Textfeld, Schaltflächen zum Einfügen von Variablen und bedingten Verzweigungen. Sie kann mit Text und Variablen gefüllt und in mehrere Felder aufgeteilt werden, um bedingte Verzweigungen zu ermöglichen.\
Der Variablensatz ist derzeit begrenzt und vordefiniert (nicht vom Benutzer bearbeitbar).

Nach dem Laden der Webanwendung erscheint die Schaltfläche `Message Editor`. Durch Klicken auf diese Schaltfläche wird der Nachrichtenvorlagen-Editor geöffnet, der Schaltflächen zum Einfügen von Variablen, bedingten Verzweigungen und Steuerungsschaltflächen für den Editor enthält.

## Variablen

Platzieren Sie im Nachrichtenvorlagen-Editor den Cursor an der gewünschten Stelle, wo der Text von der Bedeutung der Variable abhängig sein soll, und klicken Sie auf die Schaltfläche mit dem entsprechenden Variablennamen. Die Variable erscheint in der Vorlage mit ihrem in geschweifte Klammern eingeschlossenen Namen.\
Die Bedeutungen der Variablen können nur mit speziellen Textflächen im Nachrichten-Vorschau-Widget bestimmt werden. Zuerst haben die Variable keine Bedeutung.\
Im Nachrichtenvorlagen-Editor können nur Variablen benutzt werden, deren Variable-Schaltflächen es im Editor gibt. Wenn der Benutzer mit der Tastatur in das Textfeld des Editors ein anderes Wort in geschweiften Klammern eingibt, wird keine neue Variable erstellt. Nach der Verarbeitung wird dieses Wort zusammen mit den Klammern unverändert als ein Text im Nachrichten-Vorschau-Widget gezeigt. Im Nachrichten-Vorschau-Widget kann keine Bedeutung für dieses Wort als Variable festgestellt werden.

## Bedingte Verzweigung

Platzieren Sie im Nachrichtenvorlagen-Editor den Cursor an der Stelle, an der der Nachrichteninhalt von der Bedingung abhängen soll. Klicken Sie auf die Schaltfläche `Click to add...`. Das Feld, in dem sich der Cursor befindet, wird in zwei Teile geteilt. Der Text links und oberhalb des Cursors bleibt im aktuellen Feld. Der Text rechts und unterhalb des Cursors wird in ein neues Textfeld darunter verschoben. Zwischen diesen beiden Feldern werden drei weitere Textfelder erstellt:

- IF-Feld: Dieses Feld dient zum Erstellen einer Bedingung. Die Bedingung gilt als erfüllt, wenn der Text in diesem Feld nach Anwendung der Variablen vorhanden ist. Die Bedingung gilt als nicht erfüllt, wenn das Feld nach Anwendung der Variablen leer ist (ohne Text). Beispiel: Wenn die Variable {name} in das IF-Feld eingefügt ist und die Bedeutung dieser Variable im Nachrichtenvorschau-Widget bestimmt wird, gilt die Bedingung als erfüllt und wird der Inhalt des THEN-Felds angezeigt. Wenn keine Bedeutung der Variable bestimmt wird, wird der Inhalt des ELSE-Felds angezeigt. Wenn ein Text neben den Variablen im IF-Feld vorhanden ist, gilt die Bedingung als erfüllt und es hängt nicht davon ab, ob eine Bedeutung der Variable bestimmt ist, da der Text vorhanden ist. Deswegen ist es empfohlen, nur Variablen im IF-Feld zu benutzen.
- THEN-Feld: Geben Sie den Text ein, der angezeigt werden soll, wenn das IF-Feld nicht leer ist.
- ELSE-Feld: Geben Sie den Text ein, der angezeigt werden soll, wenn das IF-Feld leer ist.

Wenn Sie auf die Schaltfläche „Delete“ klicken, wird die bedingte Verzweigung, in der sich die Schaltfläche befindet, gelöscht. Dadurch werden auch die IF-, THEN- und ELSE-Felder aus der Vorlage entfernt. Die Felder oberhalb und unterhalb dieser Verzweigung werden zu einem Feld zusammengeführt, wobei ihre Textinhalte vereint werden.

## Steuerelemente des Nachrichtenvorlagen-Editors

`Preview` – Diese Schaltfläche öffnet das Nachrichtenvorschau-Widget. Das Widget-Fenster wird über dem Nachrichtenvorlagen-Editor geöffnet. Die Arbeit an der Vorlage ist währenddessen nicht möglich.\
`Save` – Diese Schaltfläche speichert die aktuelle Vorlage im lokalen Speicher des Browsers.\
`Close` – Diese Schaltfläche schließt den Nachrichtenvorlagen-Editor.

## Widget für die Nachrichtenvorschau

Mit diesem Widget können Sie die Nachrichtenvorlage testen. Beim Laden des Widgets sieht der Benutzer zunächst die Nachricht, die erscheinen muss, wenn alle Variablen undefiniert sind. Im Widget kann der Benutzer die gewünschten Bedeutungen der Variablen (als Text) bestimmen und die Änderungen der Nachricht überprüfen. Der Nachrichtentext ändert sich in Echtzeit.\
Das Widget verarbeitet die aktuelle Nachrichtenvorlage und berücksichtigt dabei die im Editor vorgenommenen Änderungen, auch wenn diese nicht im lokalen Speicher des Browsers gespeichert werden.\
Über die Schaltfläche `Close` im Widget wird die Nachrichtenvorschau geschlossen.

## Projektbefehle

Im Ordner des Projektes können Sie die folgenden Befehle ausführen:

- `npm start`: Das Starten der Anwendung im Entwicklungsmodus. Die Anwendung öffnet sich im Browser unter der Adresse [http://localhost:3000] (http://localhost:3000). Änderungen an den Projektdateien werden nach dem Speichern automatisch im Browser angezeigt.
- `npm test` : Das Starten der automatisierten Tests. Das Projekt bietet derzeit Tests der Funktion, die die Nachrichtenvorlage verarbeitet und anhand bestimmter Variablen den endgültigen Nachrichtentext generiert. Sie können den Testabdeckungsgrad mit dem Befehl `npm test -- --coverage --watchAll` überprüfen.
- `npm run build`: die Erstellung Anwendungsdateien für die Betriebsverteilung. Die Dateien werden im `build`-Ordner kompiliert.

## Verwendete Technologien

Folgende Technologien wurden bei der Projektentwicklung verwendet:

- React
- TypeScript

`create-react-app` wurde zur Einrichtung der Umgebung verwendet.

## Geplante Verbesserungen

Dem Benutzer ermöglichen, die Liste der im Nachrichtenvorlagen-Editor verwendenden Variablen selbst zu definieren.\
Die Möglichkeit entwickeln, mehrere Vorlagen zu speichern und beim Laden des Editors eine Vorlage auszuwählen.\
Ein Problem tritt auf. Beim Tippen kann sich die Vorlage automatisch nach oben scrollen. Das gibt es, wenn unten genannte Voraussetzungen gleichzeitig sind:\
eine Vorlage nimmt mehr Platz als der verfügbare Anwendungsfenster ein und ist nach unten gescrollt und der untere Rand des letzten Textblocks sichtbar ist;\
der letzten Textblock hat mehrere Zeilen;\
man tippt in dem letzten Textblock.\
Nach dem automatischen Scrollen kann man die Zeile sehen, in der man tippt. Aber unten befindete Zeilen geraten außerhalb des Fensters und sind beim Tippen unsichtbar. Man kann zwar weiterhin tippen, aber der Text darunter ist nicht mehr sichtbar, was unbequem und als Problem bewertet ist.
