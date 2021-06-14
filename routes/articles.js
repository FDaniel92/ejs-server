//konstans-al (const) definiált függvény deklaráció, két paraméterrel (ES6 használat végett)
const articlesRoutes = (app, fs) => {
    //konstans kulcsszóval deklarált "változók", amik a JSON file-ok helyére mutatnak. (Így elég csak egy helyen átírni, ha később változtatunk az útvonalon valamelyiknél)
    const dataPathArticles = './data/articles.json';
    const dataPathArticlePreviews = './data/articlePreviews.json';
    const dataPathArticleCarouselImages = './data/articleCarouselImages.json';
    //konstans-al (const) definiált függvény deklaráció, egy paraméterrel, ami a file olvasásáért felelős
    const readData = (path) => {
        //konstans kulcsszóval deklarált "változó", ami egy metódust "tartalmaz" (readFileSync = file olvasásra használható metódus, a path a későbbiekben megadandó útvonala  filehoz, az objektumon belüli kulcs-érték paraméterek kellenek ahhoz hogy a JSON file-t rendben kiolvassa.)
        const jsonData = fs.readFileSync(path, { encoding: 'utf8', flag: 'r' });
        //Visszatérési értéke (JSON.parse = értelmezi a paraméterként mergadott file-t.)
        return JSON.parse(jsonData)
    }
    //konstans-al (const) definiált függvény deklaráció, két paraméterrel, ami a file mentéséért felelős
    const saveData = (path, data) => {
        //konstans kulcsszóval deklarált "változó", ami egy metódust "tartalmaz" (stringify = Átkonvertál egy javascript objektumot JSON "formátumba")
        const stringifyData = JSON.stringify(data);
        //A file írásáért felelős metódus, két paraméterrel (a file útvonala és a JSON formátummá átkonvertált adatot)
        fs.writeFileSync(path, stringifyData);
    }
    //konstans-al (const) definiált függvény deklaráció, egy paraméterrel
    const getArticleData = (requestBody) => {
        //A "let" kulcsszóval egy blokk hatókörben érvényes lokális változót deklarálhatunk, ebben az esetben ezekben, metódusokat "tárolunk" amiknek egy paramétere az adott file útvonala
        let fullArticles = readData(dataPathArticles);
        let previewArticles = readData(dataPathArticlePreviews);
        let carouselArticles = readData(dataPathArticleCarouselImages);

        //Itt a cikk teljes tartalmát "határozzuk meg".
        let fullArticle = {
            id: requestBody.id,
            headerContent: requestBody.headerContent,
            date: requestBody.date,
            blogTitle: requestBody.blogTitle,
            blogShortContent: requestBody.blogShortContent,
            blogCarouselImage: requestBody.blogCarouselImage,
            blogContent: requestBody.blogContent
        };
        //Itt a cikk előnézetének tartalmát "határozzuk meg".
        let previewArticle = {
            id: requestBody.id,
            headerContent: requestBody.headerContent,
            date: requestBody.date,
            blogTitle: requestBody.blogTitle,
            blogShortContent: requestBody.blogShortContent
        };
        //Itt a cikk carousel-ének tartalmát "határozzuk meg".
        let carouselArticle = {
            id: requestBody.id,
            blogTitle: requestBody.blogTitle,
            blogShortContent: requestBody.blogShortContent,
            blogCarouselImage: requestBody.blogCarouselImage
        };
        //Majd unshift tömb kezeléssel elmentjük a legújabb cikkeket elsőnek. (Most jelenleg három külön JSON file-ba történik az unshift tömb metódus)
        fullArticles.unshift(fullArticle);
        previewArticles.unshift(previewArticle);
        carouselArticles.unshift(carouselArticle);

        //Mentjük a blog cikk adatait (Most jelenleg három külön JSON file-ba történik a mentés)
        saveData(dataPathArticles, fullArticles);
        saveData(dataPathArticlePreviews, previewArticles);
        saveData(dataPathArticleCarouselImages, carouselArticles);
    }

    //CIKK LÉTREHOZÁSA - CREATE (Az app.post függvény egy express.js függvény!), (Az app.post függvény a HTTP POST kéréseket a megadott elérési útra ('/articles') irányítja megadott "visszahívási" (request, response) funkciókkal)
    app.post('/articles', (request, response) => {
        //A getArticleData metódusnak paraméterként megadjuk a request.body-t
        getArticleData(request.body);
        //A HTTP POST kérés válasza sikeres esetben:
        response.send({ success: true, msg: 'Article data added successfully' })
    });

    //VÉGPONT AMIT MEGHÍVOK A FRONTENDRŐL - READ (Az app.get függvény egy express.js függvény!), (Átirányítja a HTTP GET kéréseket arra az útvonalra('/articles'), amelyet a megadott visszahívási funkciókkal határozunk meg.(req,res))
    app.get('/articles', (req, res) => {
        //File olvasás a readFile metódussal, file útvonala és callback függvény paraméterekkel.
        fs.readFile(dataPathArticles, 'utf8', (err, data) => {
            //Válasz
            res.send(data);
        }, true);
    });

    //TELJES CIKK BETÖLÉSE "id" ALAPJÁN
    app.get('/articles/:id', function (req, res) {
        fs.readFile(dataPathArticles, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            var blogArticlesItem = JSON.parse(data).find(obj =>
                obj.id == req.params.id
            );
            res.send(blogArticlesItem)
        });
    });

    //CIKK SZERKESZTÉS - UPLOAD
    app.put('/articles/:id', (req, res) => {
        fs.readFile(dataPathArticles, 'utf8', (err, data) => {
            var articlesJSON = JSON.parse(data);
            for (var i = 0; i < articlesJSON.length; i++) {
                if (articlesJSON[i].id === req.params.id) {
                    articlesJSON[i] = req.body
                }
            }

            saveData(dataPathArticles, articlesJSON);
            res.status(200).send(`A ${req.params.id} id-jú cikk frissítve lett`);
        }, true);
    });

    //CIKK TÖRLÉS - DELETE
    app.delete('/articles/:id', (req, res) => {
        fs.readFile(dataPathArticles, 'utf8', (err, data) => {
            var articlesJSON = JSON.parse(data);
            articlesJSON = articlesJSON.filter(obj =>
                obj.id != req.params.id
            );

            saveData(dataPathArticles, articlesJSON);
            saveData(dataPathArticlePreviews, articlesJSON);
            saveData(dataPathArticleCarouselImages, articlesJSON);
            res.status(200).send(`A ${req.params.id} id-jú cikk törölve!`);
        }, true);
    });
};
//commonJS (modul formázó rendszer) szintaxis, a modul csak egy "kis kód", amelyet fájlba foglalnak, és exportálnak egy másik fájlba.
//Exportáljuk a kódot, hogy elérhetővé váljon más modulok számára.
module.exports = articlesRoutes;