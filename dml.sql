-- Insert into Database to populate
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

INSERT INTO Appointments (status, reason, patientID, doctorID, date, checkInTime, checkOutTime, roomID)
VALUES
('Confirmed', 'Scheduled', 1, 1, '2024-07-14 09:00:00', '09:00:00', '10:00:00', 1),
('In-Room', 'ER', 2, 2, '2024-07-15 10:00:00', '10:00:00', '11:00:00', 2),
('Released', 'Scheduled', 3, 3, '2024-07-16 11:00:00', '11:00:00', '12:00:00', 3),
('Confirmed', 'Scheduled', 4, 4, '2024-07-17 12:00:00', '12:00:00', '13:00:00', 4),
('In-Room', 'ER', 5, 5, '2024-07-18 13:00:00', '13:00:00', '14:00:00', 5);

INSERT INTO Doctors (specialization, firstName, lastName, email, phoneNumber, image, language, gender)
VALUES
('Cardiology', 'John', 'Watson', 'john.watson@example.com', '111-222-3333', NULL, 'English', 'Male'),
('Neurology', 'Sarah', 'Connor', 'sarah.connor@example.com', '444-555-6666', NULL, 'English', 'Female'),
('Pediatrics', 'Emily', 'Stone', 'emily.stone@example.com', '777-888-9999', NULL, 'Spanish', 'Female'),
('Orthopedics', 'Michael', 'Brown', 'michael.brown@example.com', '222-333-4444', NULL, 'English', 'Male'),
('Dermatology', 'Anna', 'Taylor', 'anna.taylor@example.com', '555-666-7777', NULL, 'French', 'Female');

INSERT INTO Treatments (description, date, patientID, diagnosis, symptoms)
VALUES
('Heart surgery', '2024-07-14 09:00:00', 1, 'Coronary artery disease', 'Chest pain, shortness of breath'),
('Brain MRI', '2024-07-15 10:00:00', 2, 'Brain tumor', 'Headache, nausea'),
('Flu vaccination', '2024-07-16 11:00:00', 3, 'Influenza', 'Fever, cough, sore throat'),
('Knee replacement', '2024-07-17 12:00:00', 4, 'Osteoarthritis', 'Knee pain, swelling'),
('Skin biopsy', '2024-07-18 13:00:00', 5, 'Skin lesion', 'Skin growth, discoloration');

INSERT INTO DoctorTreatment (doctorID, treatmentID)
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

INSERT INTO Rooms (location, number, patientID, doctorID, occupied, accommodations, lengthOfStay)
VALUES
('ICU', '101', 1, 1, 'Yes', 'Private room with ventilator', 6),
('Recovery', '202', 2, 2, 'Yes', 'Shared room with 2 beds', 3),
('General', '303', 3, 3, 'Yes', 'Private room', 1),
('ICU', '104', 4, 4, 'Yes', 'Private room with ventilator', 7),
('Recovery', '205', 5, 5, 'Yes', 'Shared room with 2 beds', 4);

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
