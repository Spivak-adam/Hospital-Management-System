import React from 'react';
import Treatments from './Treatments';

function TreatmentsTable({ treatments, onUpdateTreatment, onDeleteTreatment, doctors, patients }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Treatment ID</th>
                    <th>Patient</th>
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
                            doctors={doctors}
                            patients={patients} // Pass the patients prop down
                        />
                    ))
                ) : (
                    <tr>
                        <td colSpan="8" style={{ textAlign: 'center' }}>No treatments available</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default TreatmentsTable;

