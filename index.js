require("dotenv").config();
const winston = require("winston");
require('express-async-errors');
const express = require("express");
const app = express();
const morgan = require('morgan');
const db = require('./startup/db');
const {userTable} = require('./models/user');


//INITIATE CONNECTION TO THE DATABASE HERE, AND CREATE NECESSARY TABLES
const sync = async () => {
    try {
      await db.connect();
      await userTable(); 
    } catch (error) {
      console.log(error);
    }
}
sync();

if(app.get('env') === 'development') {
  app.use(morgan('combined'));
  winston.info('Morgan Enabled');
}

app.use(express.static('public'));


require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/production")(app);

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
   winston.info(`Listening on port ${port}...`)
);

module.exports = server;