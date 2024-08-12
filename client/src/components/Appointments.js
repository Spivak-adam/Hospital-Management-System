import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function Appointments({ appointment, onUpdateAppointment, onDeleteAppointment, patients, doctors, rooms }) {
    const [editing, setEditing] = useState(false);
    const [updatedAppointment, setUpdatedAppointment] = useState(appointment);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        onUpdateAppointment(appointment.appointmentID, updatedAppointment);
        setEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedAppointment({ ...updatedAppointment, [name]: value });
    };

    return (
        <tr>
            <td>{appointment.appointmentID}</td>
            {editing ? (
                <>
                    <td>
                        <select name="patientID" value={updatedAppointment.patientID} onChange={handleChange}>
                            {patients.map(patient => (
                                <option key={patient.patientID} value={patient.patientID}>
                                    {patient.patientID} - {patient.firstName} {patient.lastName}
                                </option>
                            ))}
                        </select>
                    </td>
                    <td>
                        <select name="doctorID" value={updatedAppointment.doctorID} onChange={handleChange}>
                            {doctors.map(doctor => (
                                <option key={doctor.doctorID} value={doctor.doctorID}>
                                    {doctor.doctorID} - {doctor.firstName} {doctor.lastName}
                                </option>
                            ))}
                        </select>
                    </td>
                    <td>
                        <select name="roomID" value={updatedAppointment.roomID} onChange={handleChange}>
                            {rooms.length > 0 ? (
                                rooms.map(room => (
                                    <option key={room.roomID} value={room.roomID}>
                                        {room.roomID} - {room.location} ({room.number})
                                    </option>
                                ))
                            ) : (
                                <option value="">No available rooms</option>
                            )}
                        </select>
                    </td>
                    <td>
                        <select name="status" value={updatedAppointment.status} onChange={handleChange}>
                            <option value="Confirmed">Confirmed</option>
                            <option value="In-Room">In-Room</option>
                            <option value="Released">Released</option>
                        </select>
                    </td>
                    <td>
                        <select name="reason" value={updatedAppointment.reason} onChange={handleChange}>
                            <option value="Scheduled">Scheduled</option>
                            <option value="ER">ER</option>
                        </select>
                    </td>
                    <td><input type="date" name="date" value={updatedAppointment.date} onChange={handleChange} /></td>
                    <td><input type="time" name="checkInTime" value={updatedAppointment.checkInTime} onChange={handleChange} /></td>
                    <td><input type="time" name="checkOutTime" value={updatedAppointment.checkOutTime} onChange={handleChange} /></td>
                    <td style={{ textAlign: 'center' }}>
                        <button className="btn-action" onClick={handleSave}>Save</button>
                    </td>
                </>
            ) : (
                <>
                    <td>
                        {
                            (() => {
                                const patient = patients.find(p => p.patientID === appointment.patientID);
                                return patient ? `${patient.patientID} - ${patient.firstName} ${patient.lastName}` : appointment.patientID;
                            })()
                        }
                    </td>
                    <td>
                        {
                            (() => {
                                const doctor = doctors.find(d => d.doctorID === appointment.doctorID);
                                return doctor ? `${doctor.doctorID} - Dr. ${doctor.firstName} ${doctor.lastName}` : appointment.doctorID;
                            })()
                        }
                    </td>
                    <td>{`${appointment.roomID} - ${appointment.location} (${appointment.number})`}</td>
                    <td>{appointment.status}</td>
                    <td>{appointment.reason}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.checkInTime}</td>
                    <td>{appointment.checkOutTime}</td>
                    <td style={{ textAlign: 'center' }}>
                        <button className="btn-action" onClick={handleEdit}><FaEdit /></button>
                        <button className="btn-action" onClick={() => onDeleteAppointment(appointment.appointmentID)}><FaTrashAlt /></button>
                    </td>
                </>
            )}
        </tr>
    );
}

export default Appointments;
