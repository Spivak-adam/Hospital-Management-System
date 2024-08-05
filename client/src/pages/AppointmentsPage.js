import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import SearchBar from '../components/SearchBar';
import AppointmentsTable from '../components/AppointmentsTable';

function AppointmentsPage() {
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editAppointment, setEditAppointment] = useState(null);

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
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        const filtered = appointments.filter(appointment => {
            return (
                appointment.appointmentID.toString().includes(lowercasedSearchTerm) ||
                appointment.doctorID.toString().includes(lowercasedSearchTerm) ||
                appointment.patientID.toString().includes(lowercasedSearchTerm) ||
                appointment.roomID.toString().includes(lowercasedSearchTerm) ||
                appointment.status.toLowerCase().includes(lowercasedSearchTerm) ||
                appointment.reason.toLowerCase().includes(lowercasedSearchTerm) ||
                appointment.checkInTime.toLowerCase().includes(lowercasedSearchTerm) ||
                (appointment.checkOutTime && appointment.checkOutTime.toLowerCase().includes(lowercasedSearchTerm)) ||
                appointment.date.toLowerCase().includes(lowercasedSearchTerm)
            );
        });
        setFilteredAppointments(filtered);
    };

    

    
    const handleSubmitNewAppointment = async (event) => {
        event.preventDefault();
        const form = event.target;
        const newAppointment = {
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

    const handleUpdateAppointment = async (id, updatedAppointment) => {
        try {
            const response = await fetch(`/appointments/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedAppointment),
            });

            if (response.ok) {
                alert('Appointment updated successfully!');
                fetchAppointments();
                setEditMode(false);
                setEditAppointment(null);
            } else {
                const errorMessage = await response.text();
                alert(`Failed to update appointment: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error updating appointment:', error);
            alert('Error updating appointment. Please try again.');
        }
    };

    const handleDeleteAppointment = async (id) => {
        try {
            const response = await fetch(`/appointments/${id}`, {
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

    const handleEditClick = (appointment) => {
        setEditMode(true);
        setEditAppointment(appointment);
        setShowForm(true);
        setShowTable(false);
    };

    const renderTableSection = () => (
        <>
            <SearchBar placeholder="Search Appointments..." onSearch={handleSearch} />
            <div className="patients-list">
                <AppointmentsTable 
                    appointments={filteredAppointments} 
                    onUpdateAppointment={handleUpdateAppointment} 
                    onDeleteAppointment={handleDeleteAppointment} 
                    onEditClick={handleEditClick}
                />
            </div>
        </>
    );

    const renderFormSection = () => (
        <form onSubmit={editMode ? (e) => handleSubmitEdit(e) : handleSubmitNewAppointment}>
            <h3>{editMode ? 'Edit Appointment' : 'Add New Appointment'}</h3>
            <input type="text" name="doctorID" placeholder="Doctor ID" defaultValue={editMode ? editAppointment.doctorID : ''} required />
            <input type="text" name="patientID" placeholder="Patient ID" defaultValue={editMode ? editAppointment.patientID : ''} required />
            <input type="text" name="roomID" placeholder="Room ID" defaultValue={editMode ? editAppointment.roomID : ''} required />
            <input type="text" name="status" placeholder="Status" defaultValue={editMode ? editAppointment.status : ''} required />
            <input type="text" name="reason" placeholder="Reason" defaultValue={editMode ? editAppointment.reason : ''} required />
            <input type="text" name="checkInTime" placeholder="Check-In Time" defaultValue={editMode ? editAppointment.checkInTime : ''} required />
            <input type="text" name="checkOutTime" placeholder="Check-Out Time" defaultValue={editMode ? editAppointment.checkOutTime : ''} required />
            <input type="date" name="date" placeholder="Date" defaultValue={editMode ? editAppointment.date : ''} required />
            <button type="submit" className="btn-action">{editMode ? 'Update' : 'Submit'}</button>
        </form>
    );

    const handleSubmitEdit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const updatedAppointment = {
            doctorID: form.doctorID.value,
            patientID: form.patientID.value,
            roomID: form.roomID.value,
            status: form.status.value,
            reason: form.reason.value,
            checkInTime: form.checkInTime.value,
            checkOutTime: form.checkOutTime.value,
            date: form.date.value,
        };

        handleUpdateAppointment(editAppointment.appointmentID, updatedAppointment);
    };

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
