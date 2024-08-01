import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import SearchBar from '../components/SearchBar';
import AppointmentsTable from '../components/AppointmentsTable';

function AppointmentsPage() {
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const fetchAppointments = async () => {
        try {
            const response = await fetch('/appointments');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setAppointments(data);
            setFilteredAppointments(data);
        } catch (error) {
            console.error('Error fetching appointment data:', error);
        }
    };

    useEffect(() => {
        if (showTable) {
            fetchAppointments();
        }
    }, [showTable]);

    const handleSearch = (searchTerm) => {
        const filtered = appointments.filter(appointment =>
            appointment.reason.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAppointments(filtered);
    };

    const handleSubmitNewAppointment = async (event) => {
        event.preventDefault();
        const form = event.target;
        const newAppointment = {
            appointmentID: form.appointmentID.value,
            doctorID: form.doctorID.value,
            patientID: form.patientID.value,
            roomID: form.roomID.value,
            status: form.status.value,
            reason: form.reason.value,
            checkInTime: form.checkInTime.value,
            checkOutTime: form.checkOutTime.value,
            date: form.date.value,
        };

        try {
            const response = await fetch('/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newAppointment),
            });

            if (response.ok) {
                alert('New appointment added successfully!');
                form.reset();
                fetchAppointments();
                setShowForm(false);
                setShowTable(true);
            } else {
                const errorMessage = await response.text();
                alert(`Failed to add new appointment: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error adding new appointment:', error);
            alert('Error adding new appointment. Please try again.');
        }
    };

    const renderTableSection = () => (
        <>
            <SearchBar placeholder="Search Appointments..." onSearch={handleSearch} />
            <div className="patients-list">
                <AppointmentsTable appointments={filteredAppointments} />
            </div>
        </>
    );

    const renderFormSection = () => (
        <form onSubmit={handleSubmitNewAppointment}>
            <h3>Add New Appointment</h3>
            <input type="text" name="appointmentID" placeholder="Appointment ID" required />
            <input type="text" name="doctorID" placeholder="Doctor ID" required />
            <input type="text" name="patientID" placeholder="Patient ID" required />
            <input type="text" name="roomID" placeholder="Room ID" required />
            <select name="status" required>
                <option value="">Select Status</option>
                <option value="Confirmed">Confirmed</option>
                <option value="In-Room">In-Room</option>
                <option value="Released">Released</option>
            </select>
            <select name="reason" required>
                <option value="">Select Reason</option>
                <option value="Scheduled">Scheduled</option>
                <option value="ER">ER</option>
            </select>
            <input type="time" name="checkInTime" placeholder="Check-In Time" required />
            <input type="time" name="checkOutTime" placeholder="Check-Out Time" />
            <input type="date" name="date" placeholder="Date" required />
            <button type="submit" className="btn-action">Submit</button>
        </form>
    );

    return (
        <>
            <NavigationBar />
            <div className="container">
                <section className="patients-section">
                    <h2>Appointments</h2>
                    <p>View and manage appointments</p>
                    <div className="patient-actions">
                        <button className="btn-action" onClick={() => { setShowTable(true); setShowForm(false); }}>View All Appointments</button>
                        <button className="btn-action" onClick={() => { setShowTable(false); setShowForm(true); }}>Add New Appointment</button>
                    </div>
                    {showTable && renderTableSection()}
                    {showForm && renderFormSection()}
                </section>
            </div>
        </>
    );
}

export default AppointmentsPage;
