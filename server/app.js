const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var app = express();
var PORT = 2102;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Conect to Database
var db = require('./db-connector');

// Pull from Rooms Entity
app.get('/rooms', async (req, res) => {
    try {
      // Define our query
      const query1 = "SELECT * FROM Rooms;";
  
      // Query Data
      db.pool.query(query1, function (err, results, fields) {
        if (err) {
          console.error('Database operation failed:', err);
          res.status(500).send('Server error');
          return;
        }
        // Debugging: print the results to ensure data is fetched
        console.log("Query Results:", results);
        if (results.length === 0) {
          console.error('No data found for Rooms.');
          res.status(404).send('No data found');
          return;
        }
        // Send data in a JSON file to browser
        console.log("Sending JSON information to /rooms");
        res.json(results); // Ensure we send JSON response
      });
    } catch (error) {
      // Handle Errors
      console.error('Database operation failed:', error, '. Unable to pull Rooms.');
      res.status(500).send('Server error');
    }
  });
  
  

// Add a new room
app.post('/rooms', async (req, res) => {
    try {
      const { patientID, doctorID, location, number, occupied, accommodations, lengthOfStay } = req.body;
  
      // Log the received data
      console.log("Received data for new room:", req.body);
  
      // Define the insert query
      const query = `
        INSERT INTO Rooms (patientID, doctorID, location, number, occupied, accommodations, lengthOfStay)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
  
      // Insert the new room into the database
      db.pool.query(query, [patientID, doctorID, location, number, occupied, accommodations, lengthOfStay], (err, results, fields) => {
        if (err) {
          console.error('Database operation failed:', err.message);
          res.status(500).send('Server error');
          return;
        }
        res.status(201).send('Room added successfully');
      });
    } catch (error) {
      console.error('Error adding room:', error.message);
      res.status(500).send('Server error');
    }
  });
        



  // Pull from Patients Entity
app.get('/patients', async (req, res) => {
    try {
      // Define our query     
      const query = "SELECT * FROM Patients;"
  
      // Query Data
      db.pool.query(query, function (err, results, fields) {
        if (err) {
          console.error('Database operation failed:', err);
          res.status(500).send('Server error');
          return;
        }
        // Send data in a JSON file to browser
        console.log("Sending JSON information to /patients");
        console.log("Patients:\n", JSON.stringify(results));
        res.send(JSON.stringify(results));
      });
  
    } catch (error) {
      // Handle Errors
      console.error('Database operation failed:', error, '. Unable to pull Patients.');
      res.status(500).send('Server error');
    }
  });
  

  // Update a Room
app.put('/rooms/:roomID', async (req, res) => {
    try {
      const roomID = req.params.roomID;
      const { patientID, doctorID, location, number, occupied, accommodations, lengthOfStay } = req.body;
  
      const query = `UPDATE Rooms 
                     SET patientID = ?, doctorID = ?, location = ?, number = ?, occupied = ?, accommodations = ?, lengthOfStay = ?
                     WHERE roomID = ?`;
  
      db.pool.query(query, [patientID, doctorID, location, number, occupied, accommodations, lengthOfStay, roomID], function (err, results, fields) {
        if (err) {
          console.error('Database operation failed:', err);
          res.status(500).send('Server error');
          return;
        }
        res.send({ message: 'Room updated successfully!' });
      });
    } catch (error) {
      console.error('Database operation failed:', error);
      res.status(500).send('Server error');
    }
  });

  // Delete a Room
app.delete('/rooms/:roomID', async (req, res) => {
    try {
      const roomID = req.params.roomID;
  
      const query = `DELETE FROM Rooms WHERE roomID = ?`;
  
      db.pool.query(query, [roomID], function (err, results, fields) {
        if (err) {
          console.error('Database operation failed:', err);
          res.status(500).send('Server error');
          return;
        }
        res.send({ message: 'Room deleted successfully!' });
      });
    } catch (error) {
      console.error('Database operation failed:', error);
      res.status(500).send('Server error');
    }
  });

  
  



  app.post('/patients', async (req, res) => {
    try {
      const { firstName, lastName, roomID, primaryDoctorID, appointmentID, dateOfBirth, contactPhone, contactEmail, address, emergencyContactName, emergencyContactPhone, emergencyContactEmail, checkInTime, bloodType, sex, gender, age, language, patientType, releaseDate } = req.body;
  
      // Log the received data
      console.log("Received data for new patient:", req.body);
  
      // Define the insert query
      const query = `
        INSERT INTO Patients (firstName, lastName, roomID, primaryDoctorID, appointmentID, dateOfBirth, contactPhone, contactEmail, address, emergencyContactName, emergencyContactPhone, emergencyContactEmail, checkInTime, bloodType, sex, gender, age, language, patientType, releaseDate)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
  
      // Insert the new patient into the database
      db.pool.query(query, [firstName, lastName, roomID, primaryDoctorID, appointmentID, dateOfBirth, contactPhone, contactEmail, address, emergencyContactName, emergencyContactPhone, emergencyContactEmail, checkInTime, bloodType, sex, gender, age, language, patientType, releaseDate], (err, results, fields) => {
        if (err) {
          console.error('Database operation failed:', err.message);
          res.status(500).send('Server error');
          return;
        }
        res.status(201).send('Patient added successfully');
      });
    } catch (error) {
      console.error('Error adding patient:', error.message);
      res.status(500).send('Server error');
    }
  });

  


// Build Application using build folder in client
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, function () {
  console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
