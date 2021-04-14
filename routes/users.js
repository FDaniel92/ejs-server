const articlesRoutes = (app, fs) => {

    const dataPath = './data/users.json';

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
    app.get('/users', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });


    // CREATE
    app.post('/users', (req, res) => {
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
    app.put('/users/:id', (req, res) => {
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
    app.delete('/users/:id', (req, res) => {
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