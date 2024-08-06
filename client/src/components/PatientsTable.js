import React from 'react';
import Patients from './Patients';

function PatientsTable({ patients, onUpdatePatient, onDeletePatient, rooms, doctors }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Patient ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Room ID</th>
                    <th>Doctor ID</th>
                    <th>Appointment ID</th>
                    <th>Date of Birth</th>
                    <th>Contact Phone</th>
                    <th>Contact Email</th>
                    <th>Address</th>
                    <th>Emergency Contact Name</th>
                    <th>Emergency Contact Phone</th>
                    <th>Emergency Contact Email</th>
                    <th>Check-In Time</th>
                    <th>Blood Type</th>
                    <th>Sex</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Language</th>
                    <th>Patient Type</th>
                    <th>Release Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {patients.length > 0 ? (
                    patients.map((patient, index) => (
                        <Patients
                            patient={patient}
                            key={index}
                            onUpdatePatient={onUpdatePatient}
                            onDeletePatient={onDeletePatient}
                            rooms={rooms}
                            doctors={doctors}
                        />
                    ))
                ) : (
                    <tr>
                        <td colSpan="22" style={{ textAlign: 'center' }}>No patients available</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default PatientsTable;