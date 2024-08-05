import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function Treatment({ treatment, onUpdateTreatment, onDeleteTreatment, onEditClick }) {
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this treatment?')) {
            onDeleteTreatment(treatment.treatmentID);
        }
    };

    return (
        <tr>
            <td>{treatment.treatmentID}</td>
            <td>{treatment.patientID}</td>
            <td>{treatment.description}</td>
            <td>{treatment.date}</td>
            <td>{treatment.diagnosis}</td>
            <td>{treatment.symptoms}</td>
            <td style={{ textAlign: 'center' }}>
                <button className="btn-action" onClick={() => onEditClick(treatment)}><FaEdit /></button>
                <button className="btn-action" onClick={handleDelete}><FaTrashAlt /></button>
            </td>
        </tr>
    );
}

export default Treatment;
