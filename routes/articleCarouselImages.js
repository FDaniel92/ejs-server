const articleCarouselImages = (app, fs) => {

    const dataPathArticleCarouselImages = './data/articleCarouselImages.json';

    //VÉGPONT AMIT MEGHÍVOK A FRONTENDRŐL - READ
    app.get('/articleCarouselImages', (req, res) => {
        fs.readFile(dataPathArticleCarouselImages, 'utf8', (err, data) => {
            res.send(data);
        }, true);
    });
};

module.exports = articleCarouselImages;