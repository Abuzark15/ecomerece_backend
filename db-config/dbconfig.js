const { Sequelize } = require('sequelize');
require('dotenv').config();

const process = require('process');
const dbname = process.env.DATABASE;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;
const Host = process.env.HOST
const dialet = process.env.DBMS

// console.log(dbname);
// console.log(username);
// console.log(password);
// console.log(Host);
// console.log(dialet);

const sequelize = new Sequelize(dbname, username, password, {
    host: Host,
    dialect: dialet 
  });

const DB = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    
}
DB();

module.exports = sequelize;