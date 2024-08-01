import React from 'react';

function Appointments({ appointment }) {
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
            <td>
                <button className="btn-action">Edit</button>
                <button className="btn-action">Delete</button>
            </td>
        </tr>
    );
}

export default Appointments;
