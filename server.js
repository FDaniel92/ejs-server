
const express = require('express');
var cors = require('cors');

const app = express();

const fs = require('fs');

const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.post('/articles', function(request, response) {
  const existArticle = getArticleData();
  const articleData = request.body;
  console.log(articleData);
  existArticle.push(articleData);
  saveUserData(existArticle);
  response.send({success: true, msg: 'Article data added successfully'})
});

const routes = require('./routes/routes.js')(app, fs);

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`);
});

const saveUserData = (data) => {
  const stringifyData = JSON.stringify(data)
  fs.writeFileSync('./data/articles.json', stringifyData)
}

const getArticleData = () => {
  const jsonData = fs.readFileSync('./data/articles.json')
  return JSON.parse(jsonData)
}