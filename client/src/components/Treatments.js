import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';


function Treatments({ treatment }) {
    return (
        <tr>
            <td>{treatment.treatmentID}</td>
            <td>{treatment.patientID}</td>
            <td>{treatment.description}</td>
            <td>{treatment.date}</td>
            <td>{treatment.diagnosis}</td>
            <td>{treatment.symptoms}</td>
            <td>{treatment.lastName}</td>
            <td>
                <button className="btn-action"><FaEdit /></button>
                <button className="btn-action"><FaTrashAlt /></button>
            </td>
        </tr>
    );
}

export default Treatments;
