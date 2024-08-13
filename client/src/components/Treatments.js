import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function Treatments({ treatment, onUpdateTreatment, onDeleteTreatment, doctors, patients }) {
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

    const patient = patients.find(p => p.patientID === treatment.patientID);

    return (
        <tr>
            <td>{treatment.treatmentID}</td>
            <td>{patient ? `${patient.patientID} - ${patient.firstName} ${patient.lastName}` : treatment.patientID}</td>
            {editing ? (
                <>
                    <td><input type="text" name="description" value={updatedTreatment.description} onChange={handleChange} /></td>
                    <td><input type="datetime-local" name="date" value={updatedTreatment.date} onChange={handleChange} /></td>
                    <td><input type="text" name="diagnosis" value={updatedTreatment.diagnosis} onChange={handleChange} /></td>
                    <td><input type="text" name="symptoms" value={updatedTreatment.symptoms} onChange={handleChange} /></td>
                    <td>
                        <select name="doctorID" value={updatedTreatment.doctorID} onChange={handleChange}>
                            {doctors.map(doctor => (
                                <option key={doctor.doctorID} value={doctor.doctorID}>
                                    {doctor.doctorID} - {doctor.firstName} {doctor.lastName}
                                </option>
                            ))}
                        </select>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                        <button className="btn-action" onClick={handleSave}>Save</button>
                    </td>
                </>
            ) : (
                <>
                    <td>{treatment.description}</td>
                    <td>{treatment.date}</td>
                    <td>{treatment.diagnosis}</td>
                    <td>{treatment.symptoms}</td>
                    <td>{treatment.lastName}</td>
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

