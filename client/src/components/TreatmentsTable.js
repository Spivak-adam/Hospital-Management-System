import React from 'react';
import Treatment from './Treatments';

function TreatmentsTable({ treatments, onUpdateTreatment, onDeleteTreatment, onEditClick }) {
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
                    <th>Assigned Doctors</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {treatments.length > 0 ? (
                    treatments.map((treatment, index) => (
                        <Treatment
                            treatment={treatment}
                            key={index}
                            onUpdateTreatment={onUpdateTreatment}
                            onDeleteTreatment={onDeleteTreatment}
                            onEditClick={onEditClick}
                        />
                    ))
                ) : (
                    <tr>
                        <td colSpan="7" style={{ textAlign: 'center' }}>No treatments available</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default TreatmentsTable;
