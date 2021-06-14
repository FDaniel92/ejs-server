//A require függvénnyel "beillesztjük" az elkészített modulokat
const articlesRoutes = require('./articles');
const usersRoutes = require('./users');
const articlePreviewsRoutes = require('./articlePreviews');
const articleCarouselImages = require('./articleCarouselImages');
//ES6-os "arrow" függvény két paraméterrel, az "appRouter" konstansba helyezzük el az elkészített modulokat, így elég csak ezt beírni a module.export-hoz.
const appRouter = (app, fs) => {
  // Felvettem egy alapértelmezett útvonalat (jelenleg a localhost) ami az "üres" útvonalakat kezeli
  // az alap API url-nél
  app.get('/', (req, res) => {
    //Válasz ha sikeres a kapcsolat
    res.send('Üdv a fejlesztői szerveren!');
  });

  articlesRoutes(app, fs);
  usersRoutes(app, fs);
  articlePreviewsRoutes(app, fs);
  articleCarouselImages(app, fs);
};
//commonJS (modul formázó rendszer) szintaxis, a modul csak egy "kis kód", amelyet fájlba foglalnak, és exportálnak egy másik fájlba.
//Exportáljuk a kódot, hogy elérhetővé váljon más modulok számára. (module = objektum, exports = "kulcs", appRouter = érték)
module.exports = appRouter;