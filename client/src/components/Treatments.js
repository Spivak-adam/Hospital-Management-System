import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function Treatments({ treatment, onUpdateTreatment, onDeleteTreatment, patients, doctors }) {
    const [editing, setEditing] = useState(false);
    const [updatedTreatment, setUpdatedTreatment] = useState(treatment);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        onUpdateTreatment(treatment.treatmentID, updatedTreatment);
        setEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTreatment({ ...updatedTreatment, [name]: value });
    };

    return (
        <tr>
            <td>{treatment.treatmentID}</td>
            {editing ? (
                <>
                    <td>
                        <select name="patientID" value={updatedTreatment.patientID} onChange={handleChange}>
                            {patients.map(patient => (
                                <option key={patient.patientID} value={patient.patientID}>
                                    {patient.patientID} - {patient.firstName} {patient.lastName}
                                </option>
                            ))}
                        </select>
                    </td>
                    <td><input type="text" name="description" value={updatedTreatment.description} onChange={handleChange} /></td>
                    <td><input type="datetime-local" name="date" value={updatedTreatment.date} onChange={handleChange} /></td>
                    <td><input type="text" name="diagnosis" value={updatedTreatment.diagnosis} onChange={handleChange} /></td>
                    <td><input type="text" name="symptoms" value={updatedTreatment.symptoms} onChange={handleChange} /></td>
                    <td style={{ textAlign: 'center' }}>
                        <button className="btn-action" onClick={handleSave}>Save</button>
                    </td>
                </>
            ) : (
                <>
                    <td>{treatment.patientID}</td>
                    <td>{treatment.description}</td>
                    <td>{treatment.date}</td>
                    <td>{treatment.diagnosis}</td>
                    <td>{treatment.symptoms}</td>
                    <td style={{ textAlign: 'center' }}>
                        <button className="btn-action" onClick={handleEdit}><FaEdit /></button>
                        <button className="btn-action" onClick={() => onDeleteTreatment(treatment.treatmentID)}><FaTrashAlt /></button>
                    </td>
                </>
            )}
        </tr>
    );
}

export default Treatments;
