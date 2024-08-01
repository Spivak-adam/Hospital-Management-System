import React from 'react';

import Patients from './Patients';
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
                {patients.length === 0 ? (
                    <tr>
                        <td colSpan="21" style={{ textAlign: 'center' }}>No patients available</td>
                        <td style={{ textAlign: 'center' }}>
                            <button className="btn-action"><FaEdit /></button>
                            <button className="btn-action"><FaTrashAlt /></button>
                        </td>
                    </tr>
                ) : (
                    patients.map((patient, index) => (
                        <Patients key={index} patient={patient} />
                    ))
                )}
            </tbody>
        </table>
    );
}

export default PatientsTable;
=======
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function Patients({ patients }) {
    return (
        <tr>
            <td>{patients.patientID}</td>
            <td>{patients.firstName}</td>
            <td>{patients.lastName}</td>
            <td>{patients.primaryDoctorID}</td>
            <td>{patients.roomID}</td>
            <td>{patients.appointmentID}</td>
            <td>{patients.age}</td>
            <td>{patients.dateOfBirth.slice(0,10)}</td>
            <td>{patients.bloodType}</td>
            <td>{patients.gender}</td>
            <td>{patients.sex}</td>
            <td>{patients.language}</td>
            <td>{patients.patientType}</td>
            <td>{patients.checkInTime.slice(0,10)}</td>
            <td>{patients.releaseDate}</td>
            <td>{patients.contactPhone}</td>
            <td>{patients.contactEmail}</td>
            <td>{patients.emergencyContactName}</td>
            <td>{patients.emergencyContactPhone}</td>
            <td>{patients.emergencyContactEmail}</td>
            <td>{patients.address}</td>

            <td>
                <a href="#" className="btn-action"><MdEdit />Edit</a>
                <a href="#" className="btn-action"><MdDeleteForever />Delete</a>
            </td>
        </tr>
    );
}

export default Patients;
