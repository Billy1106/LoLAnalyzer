const Pool = require("pg").Pool;
require('dotenv').config()
const pool = new Pool({
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    host:process.env.DB_HOST,
    port:5432,
    database:process.env.DB_DATABASE,
    ssl: {
        require: true,
        rejectUnauthorized: false 
    }
});
//encrypted Database Credentials
//if you need one, plz ask me

module.exports = pool;
