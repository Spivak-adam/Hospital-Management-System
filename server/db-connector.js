// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'flip4.engr.oregonstate.edu',
    user            : 'cs340_lazarm',
    password        : '8035',
    database        : 'cs340_lazarm'
})

// Export it for use in our application
module.exports.pool = pool;