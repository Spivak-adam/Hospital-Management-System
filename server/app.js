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





  // Pull from Patients Entity
// Pull from Patients Entity
app.get('/patients', async (req, res) => {
  try {
    // Define our query     
    query1 = "SELECT * FROM Patients;"

    // Query Data
    db.pool.query(query1, function (err, results, fields) {
      // Send data in a JSON file to browser
      console.log("Sending JSON information to /patients");
      console.log("Patients:\n", JSON.stringify(results))
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
    const { firstName, lastName, roomID, primaryDoctorID, appointmentID, dateOfBirth, contactPhone, contactEmail, address, emergencyContactName, emergencyContactPhone, emergencyContactEmail, checkInTime, bloodType, sex, gender, age, language, patientType, releaseDate } = req.body;

    const query = `
      INSERT INTO Patients (
        firstName, lastName, roomID, primaryDoctorID, appointmentID, dateOfBirth, contactPhone, contactEmail, address, emergencyContactName, emergencyContactPhone, emergencyContactEmail, checkInTime, bloodType, sex, gender, age, language, patientType, releaseDate
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.pool.query(query, [firstName, lastName, roomID, primaryDoctorID, appointmentID, dateOfBirth, contactPhone, contactEmail, address, emergencyContactName, emergencyContactPhone, emergencyContactEmail, checkInTime, bloodType, sex, gender, age, language, patientType, releaseDate], function (err, results, fields) {
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
    const { firstName, lastName, roomID, primaryDoctorID, appointmentID, dateOfBirth, contactPhone, contactEmail, address, emergencyContactName, emergencyContactPhone, emergencyContactEmail, checkInTime, bloodType, sex, gender, age, language, patientType, releaseDate } = req.body;

    const query = `
      UPDATE Patients 
      SET firstName = ?, lastName = ?, roomID = ?, primaryDoctorID = ?, appointmentID = ?, dateOfBirth = ?, contactPhone = ?, contactEmail = ?, address = ?, emergencyContactName = ?, emergencyContactPhone = ?, emergencyContactEmail = ?, checkInTime = ?, bloodType = ?, sex = ?, gender = ?, age = ?, language = ?, patientType = ?, releaseDate = ?
      WHERE patientID = ?
    `;

    db.pool.query(query, [firstName, lastName, roomID, primaryDoctorID, appointmentID, dateOfBirth, contactPhone, contactEmail, address, emergencyContactName, emergencyContactPhone, emergencyContactEmail, checkInTime, bloodType, sex, gender, age, language, patientType, releaseDate, id], function (err, results, fields) {
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
  



// GET all doctors
app.get('/doctors', async (req, res) => {
    try {
        const query = "SELECT * FROM Doctors;";
        db.pool.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching doctors:', err);
                res.status(500).send('Server error');
            } else {
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





// Pull from Treatments Entity
app.get('/treatments', async (req, res) => {
    try {
        // Define our query
        query1 = "SELECT * FROM Treatments;"

        // Query Data
        db.pool.query(query1, function (err, results, fields) {
            // Send data in a JSON file to browser
            console.log("Sending JSON information to /treatments");
            res.json(results);
        });

    } catch (error) {
        // Handle Errors
        console.error('Database operation failed:', error, '. Unable to pull Treatments.');
        res.status(500).send('Server error');
    }
});

// Create new treatment
app.post('/treatments', async (req, res) => {
    try {
        const { patientID, description, date, diagnosis, symptoms } = req.body;
        const query = "INSERT INTO Treatments (patientID, description, date, diagnosis, symptoms) VALUES (?, ?, ?, ?, ?)";
        const values = [patientID, description, date, diagnosis, symptoms];

        db.pool.query(query, values, (err, results) => {
            if (err) {
                console.error('Error adding treatment:', err);
                res.status(500).send('Server error');
            } else {
                res.send('Treatment added successfully');
            }
        });

    } catch (error) {
        console.error('Database operation failed:', error, '. Unable to add Treatment.');
        res.status(500).send('Server error');
    }
});

// Update existing treatment
app.put('/treatments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { patientID, description, date, diagnosis, symptoms } = req.body;
        const query = "UPDATE Treatments SET patientID = ?, description = ?, date = ?, diagnosis = ?, symptoms = ? WHERE treatmentID = ?";
        const values = [patientID, description, date, diagnosis, symptoms, id];

        db.pool.query(query, values, (err, results) => {
            if (err) {
                console.error('Error updating treatment:', err);
                res.status(500).send('Server error');
            } else {
                res.send('Treatment updated successfully');
            }
        });

    } catch (error) {
        console.error('Database operation failed:', error, '. Unable to update Treatment.');
        res.status(500).send('Server error');
    }
});

// Delete treatment
app.delete('/treatments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = "DELETE FROM Treatments WHERE treatmentID = ?";
        const values = [id];

        db.pool.query(query, values, (err, results) => {
            if (err) {
                console.error('Error deleting treatment:', err);
                res.status(500).send('Server error');
            } else {
                res.send('Treatment deleted successfully');
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
