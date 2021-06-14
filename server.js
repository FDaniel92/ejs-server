//Modulok - függőségek telepítése, amiket a továbbiakban használok
//Modul felvétele ami a require() függvénnyel történik (express.js).
const express = require('express');
//Modul felvétele ami a require() függvénnyel történik (cors.js).
const cors = require('cors');
//app nevű konstansban tárolt express.js metódus
const app = express();
//Modul (fs - file system) felvétele ami a require() függvénnyel történik.
const fs = require('fs');
//A port amin a szerver fut
const port = 3001;
//Middleware - Az Express middleware olyan funkciók, amelyek az Express kiszolgálóhoz intézett kérések életciklusa alatt teljesülnek.
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
//A require függvénnyel "beillesztjük/hozzáférünk" a "routes" modulhoz.
const routes = require('./routes/routes.js')(app, fs);
//Az app.listen egy express.js függvény, ami ebben az esteben egy meghatározott porton fut. (npm start utasítással indul)
app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`);
});