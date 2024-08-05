import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function DoctorsTable({ doctors, onUpdateDoctor, onDeleteDoctor }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Specialization</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Image</th>
                    <th>Language</th>
                    <th>Gender</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {doctors.length > 0 ? (
                    doctors.map((doctor, index) => (
                        <tr key={index}>
                            <td>{doctor.firstName}</td>
                            <td>{doctor.lastName}</td>
                            <td>{doctor.specialization}</td>
                            <td>{doctor.email}</td>
                            <td>{doctor.phoneNumber}</td>
                            <td>{doctor.image ? doctor.image.data ? 'No Image' : doctor.image : 'No image'}</td>
                            <td>{doctor.language}</td>
                            <td>{doctor.gender}</td>
                            <td style={{ textAlign: 'center' }}>
                                <button className="btn-action" onClick={() => onUpdateDoctor(doctor)}><FaEdit /></button>
                                <button className="btn-action" onClick={() => onDeleteDoctor(doctor.doctorID)}><FaTrashAlt /></button>
                            </td>
                        </tr>
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
