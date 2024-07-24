var express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var app = express();
var PORT = 2136;

const db = require('./db-connector');

app.get('/', function(req, res){
    let base = "<h1>Got backend online!</h1>"
    res.send(base);
});
    

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

app.listen(PORT, function(){            
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.')
});