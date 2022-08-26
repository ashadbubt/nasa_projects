const express = require('express');
const planetRouter = require('./routes/planets/planets.router');
const cors = require('cors');
const app = express();
app.use(cors({
    origin:"http://localhost:3000"
}))
app.use(express.json());
app.use(planetRouter);

module.exports = app;