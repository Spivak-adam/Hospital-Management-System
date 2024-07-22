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
    const { specialization, fName, lName, email, phoneNumber } = req.body;
    const sql = "INSERT INTO Doctors (specialization, fName, lName, email, phoneNumber) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [specialization, fName, lName, email, phoneNumber], (err, result) => {
        if (err) throw err;
        res.redirect('/doctors.html');
    });
});

router.post('/update', (req, res) => {
    const { doctorID, specialization, email, phoneNumber } = req.body;
    const sql = "UPDATE Doctors SET specialization = ?, email = ?, phoneNumber = ? WHERE doctorID = ?";
    db.query(sql, [specialization, email, phoneNumber, doctorID], (err, result) => {
        if (err) throw err;
        res.redirect('/doctors.html');
    });
});

router.post('/delete', (req, res) => {
    const { doctorID } = req.body;
    const sql = "DELETE FROM Doctors WHERE doctorID = ?";
    db.query(sql, [doctorID], (err, result) => {
        if (err) throw err;
        res.redirect('/doctors.html');
    });
});

module.exports = router;
