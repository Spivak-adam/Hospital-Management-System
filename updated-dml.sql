
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