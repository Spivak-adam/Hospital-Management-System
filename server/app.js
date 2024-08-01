const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var app = express();
var PORT = 2100;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Conect to Database
var db = require('./db-connector');

// Pull from Patients Entity
app.get('/patients', async (req, res) => {
  try {
    // Define our query     
    query1 = "SELECT * FROM Patients;"

    // Querry Data
    db.pool.query(query1, function (err, results, fields) {
      // Send data in a JSON file to browser
      console.log("Sending JSON information to /patients");
      console.log("Patients:\n",JSON.stringify(results))
      res.send(JSON.stringify(results));
    })

  } catch (error) {
    // Handle Errors
    console.error('Database operation failed:', error, '. Unable to pull Patients.');
    res.status(500).send('Server error');
  }

});

// Pull from Appointments Entity
app.get('/appointments', async (req, res) => {
  try {
    // Define our query     
    query1 = "SELECT * FROM Appointments;"

    // Querry Data
    db.pool.query(query1, function (err, results, fields) {
      // Send data in a JSON file to browser
      console.log("Sending JSON information to /appointments");
      console.log("Appointments:\n",JSON.stringify(results))
      res.send(JSON.stringify(results));
    })

  } catch (error) {
    // Handle Errors
    console.error('Database operation failed:', error, '. Unable to pull Appointments.');
    res.status(500).send('Server error');
  }

});

// Pull from Doctors Entity
app.get('/doctors', async (req, res) => {
  try {
    // Define our query     
    query1 = "SELECT * FROM Doctors;"

    // Querry Data
    db.pool.query(query1, function (err, results, fields) {
      // Send data in a JSON file to browser
      console.log("Sending JSON information to /doctors");
      console.log("Doctors:\n",JSON.stringify(results))
      res.send(JSON.stringify(results));
    })

  } catch (error) {
    // Handle Errors
    console.error('Database operation failed:', error, '. Unable to pull Doctors.');
    res.status(500).send('Server error');
  }

});

// Pull from Treatments Entity
app.get('/treatments', async (req, res) => {
  try {
    // Define our query     
    query1 = "SELECT * FROM Treatments;"

    // Querry Data
    db.pool.query(query1, function (err, results, fields) {
      // Send data in a JSON file to browser
      console.log("Sending JSON information to /treatments");
      console.log("Treatments:\n",JSON.stringify(results))
      res.send(JSON.stringify(results));
    })

  } catch (error) {
    // Handle Errors
    console.error('Database operation failed:', error, '. Unable to pull Treatments.');
    res.status(500).send('Server error');
  }

});

// Pull from Rooms Entity
app.get('/rooms', async (req, res) => {
  try {
    // Define our query     
    query1 = "SELECT * FROM Rooms;"

    // Querry Data
    db.pool.query(query1, function (err, results, fields) {
      // Send data in a JSON file to browser
      console.log("Sending JSON information to /rooms");
      console.log("Rooms:\n",JSON.stringify(results))
      res.send(JSON.stringify(results));
    })

  } catch (error) {
    // Handle Errors
    console.error('Database operation failed:', error, '. Unable to pull Rooms.');
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