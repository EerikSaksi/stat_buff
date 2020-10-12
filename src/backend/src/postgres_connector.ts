const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  query: {
    raw: true,
  },
});

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
})
User.removeAttribute("id")

const initialize_postgres = async () => {
  await sequelize.sync({force: true})
  await User.create({ username: 'orek' })
  await User.sync()
}
module.exports = initialize_postgres
