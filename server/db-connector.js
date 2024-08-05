const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs340_lazarm',
    password: '8035',
    database: 'cs340_lazarm'
});

module.exports.pool = pool;
