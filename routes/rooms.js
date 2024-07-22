const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cs340'
});

// Add room
router.post('/add', (req, res) => {
    const { location, number, patientID, doctorID, occupied, accommodations, lengthOfStay } = req.body;
    const sql = "INSERT INTO Rooms (location, number, patientID, doctorID, occupied, accommodations, lengthOfStay) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [location, number, patientID, doctorID, occupied, accommodations, lengthOfStay], (err, result) => {
        if (err) throw err;
        res.redirect('/rooms.html');
    });
});

// Update room
router.post('/update', (req, res) => {
    const { roomID, location, number, patientID, doctorID, occupied, accommodations, lengthOfStay } = req.body;
    const sql = "UPDATE Rooms SET location = ?, number = ?, patientID = ?, doctorID = ?, occupied = ?, accommodations = ?, lengthOfStay = ? WHERE roomID = ?";
    db.query(sql, [location, number, patientID, doctorID, occupied, accommodations, lengthOfStay, roomID], (err, result) => {
        if (err) throw err;
        res.redirect('/rooms.html');
    });
});

// Delete room
router.post('/delete', (req, res) => {
    const { roomID } = req.body;
    const sql = "DELETE FROM Rooms WHERE roomID = ?";
    db.query(sql, [roomID], (err, result) => {
        if (err) throw err;
        res.redirect('/rooms.html');
    });
});

module.exports = router;
