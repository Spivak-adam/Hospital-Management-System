import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function Appointments({ appointment, onUpdateAppointment, onDeleteAppointment, onEditClick }) {
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this appointment?')) {
            onDeleteAppointment(appointment.appointmentID);
        }
    };

    return (
        <tr>
            <td>{appointment.appointmentID}</td>
            <td>{appointment.doctorID}</td>
            <td>{appointment.patientID}</td>
            <td>{appointment.roomID}</td>
            <td>{appointment.status}</td>
            <td>{appointment.reason}</td>
            <td>{appointment.checkInTime}</td>
            <td>{appointment.checkOutTime}</td>
            <td>{appointment.date}</td>
            <td style={{ textAlign: 'center' }}>
                <button className="btn-action" onClick={() => onEditClick(appointment)}><FaEdit /></button>
                <button className="btn-action" onClick={handleDelete}><FaTrashAlt /></button>
            </td>
        </tr>
    );
}

export default Appointments;
