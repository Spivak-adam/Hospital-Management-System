import React from 'react';
import Treatments from './Treatments';

function TreatmentsTable({ treatments, onUpdateTreatment, onDeleteTreatment, patients, doctors }) {
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
                        <Treatments
                            treatment={treatment}
                            key={index}
                            onUpdateTreatment={onUpdateTreatment}
                            onDeleteTreatment={onDeleteTreatment}
                            patients={patients}
                            doctors={doctors}
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
