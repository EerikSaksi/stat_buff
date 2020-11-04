const {Client} = require('pg')
const client = new Client(process.env.DATABASE_URL)
require('dotenv').config();

const initialize_postgres = async () => {

}

module.exports = initialize_postgres
