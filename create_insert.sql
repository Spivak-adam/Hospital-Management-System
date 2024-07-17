-- Hospital Management System
-- Authors: Adam Spivak, and Madelyn Lazar
-- Description: A Hospital management system (HMS) written in mySQL Database.
-- This file creates all the necessary tables for the database. These
-- tables are Patients, Appointments, Treatments, Rooms, Doctors, and DoctorTreatment. 
-- Appointments is the master table, but also a transaction table. It keeps
-- record of all the patients that come in and out of the hospital, their rooms,
-- their doctors, and the status of their appointments.

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;


-- create and insert data into Patients table
CREATE OR REPLACE TABLE Patients(
    patientID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstName varchar(50),
    lastName varchar(50),
    roomID int NOT NULL,               
    primaryDoctorID int NOT NULL,
    appointmentID int NOT NULL,
    dateOfBirth DATE NOT NULL,
    contactPhone varchar(15) NOT NULL,      
    contactEmail varchar(100) NULL UNIQUE,
    address varchar(255) NOT NULL,          
    emergencyContactName varchar(100) NULL,
    emergencyContactPhone varchar(100) NULL,
    emergencyContactEmail varchar(100) NULL,
    checkInTime DATETIME NOT NULL,
    bloodType varchar(3) NOT NULL,
    sex ENUM("Male", "Female") NOT NULL,     
    gender ENUM("Male", "Female", "Other") NOT NULL,  
    age int NOT NULL,
    language varchar(50) NOT NULL,
    patientType ENUM("Primary", "Emergency", "Specialist") NOT NULL,
    releaseDate DATETIME NULL,
    
    FOREIGN KEY (roomID) REFERENCES Rooms(roomID),
    FOREIGN KEY (primaryDoctorID) REFERENCES Doctors(doctorID),
    FOREIGN KEY (appointmentID) REFERENCES Appointments(appointmentID)
);

INSERT INTO Patients (
    firstName, lastName, dateOfBirth, roomID, contactPhone, contactEmail, 
    emergencyContactName, emergencyContactPhone, emergencyContactEmail, 
    address, checkInTime, appointmentID, primaryDoctorID, bloodType, 
    releaseDate, sex, gender, age, language, patientType
) VALUES
('John', 'Doe', '1980-01-01', 1, '123-456-7890', 'john@example.com', 
 'Jane Doe', '123-456-7899', 'jane.doe@example.com', 
 '123 Main St', '2024-07-14 09:00:00', 1, 2, 'A+', '2024-07-20 10:00:00', 'Female', 'Male', 21, 'English', 'Primary'),
('Jane', 'Smith', '1990-02-02', 2, '234-567-8901', 'jane@example.com', 
 'John Smith', '234-567-8910', 'john.smith@example.com', 
 '456 Elm St', '2024-07-15 10:00:00', 2, 3, 'B-', NULL, 'Female', 'Female', 55, 'Spanish', 'Emergency'),
('Alice', 'Brown', '2000-03-03', 3, '345-678-9012', 'alice@example.com', 
 'Bob Brown', '345-678-9021', 'bob.brown@example.com', 
 '789 Pine St', '2024-07-16 11:00:00', 3, 1, 'O+', NULL, 'Female', 'Female', 62, 'French', 'Specialist'),
('Bob', 'White', '1985-04-04', 4, '456-789-0123', 'bob@example.com', 
 'Alice White', '456-789-0132', 'alice.white@example.com', 
 '101 Oak St', '2024-07-17 12:00:00', 4, 2, 'AB-', NULL, 'Male', 'Male', 70, 'English', 'Primary'),
('Mary', 'Johnson', '1995-05-05', 5, '567-890-1234', 'mary@example.com', 
 'Peter Johnson', '567-890-1243', 'peter.johnson@example.com', 
 '202 Maple St', '2024-07-18 13:00:00', 5, 3, 'B+', '2024-07-25 14:00:00', 'Female', 'Female', 33, 'Spanish', 'Emergency');


-- create and insert data into Appointments table
CREATE OR REPLACE TABLE Appointments(
    appointmentID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    doctorID int NOT NULL,
    patientID int NOT NULL,
    roomID int NOT NULL,
    status ENUM('Confirmed', 'In-Room', 'Released') NOT NULL,
    reason ENUM('Scheduled', 'ER') NOT NULL,
    checkInTime TIME NOT NULL,
    checkOutTime TIME NULL,
    date DATE NOT NULL,

    FOREIGN KEY (patientID) REFERENCES Patients(patientID),
    FOREIGN KEY (doctorID) REFERENCES Doctors(doctorID),
    FOREIGN KEY (roomID) REFERENCES Rooms(roomID)
);

INSERT INTO Appointments (status, reason, patientID, doctorID, date, checkInTime, checkOutTime, roomID)
VALUES
('Confirmed', 'Scheduled', 1, 1, '2024-07-14 09:00:00', '09:00:00', '10:00:00', 1),
('In-Room', 'ER', 2, 2, '2024-07-15 10:00:00', '10:00:00', '11:00:00', 2),
('Released', 'Scheduled', 3, 3, '2024-07-16 11:00:00', '11:00:00', '12:00:00', 3),
('Confirmed', 'Scheduled', 4, 4, '2024-07-17 12:00:00', '12:00:00', '13:00:00', 4),
('In-Room', 'ER', 5, 5, '2024-07-18 13:00:00', '13:00:00', '14:00:00', 5);


-- create and insert data into Doctors table
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

INSERT INTO Doctors (specialization, firstName, lastName, email, phoneNumber, image, language, gender)
VALUES
('Cardiology', 'John', 'Watson', 'john.watson@example.com', '111-222-3333', NULL, 'English', 'Male'),
('Neurology', 'Sarah', 'Connor', 'sarah.connor@example.com', '444-555-6666', NULL, 'English', 'Female'),
('Pediatrics', 'Emily', 'Stone', 'emily.stone@example.com', '777-888-9999', NULL, 'Spanish', 'Female'),
('Orthopedics', 'Michael', 'Brown', 'michael.brown@example.com', '222-333-4444', NULL, 'English', 'Male'),
('Dermatology', 'Anna', 'Taylor', 'anna.taylor@example.com', '555-666-7777', NULL, 'French', 'Female');


-- create and insert data into Treatments table
CREATE OR REPLACE TABLE Treatments(
    treatmentID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    patientID int NOT NULL,
    description TEXT NOT NULL,
    date DATETIME NOT NULL,
    diagnosis TEXT NOT NULL,
    symptoms TEXT NOT NULL,

    FOREIGN KEY (patientID) REFERENCES Patients(patientID)
);

INSERT INTO Treatments (description, date, patientID, diagnosis, symptoms)
VALUES
('Heart surgery', '2024-07-14 09:00:00', 1, 'Coronary artery disease', 'Chest pain, shortness of breath'),
('Brain MRI', '2024-07-15 10:00:00', 2, 'Brain tumor', 'Headache, nausea'),
('Flu vaccination', '2024-07-16 11:00:00', 3, 'Influenza', 'Fever, cough, sore throat'),
('Knee replacement', '2024-07-17 12:00:00', 4, 'Osteoarthritis', 'Knee pain, swelling'),
('Skin biopsy', '2024-07-18 13:00:00', 5, 'Skin lesion', 'Skin growth, discoloration');


-- create and insert data into DoctorTreatment table
CREATE OR REPLACE TABLE DoctorTreatment(
    treatmentID int NOT NULL,
    doctorID int NOT NULL,

    PRIMARY KEY (doctorID, treatmentID),
    FOREIGN KEY (doctorID) REFERENCES Doctors(doctorID),
    FOREIGN KEY (treatmentID) REFERENCES Treatments(treatmentID)
);

INSERT INTO DoctorTreatment (treatmentID, doctorID)
VALUES
(1, 1),
(2, 1),
(2, 2),
(3, 2),
(3, 3),
(4, 3),
(5, 3),
(4, 4),
(4, 5),
(5, 5);


-- create and insert data into Rooms table
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

INSERT INTO Rooms (location, number, patientID, doctorID, occupied, accommodations, lengthOfStay)
VALUES
('ICU', '101', 1, 1, 'Yes', 'Private room with ventilator', 6),
('Recovery', '202', 2, 2, 'Yes', 'Shared room with 2 beds', 3),
('General', '303', 3, 3, 'Yes', 'Private room', 1),
('ICU', '104', 4, 4, 'Yes', 'Private room with ventilator', 7),
('Recovery', '205', 5, 5, 'Yes', 'Shared room with 2 beds', 4);


SET FOREIGN_KEY_CHECKS=1;
COMMIT;
