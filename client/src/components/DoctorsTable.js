import React from 'react';
import Doctors from './Doctors';

function DoctorsTable({ doctors }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Doctor ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Specialization</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Language</th>
                    <th>Gender</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {doctors.length > 0 ? (
                    doctors.map((doctor) => (
                        <Doctors key={doctor.doctorID} doctor={doctor} />
                    ))
                ) : (
                    <tr>
                        <td colSpan="9" style={{ textAlign: 'center' }}>No doctors available</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default DoctorsTable;
