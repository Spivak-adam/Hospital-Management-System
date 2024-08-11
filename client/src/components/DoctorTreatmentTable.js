import React from 'react';
import DoctorTreatments from './DoctorTreatment';

function DoctorTreatmentTable({ DoctorTreatment, onDeleteDoctorTreatment}) {
    console.log(DoctorTreatment);
    return (
        <table>
            <thead>
                <th>Treatment ID</th>
                <th>Doctor ID</th>
                <th>Actions</th>
            </thead>
            <tbody>
                {DoctorTreatment.map((doctorTreatment, index) => (
                    <DoctorTreatments
                        DoctorTreatments={doctorTreatment}
                        key={index}
                        onDeleteDoctorTreatment={onDeleteDoctorTreatment}
                    />
                ))}
            </tbody>
        </table>
    )
};

export default DoctorTreatmentTable;