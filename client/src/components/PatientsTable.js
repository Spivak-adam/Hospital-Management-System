import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function PatientsTable({ patients }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Patient ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Room ID</th>
                    <th>Primary Doctor ID</th>
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
                        <tr key={index}>
                            <td>{patient.patientID}</td>
                            <td>{patient.firstName}</td>
                            <td>{patient.lastName}</td>
                            <td>{patient.roomID}</td>
                            <td>{patient.primaryDoctorID}</td>
                            <td>{patient.appointmentID}</td>
                            <td>{patient.dateOfBirth}</td>
                            <td>{patient.contactPhone}</td>
                            <td>{patient.contactEmail}</td>
                            <td>{patient.address}</td>
                            <td>{patient.emergencyContactName}</td>
                            <td>{patient.emergencyContactPhone}</td>
                            <td>{patient.emergencyContactEmail}</td>
                            <td>{patient.checkInTime}</td>
                            <td>{patient.bloodType}</td>
                            <td>{patient.sex}</td>
                            <td>{patient.gender}</td>
                            <td>{patient.age}</td>
                            <td>{patient.language}</td>
                            <td>{patient.patientType}</td>
                            <td>{patient.releaseDate}</td>
                            <td style={{ textAlign: 'center' }}>
                                <button className="btn-action"><FaEdit /></button>
                                <button className="btn-action"><FaTrashAlt /></button>
                            </td>
                        </tr>
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
