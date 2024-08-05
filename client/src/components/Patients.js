import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function Patients({ patient, onUpdate, onDelete }) {
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
                <button className="btn-action" onClick={() => onUpdate(patient)}><FaEdit /></button>
                <button className="btn-action" onClick={() => onDelete(patient.patientID)}><FaTrashAlt /></button>
            </td>
        </tr>
    );
}

export default Patients;
