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
    },
    connectionString: "postgres://xoydmshrxsbuyg:9da91379cc7b108f8a0859fdff8d27853bdc7cf7f34636dd8cae11973ffb610a@ec2-50-19-255-190.compute-1.amazonaws.com:5432/dbqcj5mvqemv9b"
});
//encrypted Database Credentials
//if you need one, plz ask me

module.exports = pool;
