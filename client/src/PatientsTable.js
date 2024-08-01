import React from 'react';
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
            <td>{patients.dateOfBirth}</td>
            <td>{patients.bloodType}</td>
            <td>{patients.gender}</td>
            <td>{patients.sex}</td>
            <td>{patients.language}</td>
            <td>{patients.patientType}</td>
            <td>{patients.checkInTime}</td>
            <td>{patients.releaseDate}</td>
            <td>{patients.contactPhone}</td>
            <td>{patients.contactEmail}</td>
            <td>{patients.emergencyContactName}</td>
            <td>{patients.emergencyContactPhone}</td>
            <td>{patients.emergencyContactEmail}</td>
            <td>{patients.address}</td>
            
            <td><a href="#" className="btn-action"><MdEdit/>Edit</a></td>
            <td><a href="#" className="btn-action"><MdDeleteForever/>Delete</a></td>
        </tr>
    );
}

export default Patients;