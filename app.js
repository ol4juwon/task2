'use strict';
require('dotenv').config({});
const moment = require('moment');
const createError = require('http-errors');
// const socketio = require('socket.io');
const express = require('express');
// const http = require('http');

global.isProduction = process.env.NODE_ENV == "production";
const app = express();
const cors = require('cors');
app.use(cors());
require('./app/Helpers');
require('express-async-errors');
require('./startups')(app, express);
app.use(cors());


app.use(express.json());
app.set('view engine', 'jade');
app.set('views', './views');
app.use((req, res, next) => {
  const requestId = getTimestamp();
  // console.log('Time Started',
  //     moment().toISOString(true));
  const url = req.protocol + '://' + req.get('host') + req.originalUrl;
  // console.log('Response', requestId);

  const cleanup = () => {
    res.removeListener('finish', logFn);
    res.removeListener('close', abortFn);
    res.removeListener('error', errorFn);
  };
  const logFn = (a, b, c) => {
    // console.log('Response', requestId);
    console.log(
        'params', JSON.stringify(req.params), 'query',
        JSON.stringify(req.query), 'response', res.body,
        'Time Elapsed', `${moment().subtract(requestId).milliseconds()}s`);
    cleanup();
  };

  const abortFn = () => {
    cleanup();
    console.log('Aborted Time Elapsed',
        moment().subtract(requestId).milliseconds());
  };
  const errorFn = (err) => {
    cleanup();
    console.log('Time Ended Error',
        moment().subtract(requestId).milliseconds());
  };

  res.on('finish', logFn);
  res.on('close', abortFn);
  res.on('error', errorFn);
  return next();
});

app.use('/api/v1', require('./routes/v1'));

app.use((req, res, next) => {
  return next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err && err.status || 500);
  res.send({error: err && err.message || 'An error occurred'});
});
module.exports = app;
