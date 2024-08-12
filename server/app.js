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

/* Perform Rooms CRUD operations
--------------------------------------------*/
// Read from Rooms Entity
app.get('/rooms', async (req, res) => {
  try {
    let query1 = "SELECT * FROM Rooms";
    const { available } = req.query;

    if (available) {
      query1 += " WHERE occupied = 'No'";
    }

    // Query Data
    db.pool.query(query1, function (err, results, fields) {
      if (err) {
        console.error('Database operation failed:', err, '. Unable to pull Rooms.');
        res.status(500).send('Server error');
      } else {
        // Send data in a JSON file to browser
        console.log("Successfully retreived Rooms");
        res.send(JSON.stringify(results));
      }
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

/* Perform Patient CRUD operations
--------------------------------------------*/
// Pull from Patients Entity
app.get('/patients', async (req, res) => {
  try {
    // Define our query     
    query1 = "SELECT * FROM Patients;"

    // Query Data
    db.pool.query(query1, function (err, results, fields) {
      // Send data in a JSON file to browser
      console.log("Sending JSON information to /patients");
      res.send(JSON.stringify(results));
    })

  } catch (error) {
    // Handle Errors
    console.error('Database operation failed:', error, '. Unable to pull Patients.');
    res.status(500).send('Server error');
  }
});

// Add Patient
app.post('/patients', async (req, res) => {
  try {
    const { firstName, lastName, primaryDoctorID, dateOfBirth, contactPhone, contactEmail, address, emergencyContactName, emergencyContactPhone, emergencyContactEmail, checkInTime, bloodType, sex, gender, age, language, patientType, releaseDate } = req.body;

    const query = `
      INSERT INTO Patients (
        firstName, lastName, primaryDoctorID, dateOfBirth, contactPhone, contactEmail, address, emergencyContactName, emergencyContactPhone, emergencyContactEmail, checkInTime, bloodType, sex, gender, age, language, patientType, releaseDate
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.pool.query(query, [firstName, lastName, primaryDoctorID, dateOfBirth, contactPhone, contactEmail, address, emergencyContactName, emergencyContactPhone, emergencyContactEmail, checkInTime, bloodType, sex, gender, age, language, patientType, releaseDate], function (err, results, fields) {
      if (err) {
        console.error('Database operation failed:', err);
        res.status(500).send('Server error');
        return;
      }
      res.send('Patient added successfully');
    });

  } catch (error) {
    // Handle Errors
    console.error('Database operation failed:', error, '. Unable to add Patient.');
    res.status(500).send('Server error');
  }
});

// Update Patient
app.put('/patients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, primaryDoctorID, dateOfBirth, contactPhone, contactEmail, address, emergencyContactName, emergencyContactPhone, emergencyContactEmail, checkInTime, bloodType, sex, gender, age, language, patientType, releaseDate } = req.body;

    const query = `
      UPDATE Patients 
      SET firstName = ?, lastName = ?, primaryDoctorID = ?, dateOfBirth = ?, contactPhone = ?, contactEmail = ?, address = ?, emergencyContactName = ?, emergencyContactPhone = ?, emergencyContactEmail = ?, checkInTime = ?, bloodType = ?, sex = ?, gender = ?, age = ?, language = ?, patientType = ?, releaseDate = ?
      WHERE patientID = ?
    `;

    db.pool.query(query, [firstName, lastName, primaryDoctorID, dateOfBirth, contactPhone, contactEmail, address, emergencyContactName, emergencyContactPhone, emergencyContactEmail, checkInTime, bloodType, sex, gender, age, language, patientType, releaseDate, id], function (err, results, fields) {
      if (err) {
        console.error('Database operation failed:', err);
        res.status(500).send('Server error');
        return;
      }
      res.send('Patient updated successfully');
    });

  } catch (error) {
    // Handle Errors
    console.error('Database operation failed:', error, '. Unable to update Patient.');
    res.status(500).send('Server error');
  }
});

// Delete Patient
app.delete('/patients/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const query = "DELETE FROM Patients WHERE patientID = ?";

    db.pool.query(query, [id], function (err, results, fields) {
      if (err) {
        console.error('Database operation failed:', err);
        res.status(500).send('Server error');
        return;
      }
      res.send('Patient deleted successfully');
    });

  } catch (error) {
    // Handle Errors
    console.error('Database operation failed:', error, '. Unable to delete Patient.');
    res.status(500).send('Server error');
  }
});

/* Perform Doctors CRUD operations
--------------------------------------------*/
// GET all doctors
app.get('/doctors', async (req, res) => {
  try {
    const query = "SELECT * FROM Doctors;";
    db.pool.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching doctors:', err);
        res.status(500).send('Server error');
      } else {
        console.log("Successfully retreived Doctors");
        res.send(results);
      }
    });
  } catch (error) {
    console.error('Database operation failed:', error);
    res.status(500).send('Server error');
  }
});

// ADD new doctor
app.post('/doctors', async (req, res) => {
  try {
    const { firstName, lastName, specialization, email, phoneNumber, image, language, gender } = req.body;
    const query = "INSERT INTO Doctors (firstName, lastName, specialization, email, phoneNumber, image, language, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [firstName, lastName, specialization, email, phoneNumber, image, language, gender];

    db.pool.query(query, values, (err, results) => {
      if (err) {
        console.error('Error adding doctor:', err);
        res.status(500).send('Server error');
      } else {
        res.send('Doctor added successfully');
      }
    });
  } catch (error) {
    console.error('Database operation failed:', error);
    res.status(500).send('Server error');
  }
});

// UPDATE doctor
app.put('/doctors/:id', async (req, res) => {
  try {
    const doctorID = req.params.id;
    const { firstName, lastName, specialization, email, phoneNumber, image, language, gender } = req.body;
    const query = "UPDATE Doctors SET firstName = ?, lastName = ?, specialization = ?, email = ?, phoneNumber = ?, image = ?, language = ?, gender = ? WHERE doctorID = ?";
    const values = [firstName, lastName, specialization, email, phoneNumber, image, language, gender, doctorID];

    db.pool.query(query, values, (err, results) => {
      if (err) {
        console.error('Error updating doctor:', err);
        res.status(500).send('Server error');
      } else {
        res.send('Doctor updated successfully');
      }
    });
  } catch (error) {
    console.error('Database operation failed:', error);
    res.status(500).send('Server error');
  }
});

// DELETE doctor
app.delete('/doctors/:id', async (req, res) => {
  try {
    const doctorID = req.params.id;
    const query = "DELETE FROM Doctors WHERE doctorID = ?";

    db.pool.query(query, [doctorID], (err, results) => {
      if (err) {
        console.error('Error deleting doctor:', err);
        res.status(500).send('Server error');
      } else {
        res.send('Doctor deleted successfully');
      }
    });
  } catch (error) {
    console.error('Database operation failed:', error);
    res.status(500).send('Server error');
  }
});

/* Perform Appointments CRUD operations
--------------------------------------------*/
// Pull from Appointments Entity
app.get('/appointments', async (req, res) => {
  try {
    // Define our query     
    const query = "SELECT * FROM Appointments;"

    // Query Data
    db.pool.query(query, (err, results) => {
      if (err) throw err;
      res.send(JSON.stringify(results));
    });

  } catch (error) {
    console.error('Database operation failed:', error, '. Unable to pull Appointments.');
    res.status(500).send('Server error');
  }
});

// Add a new appointment
app.post('/appointments', async (req, res) => {
  try {
    const { doctorID, patientID, roomID, status, reason, checkInTime, checkOutTime, date } = req.body;
    const query = "INSERT INTO Appointments (doctorID, patientID, roomID, status, reason, checkInTime, checkOutTime, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [doctorID, patientID, roomID, status, reason, checkInTime, checkOutTime, date];

    db.pool.query(query, values, (err, results) => {
      if (err) {
        console.error('Error adding appointment:', err);
        res.status(500).send('Server error');
      } else {
        res.send('Appointment added successfully');
      }
    });

  } catch (error) {
    console.error('Database operation failed:', error, '. Unable to add Appointment.');
    res.status(500).send('Server error');
  }
});

// Update an existing appointment
app.put('/appointments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { doctorID, patientID, roomID, status, reason, checkInTime, checkOutTime, date } = req.body;
    const query = "UPDATE Appointments SET doctorID = ?, patientID = ?, roomID = ?, status = ?, reason = ?, checkInTime = ?, checkOutTime = ?, date = ? WHERE appointmentID = ?";
    const values = [doctorID, patientID, roomID, status, reason, checkInTime, checkOutTime, date, id];

    db.pool.query(query, values, (err, results) => {
      if (err) {
        console.error('Error updating appointment:', err);
        res.status(500).send('Server error');
      } else {
        res.send('Appointment updated successfully');
      }
    });

  } catch (error) {
    console.error('Database operation failed:', error, '. Unable to update Appointment.');
    res.status(500).send('Server error');
  }
});

// Delete an appointment
app.delete('/appointments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM Appointments WHERE appointmentID = ?";

    db.pool.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error deleting appointment:', err);
        res.status(500).send('Server error');
      } else {
        res.send('Appointment deleted successfully');
      }
    });

  } catch (error) {
    console.error('Database operation failed:', error, '. Unable to delete Appointment.');
    res.status(500).send('Server error');
  }
});

/* Perform Treatments CRUD operations
--------------------------------------------*/
// Get treatments information only
app.get('/treatmentsonly', async (req, res) => {
  try {
    // Select all the information from the treatments table 
    let query1 = `Select * from Treatments;`;

    // Querry Data from Treatments
    db.pool.query(query1, function (err, results, fields) {
      let data = results

      console.log("Sending treatment only JSON information to /treatments");
      res.send(JSON.stringify(data));

    })

  } catch (error) {
    // Handle Errors
    console.error('Database operation failed:', error, '. Unable to read Treatments.');
    res.status(500).send('Server error');
  }

});

// Read from Treatments Entity
app.get('/treatments', async (req, res) => {
  try {
    // Select all the information from the treatments table 
    let query1 = `Select Treatments.*, Doctors.lastName
                  from Treatments
                  Inner join DoctorTreatment on DoctorTreatment.treatmentID = Treatments.treatmentID
                  Inner join Doctors on DoctorTreatment.doctorID = Doctors.doctorID
                  ORDER BY treatmentID;`

    // Querry Data from Treatments
    db.pool.query(query1, function (err, results, fields) {
      let data = results

      console.log("Sending treatment JSON information to /treatments");
      res.send(JSON.stringify(data));

    })

  } catch (error) {
    // Handle Errors
    console.error('Database operation failed:', error, '. Unable to read Treatments.');
    res.status(500).send('Server error');
  }

});

//Create Treatments from user
app.post('/treatments', (req, res) => {
  let treatData = req.body;

  console.log("INSERT treatment data submission form", treatData);

  let query1 = `INSERT INTO Treatments (patientID, description, date, diagnosis, symptoms) VALUES (?, ?, ?, ?, ?);`;
  let query2 = `INSERT INTO DoctorTreatment (treatmentID, doctorID) VALUES (?, ?);`;

  db.pool.query(query1, [treatData['patientID'], treatData['description'], treatData['date'], treatData['diagnosis'], treatData['symptoms']], function (err, result) {
    if (err) {
      console.log("Error in Inserting Treatment:", err);
      return res.sendStatus(400);
    }
    else {
      console.log("Inserted into Treatments, result:", result);

      const treatmentID = result.insertId;

      db.pool.query(query2, [treatmentID, treatData['doctorID']], function (err, result) {
        if (err) {
          console.log(err)
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).send("Error: Duplicate entry. Doctor already assigned to this treatment.");
          } else {
            console.log("Error in query2:", err);
            return res.sendStatus(400);
          }
        }
        console.log("Successfully Inserted into Treatments Table, and DoctorTreatments");
        res.send("Successfully Inserted into Treatments Table, and DoctorTreatments");
      });
    }
  });
});


// Update existing treatment
app.put('/treatments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description, date, diagnosis, symptoms, doctorID, lastName } = req.body;
    const query1 = "UPDATE Treatments SET description = ?, date = ?, diagnosis = ?, symptoms = ? WHERE treatmentID = ?";
    const query2 = "SELECT doctorID FROM Doctors WHERE Doctors.lastName = ?;"
    const query3 = "UPDATE DoctorTreatment SET doctorID = ? WHERE treatmentID = ? and DoctorID = ?;";

    const values = [description, date, diagnosis, symptoms, id];
    const doctorLastName = [lastName];

    console.log(req.body);

    db.pool.query(query1, values, (err, results) => {
      if (err) {
        console.error('Error updating treatment:', err);
        res.status(500).send('Server error');
      } else {
        db.pool.query(query2, doctorLastName, (err, results) => {
          if (err) {
            console.error('Error getting DoctorID:', err);
            res.status(500).send('Server error');
          } else {

            const originalDoctorID = results[0].doctorID;
            const doctorValue = [doctorID, id, originalDoctorID];

            db.pool.query(query3, doctorValue, (err, results) => {
              if (err) {
                console.error('Error updating DoctorTreatment:', err);
                res.status(500).send('Server error');
              }
              else {
                res.send('DoctorTreatment updated successfully');
              }
            })
          }
        })
      }
    });

  } catch (error) {
    console.error('Database operation failed:', error, '. Unable to update Treatment.');
    res.status(500).send('Server error');
  }
});

// Delete treatment and doctorTreatment Relationship
app.delete('/treatments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const values = [id];
    const query1 = "DELETE FROM Treatments WHERE treatmentID = ?;";


    db.pool.query(query1, values, (err, results) => {
      if (err) {
        console.error('Foreign Key Error:', err);
        res.status(500).send('Server error');
      } else {
        console.log('Treatment and DoctorTreatment deleted successfully');
        res.send('DoctorTreatment deleted successfully');
      }
    });

  } catch (error) {
    console.error('Database operation failed:', error, '. Unable to delete Treatment.');
    res.status(500).send('Server error');
  }
});

/* Perform DoctorTreatments CRUD operations
--------------------------------------------*/
// Read from Treatments Entity
app.get('/doctortreatment', async (req, res) => {
  try {
    query1 = `SELECT * From DoctorTreatment;`

    db.pool.query(query1, function (err, results, fields) {

      console.log("Sending treatment JSON information to /DoctorTreatments");
      res.send(JSON.stringify(results));
    })

  }
  catch (error) {
    // Handle Errors
    console.error('Database operation failed:', error, '. Unable to read DoctorTreaments.');
    res.status(500).send('Server error');
  }
});

app.post('/doctortreatment', async (req, res) => {
  try {
    const { treatmentID, doctorID } = req.body;
    const values = [treatmentID, doctorID];

    query1 = `INSERT INTO DoctorTreatment (treatmentID, doctorID) VALUES (?, ?);`

    db.pool.query(query1, values, (err, results) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).send("Error: Duplicate entry. Doctor already assigned to this treatment.");
        }
        else {
          console.error('Foreign Key Error:', err);
          res.status(500).send('Server error');
        }
      } else {
        console.log("Sending DoctorTreatment JSON information to /DoctorTreatments");
        res.send("Sending DoctorTreatment JSON information to /DoctorTreatments");
      }
    })

  }
  catch (error) {
    // Handle Errors
    console.error('Database operation failed:', error, '. Unable to read DoctorTreaments.');
    res.status(500).send('Server error');
  }
})

app.delete('/doctortreatment/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const values = [id];
    const query1 = "Select doctorID FROM DoctorTreatment WHERE treatmentID = ?;";
    const query2 = "DELETE FROM DoctorTreatment WHERE treatmentID = ? and doctorID = ?;";

    db.pool.query(query1, values, (err, results) => {
      if (err) {
        console.error('Insert DoctorTreatment Error:', err);
        res.status(500).send('Server error');
      } else {
        const doctorID = results[0].doctorID;
        const deleteValues = [id, doctorID];

        db.pool.query(query2, deleteValues, (err, results) => {
          if (err) {
            console.error('Error deleting DoctorTreatment:', err);
            return res.status(500).send('Server error');
          }
          console.log('DoctorTreatment deleted successfully');
          return res.send('DoctorTreatment deleted successfully');
        });
      }
    });
  } catch (error) {
    console.error('Database operation failed:', error, '. Unable to delete Treatment.');
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
