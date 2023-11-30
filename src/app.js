const logger = require('morgan');
const express = require('express');
const indexRouter = require('./routes/index.route');
const {errorHandler, notFoundHandler} = require('./middleware/error.middleware')

const app = express();

// Middleware Stack
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable Routing
app.use(indexRouter);

//Error Handler
app.use(notFoundHandler);
app.use(errorHandler)

module.exports = app;