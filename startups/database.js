'use strict';


const mongoose = require("mongoose");
if (process.env.NODE_ENV == "development") mongoose.set('debug', true);


const uri = process.env.MONGODB_URL
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(uri, options)
  .then(() => {
console.log({mongo: process.env.MONGODB_URL})

    console.log('Connected to the database');
    // Your code here
  })
  .catch(error => {
    console.error('Error connecting to the database:', error);
  });

const db = mongoose.connection;

db.on('error', error => {
  console.error('Database connection error:', error);
});

db.once('open', () => {
  console.log('Connected to the database');
  // Your code here
});