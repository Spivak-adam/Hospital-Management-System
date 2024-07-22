const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

/* Database connection
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cs340'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

/* Routes
const patientsRoute = require('./routes/patients');
const doctorsRoute = require('./routes/doctors');
const appointmentsRoute = require('./routes/appointments');
const treatmentsRoute = require('./routes/treatments');
const roomsRoute = require('./routes/rooms');

app.use('/patients', patientsRoute);
app.use('/doctors', doctorsRoute);
app.use('/appointments', appointmentsRoute);
app.use('/treatments', treatmentsRoute);
app.use('/rooms', roomsRoute);*/

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
