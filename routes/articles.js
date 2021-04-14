const articlesRoutes = (app, fs) => {

    const dataPath = './data/articles.json';

    const readFile = (
        callback,
        returnJson = false,
        filePath = dataPath,
        encoding = 'utf8'
    ) => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (
        fileData,
        callback,
        filePath = dataPath,
        encoding = 'utf8'
    ) => {
        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    //Ez a CRUD

    // READ
    app.get('/articles', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }


            function searchCarouselImage() {
                var myArray = JSON.parse(data);
                var myArrayLength = myArray.length;
                for (var i = 0; i < myArrayLength; i++) {
                    if (myArray[i].blogContents[i].type === 'image' && myArray[i].blogContents[i].isCarousel === true) {
                        return myArray[i].blogContents[i].imageName
                    }
                }
            }

            // console.log(searchCarouselImage())

            var blogArticles = JSON.parse(data).map(item => {
                return {
                    id: item.id,
                    headerContent: item.headerContent,
                    date: item.date,
                    blogTitle: item.blogTitle,
                    blogSubtitle: item.blogSubtitle,
                    preview: item.blogContents[0].body.substr(0, 200),
                    carouselImage: searchCarouselImage()
                }
            });
            res.send(blogArticles);
        });
    });

    app.get('/articles/:id', function (req, res) {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            // res.send(JSON.parse(data)); //*find-al megkeresem az aktuális id-jű objektumot
            var blogArticlesItem = JSON.parse(data).find(obj =>
                obj.id == req.params.id
            );
            res.send(blogArticlesItem)
        });
    })



    // CREATE
    app.post('/articles', (req, res) => {
        readFile(data => {
            const newArticleId = Date.now().toString();

            // Új cikk hozzáadása
            data[newArticleId.toString()] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('Új cikk hozzáadva');
            });
        }, true);
    });

    // UPDATE
    app.put('/articles/:id', (req, res) => {
        readFile(data => {
            // Új cikk hozzáadása
            const articleId = req.params['id'];
            data[articleId] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`A ${articleId} id-jú cikk frissítve lett`);
            });
        }, true);
    });

    // DELETE
    app.delete('/articles/:id', (req, res) => {
        readFile(data => {
            // új cikk hozzáadása
            const articleId = req.params['id'];
            delete data[articleId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`A ${articleId} id-jú cikk törölve!`);
            });
        }, true);
    });
};

module.exports = articlesRoutes;