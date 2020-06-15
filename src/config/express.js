const express = require("express");
const morgan = require("morgan");
const compress = require("compression");
const cors = require("cors");
const methodOverride = require("method-override");
const { logs } = require("./env");
const helmet = require("helmet");
const { errorHandler, notFound } = require('./error.handler')
const apiRoutes = require('../api/routes/v1/index')
const path = require('path')
/**
 * Express instance
 * @public
 */
const app = express();

// request logging. dev: console | production: file
app.use(morgan(logs));

//serve client folder
app.use(express.static(path.join(__dirname.split('src')[0], 'client/build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname.split('src')[0], 'client/build/index.html'));
});

//serve public folder
app.use('/v1/images/', express.static(path.join(__dirname.split('src')[0], 'public/images')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compress());


// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());



// mount api v1 routes
app.use("/v1", apiRoutes);

app.use(notFound)
app.use(errorHandler);

module.exports = app;
