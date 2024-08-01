import React from 'react';
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