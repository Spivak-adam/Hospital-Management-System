import React from 'react';
import DoctorTreatments from './DoctorTreatment';

function DoctorTreatmentTable({ DoctorTreatment, onDeleteDoctorTreatment, doctors }) {
    console.log(DoctorTreatment);
    return (
        <table>
            <thead>
                <tr>
                    <th>Treatment ID</th>
                    <th>Doctor</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {DoctorTreatment.map((doctorTreatment, index) => (
                    <DoctorTreatments
                        DoctorTreatments={doctorTreatment}
                        key={index}
                        onDeleteDoctorTreatment={onDeleteDoctorTreatment}
                        doctors={doctors}  // Pass the doctors prop down
                    />
                ))}
            </tbody>
        </table>
    );
}

export default DoctorTreatmentTable;
