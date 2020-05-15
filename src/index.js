Promise = require("bluebird"); // eslint-disable-line no-global-assign
const app = require("./config/express");
const mongoose = require("./config/mongoose");
const logger = require("./config/logger");
const { port, env } = require("./config/env");

// open mongoose connection
mongoose.connect();


// listen to requests
app.listen(port, () => logger.info(`Server started on port ${port} (${env})`));

/**
 * Exports express
 * @public
 */
module.exports = app;