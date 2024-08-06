import React from 'react';
import Appointments from './Appointments';

function AppointmentsTable({ appointments, onUpdateAppointment, onDeleteAppointment, patients, doctors, rooms }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Appointment ID</th>
                    <th>Patient ID</th>
                    <th>Doctor ID</th>
                    <th>Room ID</th>
                    <th>Status</th>
                    <th>Reason</th>
                    <th>Date</th>
                    <th>Check-In Time</th>
                    <th>Check-Out Time</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {appointments.length > 0 ? (
                    appointments.map((appointment, index) => (
                        <Appointments
                            appointment={appointment}
                            key={index}
                            onUpdateAppointment={onUpdateAppointment}
                            onDeleteAppointment={onDeleteAppointment}
                            patients={patients}
                            doctors={doctors}
                            rooms={rooms}
                        />
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

