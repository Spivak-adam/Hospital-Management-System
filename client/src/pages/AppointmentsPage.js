import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import SearchBar from '../components/SearchBar';

function AppointmentsPage() {
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);

    useEffect(() => {
        // Fetch appointments data from the server
        const fetchAppointments = async () => {
            try {
                const response = await fetch('/appointments');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAppointments(data);
                setFilteredAppointments(data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, []);

    const handleSearch = (searchTerm) => {
        const filtered = appointments.filter(appointment =>
            `${appointment.patientName} ${appointment.doctorName}`.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAppointments(filtered);
    };

    return (
        <>
            <NavigationBar />
            <div className="container">
                <section className="patients-section">
                    <h2>Appointments</h2>
                    <p>Schedule and view appointments</p>

                    <SearchBar placeholder="Search Appointments..." onSearch={handleSearch} />

                    <div className="patient-actions">
                        <button className="btn-action">Add New Appointment</button>
                        <button className="btn-action">View All Appointments</button>
                    </div>

                    <div className="patients-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Appointment ID</th>
                                    <th>Patient Name</th>
                                    <th>Doctor Name</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAppointments.map((appointment, index) => (
                                    <tr key={index}>
                                        <td>{appointment.appointmentID}</td>
                                        <td>{appointment.patientName}</td>
                                        <td>{appointment.doctorName}</td>
                                        <td>{appointment.date}</td>
                                        <td>{appointment.time}</td>
                                        <td>
                                            <button className="btn-action">Edit</button>
                                            <button className="btn-action">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </>
    );
}

export default AppointmentsPage;
