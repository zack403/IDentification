// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('postgresql://postgres:!Pass4sure@localhost:5432/IDentificationDB');


// module.exports = sequelize;
const { Pool } = require('pg');
const config = require('config');
const winston = require('winston');

const connectionString = "postgres://tmeeffqcywitbt:4e61610ea33197f5a9c16c0eb88de56587cf5702b08efdb9cd20ac067038473f@ec2-54-83-201-84.compute-1.amazonaws.com:5432/ddtt5t7uipoa85";

const pool = new Pool({
    connectionString: connectionString
})


module.exports = {
  connect: async () => {
    try {
         await pool.connect();
        winston.info('Connected to the Database', )
    } catch (error) {
        winston.info('Failed to connect to the Database', error)
    }
},
  query: (text, params) => pool.query(text, params)

}
