import mysql from 'mysql'

var db = mysql.createPool({
    connectionLimit : 10,
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs340_spivaka',
    password: '1317',
    database: 'cs340_spivaka'
})

export default db;