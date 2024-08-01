const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var app = express();
var PORT = 2100;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Conect to Database
var db = require('./db-connector');

// Pull from Rooms Entity
app.get('/rooms', async (req, res) => {
  try {
    // Define our query     
    query1 = "SELECT * FROM Rooms;"

    // Querry Data
    db.pool.query(query1, function (err, results, fields) {
      // Send data in a JSON file to browser
      console.log("Sending JSON information to /rooms");
      res.send(JSON.stringify(results));
    })

  } catch (error) {
    // Handle Errors
    console.error('Database operation failed:', error);
    res.status(500).send('Server error');
  }

});


// Build Application using build folder in client
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, function () {
  console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.')
});