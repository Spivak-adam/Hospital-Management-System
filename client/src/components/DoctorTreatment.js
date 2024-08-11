import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

function DoctorTreatments({ DoctorTreatments, onDeleteDoctorTreatment }) {
    return (
        <tr>
            <td>{DoctorTreatments.treatmentID}</td>
            <td>{DoctorTreatments.doctorID}</td>
            <td style={{ textAlign: 'center' }}>
                <button className="btn-action" onClick={() => onDeleteDoctorTreatment(DoctorTreatments.treatmentID)}><FaTrashAlt /></button>
            </td>
        </tr>
    )
}

export default DoctorTreatments