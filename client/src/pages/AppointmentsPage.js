import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import SearchBar from '../components/SearchBar';
import AppointmentsTable from '../components/AppointmentsTable';

function AppointmentsPage() {
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [availableRooms, setAvailableRooms] = useState([]);

    useEffect(() => {
        fetchAppointments();
        fetchPatients();
        fetchDoctors();
        fetchAvailableRooms();
    }, []);

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

    const fetchPatients = async () => {
        try {
            const response = await fetch('/patients');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setPatients(data);
        } catch (error) {
            console.error('Error fetching patient data:', error);
        }
    };

    const fetchDoctors = async () => {
        try {
            const response = await fetch('/doctors');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setDoctors(data);
        } catch (error) {
            console.error('Error fetching doctor data:', error);
        }
    };

    const fetchAvailableRooms = async () => {
        try {
            const response = await fetch('/rooms?available=true');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setAvailableRooms(data);
        } catch (error) {
            console.error('Error fetching available room data:', error);
        }
    };

    const handleSearch = (searchTerm) => {
        const filtered = appointments.filter(appointment =>
            Object.values(appointment).some(value =>
                (value !== null && value !== undefined ? value.toString() : "").toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setFilteredAppointments(filtered);
    };

    const handleSubmitNewAppointment = async (event) => {
        event.preventDefault();
        const form = event.target;
        const newAppointment = {
            patientID: form.patientID.value,
            doctorID: form.doctorID.value,
            roomID: form.roomID.value,
            date: form.date.value,
            checkInTime: form.checkInTime.value,
            checkOutTime: form.checkOutTime.value,
            status: form.status.value,
            reason: form.reason.value,
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

    const handleUpdateAppointment = async (appointmentID, updatedAppointment) => {
        try {
            const response = await fetch(`/appointments/${appointmentID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedAppointment),
            });

            if (response.ok) {
                alert('Appointment updated successfully!');
                fetchAppointments();
            } else {
                const errorMessage = await response.text();
                alert(`Failed to update appointment: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error updating appointment:', error);
            alert('Error updating appointment. Please try again.');
        }
    };

    const handleDeleteAppointment = async (appointmentID) => {
        try {
            const response = await fetch(`/appointments/${appointmentID}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Appointment deleted successfully!');
                fetchAppointments();
            } else {
                const errorMessage = await response.text();
                alert(`Failed to delete appointment: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error deleting appointment:', error);
            alert('Error deleting appointment. Please try again.');
        }
    };

    const renderTableSection = () => (
        <>
            <SearchBar placeholder="Search Appointments..." onSearch={handleSearch} />
            <div className="patients-list">
                <AppointmentsTable
                    appointments={filteredAppointments}
                    onUpdateAppointment={handleUpdateAppointment}
                    onDeleteAppointment={handleDeleteAppointment}
                    patients={patients}
                    doctors={doctors}
                    availableRooms={availableRooms}
                />
            </div>
        </>
    );

    const renderFormSection = () => (
        <form className="createDataForm" onSubmit={handleSubmitNewAppointment}>
            <h3>Add New Appointment</h3>
            <select name="patientID" required>
                <option value="">Select Patient</option>
                {patients.map(patient => (
                    <option key={patient.patientID} value={patient.patientID}>
                        {patient.patientID} - {patient.firstName} {patient.lastName}
                    </option>
                ))}
            </select>
            <select name="doctorID" required>
                <option value="">Select Doctor</option>
                {doctors.map(doctor => (
                    <option key={doctor.doctorID} value={doctor.doctorID}>
                        {doctor.doctorID} - {doctor.firstName} {doctor.lastName}
                    </option>
                ))}
            </select>
            <select name="roomID" required>
                <option value="">Select Room</option>
                {availableRooms.map(room => (
                    <option key={room.roomID} value={room.roomID}>
                        {room.roomID} - {room.location} ({room.number})
                    </option>
                ))}
            </select>

            <p>Date of Appointment:</p>
            <input type="date" name="date" placeholder="Date of Appointment" required />
            <p>Check-In Time:</p>
            <input type="time" name="checkInTime" placeholder="Check-In Time" required />
            <p>Check-Out Time:</p>
            <input type="time" name="checkOutTime" placeholder="Check-Out Time" required />

            <select name="status" required>
                <option value="">Select Status</option>
                <option value="Confirmed">Confirmed</option>
                <option value="In-Room">In-Room</option>
                <option value="Released">Released</option>
            </select>
            <select name="reason">
                <option value="">Select Reason</option>
                <option value="Scheduled">Scheduled</option>
                <option value="ER">ER</option>
            </select>
            <button type="submit" className="btn-action">Submit</button>

        </form>
    );

    return (
        <>
            <NavigationBar />
            <div className="container">
                <section className="patients-section">
                    <h2>Appointments</h2>
                    <p>Manage appointments</p>
                    <div className="patients-actions">
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
