const express = require('express');
const auth = require('./routes/auth.routes');
const AdConnector = require("./connectors/ad.connector");

new AdConnector().init();

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/active-directory', auth);

module.exports = app;
