const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routers/index');
const app = express();

app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());
app.use('/auth', routes['auth']);

app.listen(8000);