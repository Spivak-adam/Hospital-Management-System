SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;



INSERT INTO Patients (
    firstName, lastName, dateOfBirth, roomID, contactPhone, contactEmail, 
    emergencyContactName, emergencyContactPhone, emergencyContactEmail, 
    address, treatmentID, checkInTime, appointmentID, doctorID, bloodType, 
    releaseDate, gender, language, patientType
) VALUES
('John', 'Doe', '1980-01-01', 1, '123-456-7890', 'john@example.com', 
 'Jane Doe', '123-456-7899', 'jane.doe@example.com', 
 '123 Main St', 1, '2024-07-14 09:00:00', 1, 1, 'A+', '2024-07-20 10:00:00', 'Male', 'English', 'Primary'),
('Jane', 'Smith', '1990-02-02', 2, '234-567-8901', 'jane@example.com', 
 'John Smith', '234-567-8910', 'john.smith@example.com', 
 '456 Elm St', 2, '2024-07-15 10:00:00', 2, 2, 'B-', NULL, 'Female', 'Spanish', 'Emergency'),
('Alice', 'Brown', '2000-03-03', 3, '345-678-9012', 'alice@example.com', 
 'Bob Brown', '345-678-9021', 'bob.brown@example.com', 
 '789 Pine St', 3, '2024-07-16 11:00:00', 3, 3, 'O+', NULL, 'Female', 'French', 'Specialist'),
('Bob', 'White', '1985-04-04', 4, '456-789-0123', 'bob@example.com', 
 'Alice White', '456-789-0132', 'alice.white@example.com', 
 '101 Oak St', 4, '2024-07-17 12:00:00', 4, 1, 'AB-', NULL, 'Male', 'English', 'Primary'),
('Mary', 'Johnson', '1995-05-05', 5, '567-890-1234', 'mary@example.com', 
 'Peter Johnson', '567-890-1243', 'peter.johnson@example.com', 
 '202 Maple St', 5, '2024-07-18 13:00:00', 5, 2, 'B+', '2024-07-25 14:00:00', 'Female', 'Spanish', 'Emergency');




INSERT INTO Doctors (specialization, firstName, lastName, email, phoneNumber, image, language, gender, doctorID)
VALUES
('Cardiology', 'Dr. John', 'Watson', 'john.watson@example.com', '111-222-3333', NULL, 'English', 'Male', 1),
('Neurology', 'Dr. Sarah', 'Connor', 'sarah.connor@example.com', '444-555-6666', NULL, 'English', 'Female', 2),
('Pediatrics', 'Dr. Emily', 'Stone', 'emily.stone@example.com', '777-888-9999', NULL, 'Spanish', 'Female', 3),
('Orthopedics', 'Dr. Michael', 'Brown', 'michael.brown@example.com', '222-333-4444', NULL, 'English', 'Male', 4),
('Dermatology', 'Dr. Anna', 'Taylor', 'anna.taylor@example.com', '555-666-7777', NULL, 'French', 'Female', 5);




INSERT INTO Appointments (status, reason, patientID, doctorID, date, checkInTime, checkOutTime, appointmentID)
VALUES
('Confirmed', 'Scheduled', 1, 1, '2024-07-14 09:00:00', '09:00:00', '10:00:00', 1),
('In-Room', 'ER', 2, 2, '2024-07-15 10:00:00', '10:00:00', '11:00:00', 2),
('Released', 'Scheduled', 3, 3, '2024-07-16 11:00:00', '11:00:00', '12:00:00', 3),
('Confirmed', 'Scheduled', 4, 4, '2024-07-17 12:00:00', '12:00:00', '13:00:00', 4),
('In-Room', 'ER', 5, 5, '2024-07-18 13:00:00', '13:00:00', '14:00:00', 5);




INSERT INTO Treatments (description, date, doctorID, patientID, diagnosis, symptoms, treatmentID)
VALUES
('Heart surgery', '2024-07-14 09:00:00', 1, 1, 'Coronary artery disease', 'Chest pain, shortness of breath', 1),
('Brain MRI', '2024-07-15 10:00:00', 2, 2, 'Brain tumor', 'Headache, nausea', 2),
('Flu vaccination', '2024-07-16 11:00:00', 3, 3, 'Influenza', 'Fever, cough, sore throat', 3),
('Knee replacement', '2024-07-17 12:00:00', 4, 4, 'Osteoarthritis', 'Knee pain, swelling', 4),
('Skin biopsy', '2024-07-18 13:00:00', 5, 5, 'Skin lesion', 'Skin growth, discoloration', 5);




INSERT INTO Rooms (location, number, patientID, doctorID, occupied, accommodations, lengthOfStay, roomID)
VALUES
('ICU', '101', 1, 1, 'Yes', 'Private room with ventilator', 6, 1),
('Recovery', '202', 2, 2, 'Yes', 'Shared room with 2 beds', 3, 2),
('General', '303', 3, 3, 'Yes', 'Private room', 1, 3),
('ICU', '104', 4, 4, 'Yes', 'Private room with ventilator', 7, 4),
('Recovery', '205', 5, 5, 'Yes', 'Shared room with 2 beds', 4, 5);


SET FOREIGN_KEY_CHECKS=1;
COMMIT;
