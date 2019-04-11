require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const RouteLoader = require('./routes');
const logRequest = require('./middlewares/logRequest');

let app = express();

const port = process.env.PORT || 8081;

app.use(cors());
app.use(bodyParser.json());

app.use(logRequest);
app = RouteLoader.load(app)

app.listen(port, () => {
    console.log('server on')
});

module.exports = app;