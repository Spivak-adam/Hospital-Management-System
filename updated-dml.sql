
-- Insert into in database from user
INSERT INTO Rooms(location, number, patientID, doctorID, occupied, accommodations, lengthOfStay)
VALUES (:location, :number, :patientID, :doctorID, :occupied, :accommodations, :lengthOfStay);

INSERT INTO Doctors (specialization, firstName, lastName, email, phoneNumber, image, language, gender)
VALUES (:specialization, :firstName, :lastName, :email, :phoneNumber, :image, :language, :gender);

-- Update info in database based on user
UPDATE Appointments SET status = :statusInput, reason = :reasonInput, doctorID = :doctorIDInput, date = :dateInput, checkOutTime = :checkOutTimeInput, roomID = roomIDInput WHERE appointmentID = :appointmentIDInput;
UPDATE Treatments SET description = :descriptionInput, diagnosis = :diagnosis, symptoms = :symptoms WHERE treatmentID = treatmentIDInput;

-- Delete info in database based on user
DELETE FROM Patients WHERE patientID = patientIDInput;
DELETE FROM Doctors WHERE doctorID = doctorIDInput;

-- Running some Querries---------------------------------
-- Get basic patient information like First name, Last name, Appointment Date and Status
Select Patients.firstName, Patients.lastName, Appointments.date, Appointments.status
from Patients
Inner join Appointments on Patients.patientID = Appointments.patientID;

-- Select all the Doctors assigned to 1 patient through the DoctorTreatment Table
Select Patients.lastName, Patients.firstName, DoctorTreatment.doctorID
from Treatments
Inner join Patients on Patients.patientID = Treatments.patientID
Inner join DoctorTreatment on Treatments.treatmentID = DoctorTreatment.treatmentID
Order By lastName;

-- More in depth information of Patient, such as their first and last name, Primary doctor last name, their room number, and their appointment status
Select Rooms.roomID, Patients.firstName, Patients.lastName, Doctors.lastName as "Doctor Last Name", Rooms.number, Appointments.status
from Rooms
Inner Join Patients on Patients.patientID = Rooms.patientID
inner Join Doctors on Patients.primaryDoctorID = Doctors.doctorID
inner join Appointments on Patients.patientID = Appointments.patientID;


-- UPDATED Section
------------------------------------
-- ROOMS
SELECT * FROM Rooms;

INSERT INTO Rooms (patientID, doctorID, location, number, occupied, accommodations, lengthOfStay)
        VALUES (?, ?, ?, ?, ?, ?, ?)

UPDATE Rooms 
                     SET patientID = ?, doctorID = ?, location = ?, number = ?, occupied = ?, accommodations = ?, lengthOfStay = ?
                     WHERE roomID = ?

DELETE FROM Rooms WHERE roomID = ?

--Patients
SELECT * FROM Patients;

INSERT INTO Patients (
        firstName, lastName, roomID, primaryDoctorID, appointmentID, dateOfBirth, contactPhone, contactEmail, address, emergencyContactName, emergencyContactPhone, emergencyContactEmail, checkInTime, bloodType, sex, gender, age, language, patientType, releaseDate
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

UPDATE Patients 
      SET firstName = ?, lastName = ?, roomID = ?, primaryDoctorID = ?, appointmentID = ?, dateOfBirth = ?, contactPhone = ?, contactEmail = ?, address = ?, emergencyContactName = ?, emergencyContactPhone = ?, emergencyContactEmail = ?, checkInTime = ?, bloodType = ?, sex = ?, gender = ?, age = ?, language = ?, patientType = ?, releaseDate = ?
      WHERE patientID = ?      

DELETE FROM Patients WHERE patientID = ?

--Doctors
SELECT * FROM Doctors;

INSERT INTO Doctors (firstName, lastName, specialization, email, phoneNumber, image, language, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?)

UPDATE Doctors SET firstName = ?, lastName = ?, specialization = ?, email = ?, phoneNumber = ?, image = ?, language = ?, gender = ? WHERE doctorID = ?

DELETE FROM Doctors WHERE doctorID = ?

--Appointments
SELECT * FROM Appointments;

INSERT INTO Appointments (doctorID, patientID, roomID, status, reason, checkInTime, checkOutTime, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)

UPDATE Appointments SET doctorID = ?, patientID = ?, roomID = ?, status = ?, reason = ?, checkInTime = ?, checkOutTime = ?, date = ? WHERE appointmentID = ?

DELETE FROM Appointments WHERE appointmentID = ?

--Treatments
Select Treatments.*, Doctors.lastName from Treatments Inner join DoctorTreatment on DoctorTreatment.treatmentID = Treatments.treatmentID Inner join Doctors on DoctorTreatment.doctorID = Doctors.doctorID ORDER BY treatmentID;

Select * FROM Doctors;

SET FOREIGN_KEY_CHECKS=0;

INSERT INTO Treatments (patientID, description, date, diagnosis, symptoms) VALUES ('${treatData['patientID']}','${treatData['description']}','${treatData['date']}','${treatData['diagnosis']}','${treatData['symptoms']}')

INSERT INTO DoctorTreatment (treatmentID, doctorID) VALUES (LAST_INSERT_ID(), ${treatData['doctorID']})`

SET FOREIGN_KEY_CHECKS=1;

UPDATE Treatments SET patientID = ?, description = ?, date = ?, diagnosis = ?, symptoms = ? WHERE treatmentID = ?

DELETE FROM Treatments WHERE treatmentID = ?