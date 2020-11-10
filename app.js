const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const compression = require("compression");

const app = express();

app.use(helmet());
app.use(express.json());
app.use(xss());
app.use(compression());

module.exports =  app;