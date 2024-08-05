require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Conect to Database
var db = require('./db-connector');

/* Perform Patients CRUD operations
--------------------------------------------*/
// Read from Patients Entity
app.get('/patients', async (req, res) => {
  try {
    // Define our query     
    query1 = "SELECT * FROM Patients;"

    // Querry Data
    db.pool.query(query1, function (err, results, fields) {
      // Send data in a JSON file to browser
      console.log("Sending JSON information to /patients");
      console.log("Patients:\n", JSON.stringify(results))
      res.send(JSON.stringify(results));
    })

  } catch (error) {
    // Handle Errors
    console.error('Database operation failed:', error, '. Unable to read Patients.');
    res.status(500).send('Server error');
  }

});

/* Perform Appointments CRUD operations
--------------------------------------------*/
// Read from Appointments Entity
app.get('/appointments', async (req, res) => {
  try {
    // Define our query     
    query1 = "SELECT * FROM Appointments;"

    // Querry Data
    db.pool.query(query1, function (err, results, fields) {
      // Send data in a JSON file to browser
      console.log("Sending JSON information to /appointments");
      console.log("Appointments:\n", JSON.stringify(results))
      res.send(JSON.stringify(results));
    })

  } catch (error) {
    // Handle Errors
    console.error('Database operation failed:', error, '. Unable to read Appointments.');
    res.status(500).send('Server error');
  }

});

/* Perform Doctors CRUD operations
--------------------------------------------*/
// Read from Doctors Entity
app.get('/doctors', async (req, res) => {
  try {
    // Define our query     
    query1 = "SELECT * FROM Doctors;"

    // Querry Data
    db.pool.query(query1, function (err, results, fields) {
      // Send data in a JSON file to browser
      console.log("Sending JSON information to /doctors");
      console.log("Doctors:\n", JSON.stringify(results))
      res.send(JSON.stringify(results));
    })

  } catch (error) {
    // Handle Errors
    console.error('Database operation failed:', error, '. Unable to read Doctors.');
    res.status(500).send('Server error');
  }

});

/* Perform Treatments CRUD operations
--------------------------------------------*/
// Read from Treatments Entity
app.get('/treatments', async (req, res) => {
  try {
    // Select all the information from the treatments table    
    let query1 = `Select Treatments.*, Doctors.lastName from Treatments Inner join DoctorTreatment on DoctorTreatment.treatmentID = Treatments.treatmentID Inner join Doctors on DoctorTreatment.doctorID = Doctors.doctorID ORDER BY treatmentID;`

    // Select all the information from the doctors table
    let query2 = `Select * FROM Doctors;`

    // Querry Data from Treatments
    db.pool.query(query1, function (err, results, fields) {
      let treatData = results
      //console.log("Treatments:\n", treatData)

      // Querry Data from Doctors
      db.pool.query(query2, function (err, results, fields) {
        // Send data in a JSON file to browser
        let doctorData = results
        //console.log("Doctors for treatments:\n", doctorData)

        console.log("Sending treatment and doctor JSON information to /treatments");
        res.send(JSON.stringify({ treatment: treatData, doctors: doctorData }));
      })

    })

  } catch (error) {
    // Handle Errors
    console.error('Database operation failed:', error, '. Unable to read Treatments.');
    res.status(500).send('Server error');
  }

});

//Create Treatments from user
app.post('/create-treatments', (req, res) => {
  let treatData = req.body;

  console.log("INSERT treatment data submission form", treatData);

  query1 = `SET FOREIGN_KEY_CHECKS=0;`;
  query2 = `INSERT INTO Treatments (patientID, description, date, diagnosis, symptoms) VALUES ('${treatData['patientID']}','${treatData['description']}','${treatData['date']}','${treatData['diagnosis']}','${treatData['symptoms']}')`
  query3 = `INSERT INTO DoctorTreatment (treatmentID, doctorID) VALUES (LAST_INSERT_ID(), ${treatData['doctorID']})`
  query4 = `SET FOREIGN_KEY_CHECKS=1;`;

  db.pool.query(query1, function (error, rows, fields) {
    db.pool.query(query2, function (error, rows, fields) {
      db.pool.query(query3, function (error, rows, fields) {
        db.pool.query(query4, function (error, rows, fields) {
          if (error) {
            console.log(error)
            res.sendStatus(400)
          }
          else {
            console.log("Successfully Inserted into Treatments Table, and DoctorTreatments")
            res.redirect('/treatments');
          }
        })
      })
    })


  })

})


/* Perform Rooms CRUD operations
--------------------------------------------*/
// Read from Rooms Entity
app.get('/rooms', async (req, res) => {
  try {
    // Define our query     
    query1 = "SELECT * FROM Rooms;"

    // Querry Data
    db.pool.query(query1, function (err, results, fields) {
      // Send data in a JSON file to browser
      console.log("Sending JSON information to /rooms");
      console.log("Rooms:\n", JSON.stringify(results))
      res.send(JSON.stringify(results));
    })

  } catch (error) {
    // Handle Errors
    console.error('Database operation failed:', error, '. Unable to read Rooms.');
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