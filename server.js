const express = require('express');
const mustacheExpress = require('mustache-express');

const homeController = require('./controllers/home-controller');
const singleController = require('./controllers/single-controller');


const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use('/public', express.static('./public'));

app.use(homeController);
app.use(singleController);

app.listen(3000, function (){
    console.log('application has started');
});
