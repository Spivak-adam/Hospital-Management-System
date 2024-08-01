import React from 'react';
import Appointments from './Appointments';

function AppointmentsTable({ appointments }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Appointment ID</th>
                    <th>Doctor ID</th>
                    <th>Patient ID</th>
                    <th>Room ID</th>
                    <th>Status</th>
                    <th>Reason</th>
                    <th>Check-In Time</th>
                    <th>Check-Out Time</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                        <Appointments key={appointment.appointmentID} appointment={appointment} />
                    ))
                ) : (
                    <tr>
                        <td colSpan="10" style={{ textAlign: 'center' }}>No appointments available</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default AppointmentsTable;
