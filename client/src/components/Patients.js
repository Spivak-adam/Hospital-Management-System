import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function Patients({ patient, onUpdatePatient, onDeletePatient, rooms, doctors }) {
    const [editing, setEditing] = useState(false);
    const [updatedPatient, setUpdatedPatient] = useState(patient);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        onUpdatePatient(patient.patientID, updatedPatient);
        setEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedPatient({ ...updatedPatient, [name]: value });
    };


    
    return (
        <tr>
            <td>{patient.patientID}</td>
            {editing ? (
                <>
                    <td><input type="text" name="firstName" value={updatedPatient.firstName} onChange={handleChange} /></td>
                    <td><input type="text" name="lastName" value={updatedPatient.lastName} onChange={handleChange} /></td>
                    <td>
                        <select name="primaryDoctorID" value={updatedPatient.primaryDoctorID} onChange={handleChange}>
                            {doctors.map(doctor => (
                                <option key={doctor.doctorID} value={doctor.doctorID}>
                                    {doctor.doctorID} - ({doctor.firstName} {doctor.lastName})
                                </option>
                            ))}
                        </select>
                    </td>
                    <td><input type="date" name="dateOfBirth" value={updatedPatient.dateOfBirth} onChange={handleChange} /></td>
                    <td><input type="text" name="contactPhone" value={updatedPatient.contactPhone} onChange={handleChange} /></td>
                    <td><input type="email" name="contactEmail" value={updatedPatient.contactEmail} onChange={handleChange} /></td>
                    <td><input type="text" name="address" value={updatedPatient.address} onChange={handleChange} /></td>
                    <td><input type="text" name="emergencyContactName" value={updatedPatient.emergencyContactName} onChange={handleChange} /></td>
                    <td><input type="text" name="emergencyContactPhone" value={updatedPatient.emergencyContactPhone} onChange={handleChange} /></td>
                    <td><input type="email" name="emergencyContactEmail" value={updatedPatient.emergencyContactEmail} onChange={handleChange} /></td>
                    <td><input type="datetime-local" name="checkInTime" value={updatedPatient.checkInTime} onChange={handleChange} /></td>
                    <td><input type="text" name="bloodType" value={updatedPatient.bloodType} onChange={handleChange} /></td>
                    <td>
                        <select name="sex" value={updatedPatient.sex} onChange={handleChange}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </td>
                    <td>
                        <select name="gender" value={updatedPatient.gender} onChange={handleChange}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </td>
                    <td><input type="number" name="age" value={updatedPatient.age} onChange={handleChange} /></td>
                    <td><input type="text" name="language" value={updatedPatient.language} onChange={handleChange} /></td>
                    <td>
                        <select name="patientType" value={updatedPatient.patientType} onChange={handleChange}>
                            <option value="Primary">Primary</option>
                            <option value="Emergency">Emergency</option>
                            <option value="Specialist">Specialist</option>
                        </select>
                    </td>
                    <td><input type="datetime-local" name="releaseDate" value={updatedPatient.releaseDate} onChange={handleChange} /></td>
                    <td style={{ textAlign: 'center' }}>
                        <button className="btn-action" onClick={handleSave}>Save</button>
                    </td>
                </>
            ) : (
                <>
                    <td>{patient.firstName}</td>
                    <td>{patient.lastName}</td>
                    <td>
                        {
                            (() => {
                                const doctor = doctors.find(d => d.doctorID === patient.primaryDoctorID);
                                return doctor ? `${doctor.doctorID} - (Dr. ${doctor.firstName} ${doctor.lastName})` : patient.primaryDoctorID;
                            })()
                        }
                    </td>                 
                    <td>{patient.dateOfBirth}</td>
                    <td>{patient.contactPhone}</td>
                    <td>{patient.contactEmail}</td>
                    <td>{patient.address}</td>
                    <td>{patient.emergencyContactName}</td>
                    <td>{patient.emergencyContactPhone}</td>
                    <td>{patient.emergencyContactEmail}</td>
                    <td>{patient.checkInTime}</td>
                    <td>{patient.bloodType}</td>
                    <td>{patient.sex}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.age}</td>
                    <td>{patient.language}</td>
                    <td>{patient.patientType}</td>
                    <td>{patient.releaseDate}</td>
                    <td style={{ textAlign: 'center' }}>
                        <button className="btn-action" onClick={handleEdit}><FaEdit /></button>
                        <button className="btn-action" onClick={() => onDeletePatient(patient.patientID)}><FaTrashAlt /></button>
                    </td>
                </>
            )}
        </tr>
    );
}

export default Patients;
