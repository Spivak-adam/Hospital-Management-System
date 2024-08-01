import React from 'react';
import Treatments from './Treatments';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';


function TreatmentsTable({ treatments }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Treatment ID</th>
                    <th>Patient ID</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Diagnosis</th>
                    <th>Symptoms</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {treatments.length > 0 ? (
                    treatments.map((treatment) => (
                        <Treatments key={treatment.treatmentID} treatment={treatment} />
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" style={{ textAlign: 'center' }}>No treatments available</td>
                        <td style={{ textAlign: 'center' }}>
                            <button className="btn-action"><FaEdit /></button>
                            <button className="btn-action"><FaTrashAlt /></button>
                        </td>
                     </tr>
                )}
            </tbody>
        </table>
    );
}

export default TreatmentsTable;
