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
    const { description, date, doctorID, patientID, diagnosis, symptoms } = req.body;
    const sql = "INSERT INTO Treatments (description, date, doctorID, patientID, diagnosis, symptoms) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [description, date, doctorID, patientID, diagnosis, symptoms], (err, result) => {
        if (err) throw err;
        res.redirect('/treatments.html');
    });
});

router.post('/update', (req, res) => {
    const { treatmentID, description, date, diagnosis, symptoms } = req.body;
    const sql = "UPDATE Treatments SET description = ?, date = ?, diagnosis = ?, symptoms = ? WHERE treatmentID = ?";
    db.query(sql, [description, date, diagnosis, symptoms, treatmentID], (err, result) => {
        if (err) throw err;
        res.redirect('/treatments.html');
    });
});

router.post('/delete', (req, res) => {
    const { treatmentID } = req.body;
    const sql = "DELETE FROM Treatments WHERE treatmentID = ?";
    db.query(sql, [treatmentID], (err, result) => {
        if (err) throw err;
        res.redirect('/treatments.html');
    });
});

module.exports = router;
