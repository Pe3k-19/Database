const mariadb = require('mariadb');
const dotenv = require('dotenv');
dotenv.config();


const pool = mariadb.createPool({
    host: process.env.HOST, 
    user: process.env.USER, 
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
    connectionLimit: process.env.CONN_LIMIT,
});

pool.getConnection();



module.exports = pool;