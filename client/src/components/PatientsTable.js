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
                        <Patients 
                            patient={patient}
                            key={index}
                        />
                    ))
                )}
            </tbody>
        </table>
    );
}

export default PatientsTable;