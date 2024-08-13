import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

function DoctorTreatments({ DoctorTreatments, onDeleteDoctorTreatment, doctors }) {
    const doctor = doctors.find(d => d.doctorID === DoctorTreatments.doctorID);

    return (
        <tr>
            <td>{DoctorTreatments.treatmentID}</td>
            <td>{doctor ? `${doctor.doctorID} - Dr. ${doctor.firstName} ${doctor.lastName}` : `Doctor ID: ${DoctorTreatments.doctorID}`}</td>
            <td style={{ textAlign: 'center' }}>
                <button className="btn-action" onClick={() => onDeleteDoctorTreatment(DoctorTreatments.treatmentID)}><FaTrashAlt /></button>
            </td>
        </tr>
    );
}

export default DoctorTreatments;
