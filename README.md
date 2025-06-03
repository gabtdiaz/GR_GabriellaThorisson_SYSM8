# Arkitektur och uppbyggnad

Detta är en Single Page Application som är skapat med React. Detta betyder att allt laddas en gång (ex. global data), och innehåll (html, komponenter) byts ut med hjälp av React Router när användaren navigerar, vilket ger en snabb och smidig upplevelse.

# MappStruktur

Jag använder "/pages" för hela sidor, "/components" för återanvändbara delar, "/context" för s.k global data som behövs överallt och "/hooks" för återanvändbar logik.

# Tekniska lösningar

UseState & UseEffect

Jag använde useState som hanterar data som behöver förändras och trigga ändringar i UI på mina sidor. Exempel: activeFilter (filtrerar mellan menuItems), sökfunktion, menuData, isModalOpen i Order Page och showPayment. När värden ändras eller användaren klickar runt måste UI reflektera detta. UseState Används även i formulärhantering för att kunna spåra och visa vad användaren skriver i realtid (eller i sökfunktionen).

UseEffect används vid API-anrop, hämtar menuData när order komponenten laddas eller att cart sparas till localStorage när den ändras, eller triggar events när cart uppdateras. UseEffect används även vid navigering baserat på autentisering eööer hämtning av användardata när token finns.

Varukorg och inloggningsdata behövde vara tillgänglig på alla sidor så att användaren kan navigera genom sidor utan att datan försvinner. Context API löste detta utan att behöva skicka props genom många nivåer.

- Ex: Cartlogik behövs i header (visa antal), ordersidan (lägg till) och cartsidan(visa/ändra). Detta hämtas direkt från cartContext, slipper alltså skicka data via props genom flera komponenter och min App.js omsluts endast med CartProvider.

JSON server som backend istället för en riktig databas. Perfekt för en prototyp så jag kunde fokusera mer på frontenden.

LocalStorage, så varukorg och inloggning kan finnas kvar när man uppdaterar sidan. Som användare kan man navigera runt utan att förlora ex sin varukorg. Användaren hålls även inloggad.

# Utmaningar

Att lära sig Context API, istället för att skicka props överallt som jag gjorde i början. Bättre när data behövs på flera ställen.

Favoritfunktionen
Implementerades sent, krävde inloggning, och en mängd UI/databas uppdateringar. Löste det genom att skapa en egen hook för favoriter som hanterade logiken på ett ställe.

Responsiv design
Att få allt att fungera både på desktop och mobil var svårare än väntat och mycket tidskrävande.

State management
Hade state överallt vilket blev rörigt. Custom hooks som useCheckout hälpte mig att organisera logiken bättre.

Att skilja på backend och frontend "logik"
Det var en utmaning att lista ut var all kod skulle placeras. Vad bör finnas i en "page" och vad bör hanteras via hooks eller context?

# Viktiga beslut

Beslut: Separata komponenter för många delar

- Lättare att underhålla och testa
- Koden blir renare, kan återanvända komponeneter

Beslut: Modal för produktval istället för direkt tillägg i varukorg vid Card click.

- Bättre användarupplevelse (Tack Wolt för inspo<3)
- Mer kod men mycket bättre UX

Beslut: Använda Hassans Authcontext struktur

- Fungerade direkt i mitt projekt

# Insikter och lärdomar

Planering är allt!

- Önskar att jag hade tänkt igenom datastrukturen mer från början. Lägga till favorites i slutet krävde ändringar i många filer. (Var dock osäker om jag skulle hinna med VG-delar)

Användarupplevelse, lika viktigt som funktionalitet

- Features som ex autoifyllning för inloggade användare gör stor skillnad för UX! Man vill att det ska flyta på och gå snabbt.
- Att använda snygga och "logiska" effekter, animationer och färgsättningar lyfter applikationen

Att dela upp logik i hooks, komponenter för UI

- Lättare att förstå och utveckla med bättre separation.
- Kunde ha lagt till många fler komponenter än vad det blev, ex för alla formulär, för att ha renare pages. Har fortfarande en del backend logik i mina pages exempelvis i min Order Page hanteras fetchning av menu item data och Account Page hanteras fetchning av user orders. Kunde skapat en custom hook för API-anrop istället för att sköta detta direkt i dessa komponenter.

Projektet har gett mig bättre förståelse för hur moderna appar är uppbyggda och hur viktigt det är att strukturera kod från ett underhållningsperspektiv. Lika viktigt är en snygg och tilltalande design och UX för att användaren ska vilja komma tillbaka. Nästa gång hade jag planerat datastrukturen bättre och delat upp logiken ännu mer.
