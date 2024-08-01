import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function Patients({ patient }) {
    return (
        <tr>
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
            <td>
                <button className="btn-action"><FaEdit /></button>
                <button className="btn-action"><FaTrashAlt /></button>
            </td>
        </tr>
    );
}

export default Patients;
import PatientsTableList from './PatientsTable';

function PatientsTable({ patients }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Patient ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Doctors ID</th>
                    <th>Room ID</th>
                    <th>Appointment ID</th>
                    <th>Age</th>
                    <th>Date of Birthday</th>
                    <th>Blood Type</th>
                    <th>Gender</th>
                    <th>Sex</th>
                    <th>Language</th>
                    <th>Patient Type</th>
                    <th>Check in time</th>
                    <th>Release Date</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Emergancy Contact Name</th>
                    <th>Emergency Phone Number</th>
                    <th>Emergency Email</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {patients.map((patient, i)=>
                    <PatientsTableList 
                        patients={patient}
                        key={i}
                    />
                )}
            </tbody>
        </table>
    );
}

export default PatientsTable;
