const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  query: {
    raw: true
  }

}) // Example for postgres

const user = sequelize.define('user', {

})
require('dotenv').config();
