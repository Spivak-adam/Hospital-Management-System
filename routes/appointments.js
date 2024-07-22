const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cs340'
});

router.post('/add', (req, res) => {
    const { status, reason, patientID, doctorID, date, checkInTime, checkOutTime } = req.body;
    const sql = "INSERT INTO Appointments (status, reason, patientID, doctorID, date, checkInTime, checkOutTime) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [status, reason, patientID, doctorID, date, checkInTime, checkOutTime], (err, result) => {
        if (err) throw err;
        res.redirect('/appointments.html');
    });
});

router.post('/update', (req, res) => {
    const { appointmentID, status, reason, date, checkInTime, checkOutTime } = req.body;
    const sql = "UPDATE Appointments SET status = ?, reason = ?, date = ?, checkInTime = ?, checkOutTime = ? WHERE appointmentID = ?";
    db.query(sql, [status, reason, date, checkInTime, checkOutTime, appointmentID], (err, result) => {
        if (err) throw err;
        res.redirect('/appointments.html');
    });
});

router.post('/delete', (req, res) => {
    const { appointmentID } = req.body;
    const sql = "DELETE FROM Appointments WHERE appointmentID = ?";
    db.query(sql, [appointmentID], (err, result) => {
        if (err) throw err;
        res.redirect('/appointments.html');
    });
});

module.exports = router;
