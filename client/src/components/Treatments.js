import React from 'react';

function Treatments({ treatment }) {
    return (
        <tr>
            <td>{treatment.treatmentID}</td>
            <td>{treatment.patientID}</td>
            <td>{treatment.description}</td>
            <td>{treatment.date}</td>
            <td>{treatment.diagnosis}</td>
            <td>{treatment.symptoms}</td>
            <td>
                <button className="btn-action">Edit</button>
                <button className="btn-action">Delete</button>
            </td>
        </tr>
    );
}

export default Treatments;
