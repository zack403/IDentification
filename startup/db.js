// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('postgresql://postgres:!Pass4sure@localhost:5432/IDentificationDB');


// module.exports = sequelize;
const { Pool } = require('pg');
const winston = require('winston');

const connectionString = process.env.db;

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
