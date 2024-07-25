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




SET FOREIGN_KEY_CHECKS=1;
COMMIT;

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

    FOREIGN KEY (patientID) REFERENCES Patients(patientID) ON DELETE CASCADE,
    FOREIGN KEY (doctorID) REFERENCES Doctors(doctorID),
    FOREIGN KEY (roomID) REFERENCES Rooms(roomID)
);



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



-- create and insert data into Treatments table
CREATE OR REPLACE TABLE Treatments(
    treatmentID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    patientID int NOT NULL,
    description TEXT NOT NULL,
    date DATETIME NOT NULL,
    diagnosis TEXT NOT NULL,
    symptoms TEXT NOT NULL,

    FOREIGN KEY (patientID) REFERENCES Patients(patientID) ON DELETE CASCADE
);



-- create and insert data into DoctorTreatment table
CREATE OR REPLACE TABLE DoctorTreatment(
    doctorID int NOT NULL,
    treatmentID int NOT NULL,

    PRIMARY KEY (doctorID, treatmentID),
    FOREIGN KEY (doctorID) REFERENCES Doctors(doctorID) ON DELETE CASCADE,
    FOREIGN KEY (treatmentID) REFERENCES Treatments(treatmentID) ON DELETE CASCADE
);



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
