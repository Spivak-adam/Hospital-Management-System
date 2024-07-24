import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
var app = express();
var PORT = 2138;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Source - ChatGPT
import db from './db-connector.mjs';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

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

app.listen(PORT, function(){            
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.')
});