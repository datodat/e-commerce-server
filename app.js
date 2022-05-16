const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('express-async-errors');

const phonesRouter = require('./controllers/phones');
const middleware = require('./utils/milldeware');
const logger = require('./utils/logger');

logger.info(`Connecting to MongoDB`);

mongoose.connect(config.MONGOURL)
  .then(() => {
    logger.info(`Connected to MongoDB`);
  })
  .catch((error) => {
    logger.error(`Error connecting to MongoDB`);
  })

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/phones', phonesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;