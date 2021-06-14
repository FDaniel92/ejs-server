const articlePreviewsRoutes = (app, fs) => {

    const dataPathArticlePreviews = './data/articlePreviews.json';

    //VÉGPONT AMIT MEGHÍVOK A FRONTENDRŐL - READ
    app.get('/articlePreviews', (req, res) => {
        fs.readFile(dataPathArticlePreviews, 'utf8', (err, data) => {
            res.send(data);
        }, true);
    });
};

module.exports = articlePreviewsRoutes;