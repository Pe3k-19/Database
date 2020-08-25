const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: '127.0.0.1', 
    user:'root', 
    password: '12345',
    database: 'tasks'
});

pool.getConnection()



module.exports = pool;