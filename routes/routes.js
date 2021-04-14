// Betöltöm a cikekk útvonalát
const articlesRoutes = require('./articles');
const usersRoutes = require('./users');

const appRouter = (app, fs) => {
  // Felvettem egy alapértelmezett útvonalat ami az "üres" útvonalakat kezeli
  // az alap API url-nél
  app.get('/', (req, res) => {
    res.send('Üdv a fejlesztői szerveren!');
  });

  // Futtatom a cikkek route modul-t 
  articlesRoutes(app, fs);
  usersRoutes(app, fs);
};

module.exports = appRouter;