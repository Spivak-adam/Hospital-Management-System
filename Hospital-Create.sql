-- Hospital Management System
-- Authors: Adam Spivak, and Madelyn Lazar
-- Description: A Hospital management system (HMS) written in mySQL Database.
-- This file creates all the neccesary tables for the database. These
-- tables are Patients, Appointments, Treatments, Room, and Doctors. 
-- Appointments is the master table, but also a transaction table. It keeps
-- record of all the patients that come in and out of the hospital, their rooms,
-- their doctors, and the status their appointments.

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

CREATE OR REPLACE TABLE Patients(
    patientID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstName varchar(50),
    lastName varchar(50),
    roomID int NOT NULL,                -- Are patients required to have a room?
    primaryDoctorID int NOT NULL,
    doctorID int NOT NULL,
    treatmentID int NOT NULL,     
    appointmentID int NOT NULL,
    dateOfBirth DATE NOT NULL,
    contactPhone varchar(15) NOT NULL,      -- Emergency might not have phone number
    contactEmail varchar(100) NULL UNIQUE,
    address varchar(255) NOT NULL,          -- Emergency might not have address
    emergencyContactName varchar(100) NULL,
    emergencyContactPhone varchar(100) NULL,
    emergencyContactEmail varchar(100) NULL,
    checkInTime DATETIME NOT NULL,
    bloodType varchar(3) NOT NULL,
    Sex ENUM("Male", "Female") NOT NULL,     -- Added
    Gender ENUM("Male", "Female", "Other") NOT NULL,  -- Changed from Gender
    language varchar(50) NOT NULL,
    patientType ENUM("Primary", "Emergency", "Specialist") NOT NULL,
    releaseDate DATETIME NULL,

    FOREIGN KEY (roomID) REFERENCES Rooms(roomID),
    FOREIGN KEY (primaryDoctorID) REFERENCES Doctors(doctorID),
    FOREIGN KEY (treatmentID) REFERENCES Treatments(treatmentID),
    FOREIGN KEY (appointmentID) REFERENCES Appointments(appointmentID)
);

CREATE OR REPLACE TABLE Appointments(
    appointmentID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    doctorID int NOT NULL,
    patientID int NOT NULL,
    roomID int NOT NULL,        -- Can either get roomID from patient, or set it for future use
    firstName varchar(50),      -- Must get first name from Patients
    lastName varchar(50),       -- Must get last name from Patients
    status ENUM("Confirmed", "In-Room", "Released") NOT NULL,
    reason ENUM("Scheduled", "ER") NOT NULL,
    checkInTime TIME NOT NULL,
    checkOutTime TIME NULL,     -- Check out time can be null
    date DATE NOT NULL,

    FOREIGN KEY (patientID) REFERENCES Patients(patientID),
    FOREIGN KEY (doctorID) REFERENCES Patients(primaryDoctorID),
    FOREIGN KEY (roomID) REFERENCES Rooms(roomID)
);

CREATE OR REPLACE TABLE Doctors(
    doctorID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstName varchar(50),
    lastName varchar(50),
    specialization varchar(100) NOT NULL,
    email varchar(100) NOT NULL UNIQUE,
    phoneNumber varchar(15) NOT NULL,
    image BLOB NULL,
    language varchar(50) NOT NULL,
    gender ENUM("Male", "Female", "Other")
);

CREATE OR REPLACE TABLE Treatments(
    treatmentID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    patientID int NOT NULL,
    doctorID int NOT NULL,
    description TEXT NOT NULL,
    date DATETIME NOT NULL,
    diagnosis TEXT NOT NULL,    -- Changed from varchar
    symptoms TEXT NOT NULL,     -- Changed from varchar

    FOREIGN KEY (patientID) REFERENCES Patients(patientID),
    FOREIGN KEY (doctorID) REFERENCES Doctors(doctorID)
);

CREATE OR REPLACE TABLE Rooms(
    roomID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    patientID int NOT NULL,
    doctorID int NOT NULL,
    location ENUM("ICU", "Recovery", "General") NOT NULL,
    number varchar(10) NOT NULL,
    occupied ENUM("Yes", "No") NOT NULL,
    accommodations text NULL,
    lengthOfStay int NOT NULL,

    FOREIGN KEY (patientID) REFERENCES Patients(patientID),
    FOREIGN KEY (doctorID) REFERENCES Doctors(doctorID)
);

SET FOREIGN_KEY_CHECKS=1;
COMMIT; 
