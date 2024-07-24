var mysql = require('mysql')

var pool = mysql.createPool({
    connectionLimit : 10,
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs340_spivaka',
    password: '1317',
    database: 'cs340_spivaka'
})

module.exports.pool = pool;