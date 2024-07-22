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
    const { fName, lName, dateOfBirth, contactPhone, contactEmail, roomID } = req.body;
    const sql = "INSERT INTO Patients (fName, lName, dateOfBirth, contactPhone, contactEmail, roomID) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [fName, lName, dateOfBirth, contactPhone, contactEmail, roomID], (err, result) => {
        if (err) throw err;
        res.redirect('/patients.html');
    });
});

router.post('/update', (req, res) => {
    const { patientID, contactEmail } = req.body;
    const sql = "UPDATE Patients SET contactEmail = ? WHERE patientID = ?";
    db.query(sql, [contactEmail, patientID], (err, result) => {
        if (err) throw err;
        res.redirect('/patients.html');
    });
});

router.post('/delete', (req, res) => {
    const { patientID } = req.body;
    const sql = "DELETE FROM Patients WHERE patientID = ?";
    db.query(sql, [patientID], (err, result) => {
        if (err) throw err;
        res.redirect('/patients.html');
    });
});

module.exports = router;
