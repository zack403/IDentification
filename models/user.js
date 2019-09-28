const Joi = require('joi');
const db = require('../startup/db');

const userTable = async () => {
  return await db.query(`
  CREATE TABLE IF NOT EXISTS
   users(
     id SERIAL NOT NULL,
     description VARCHAR(300) NOT NULL,
     image VARCHAR,
     created_at TIMESTAMP NOT NULL DEFAULT NOW(),
     PRIMARY KEY (id)
   )`);
 } 

 const validateUser = user => {
   const schema = {
     description: Joi.string().required(),
     created_at: Joi.date()
   };

   return Joi.validate(user, schema);
 }

const userMethods =  {
  findAll: async () => {
    const text = 'SELECT * FROM users'
    return await db.query(text);
  },
  find: async (search) => {
    const text = `SELECT * FROM users WHERE description LIKE '%${search}%'`
    return await db.query(text);
  },
  save: async (description, image, 
        ) => {
      const text = `INSERT INTO
      users(description, image)
      VALUES($1, $2)
      returning *`;
      const values = [
        description,
        image
      ]
     return await db.query(text, values);
  }
}

module.exports.User = userMethods;
module.exports.validate = validateUser;
module.exports.userTable = userTable;


// const Sequelize = require('sequelize');
// const sequelize = require('../startup/db');

// const User = sequelize.define('user', {
//   id: {
//       type: Sequelize.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false
//   },
//   description: {
//       type: Sequelize.STRING,
//       allowNull: false
//   },
//   image: Sequelize.STRING
// })

// module.exports = User;