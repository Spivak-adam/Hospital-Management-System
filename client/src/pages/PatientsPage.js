import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import SearchBar from '../components/SearchBar';
import PatientsTable from '../components/PatientsTable';

function PatientsPage() {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editPatient, setEditPatient] = useState(null);

    const fetchPatients = async () => {
        try {
            const response = await fetch('/patients');
            if (!response.ok) throw new Error('Network response was not ok');
            const patientData = await response.json();
            setPatients(patientData);
            setFilteredPatients(patientData);
        } catch (error) {
            console.error('Error fetching patient data:', error);
        }
    };

    useEffect(() => {
        if (showTable) {
            fetchPatients();
        }
    }, [showTable]);

    const handleSearch = (searchTerm) => {
        const filtered = patients.filter(patient =>
            patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPatients(filtered);
    };

    const handleSubmitNewPatient = async (event) => {
        event.preventDefault();
        const form = event.target;
        const newPatient = {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            roomID: form.roomID.value,
            primaryDoctorID: form.primaryDoctorID.value,
            appointmentID: form.appointmentID.value,
            dateOfBirth: form.dateOfBirth.value,
            contactPhone: form.contactPhone.value,
            contactEmail: form.contactEmail.value,
            address: form.address.value,
            emergencyContactName: form.emergencyContactName.value,
            emergencyContactPhone: form.emergencyContactPhone.value,
            emergencyContactEmail: form.emergencyContactEmail.value,
            checkInTime: form.checkInTime.value,
            bloodType: form.bloodType.value,
            sex: form.sex.value,
            gender: form.gender.value,
            age: form.age.value,
            language: form.language.value,
            patientType: form.patientType.value,
            releaseDate: form.releaseDate.value,
        };

        try {
            const response = await fetch('/patients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPatient),
            });

            if (response.ok) {
                alert('New patient added successfully!');
                form.reset();
                fetchPatients();
                setShowForm(false);
                setShowTable(true);
            } else {
                const errorMessage = await response.text();
                alert(`Failed to add new patient: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error adding new patient:', error);
            alert('Error adding new patient. Please try again.');
        }
    };

    const handleUpdatePatient = (patient) => {
        setEditPatient(patient);
        setShowForm(true);
        setShowTable(false);
    };

    const handleSubmitUpdatePatient = async (event) => {
        event.preventDefault();
        const form = event.target;
        const updatedPatient = {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            roomID: form.roomID.value,
            primaryDoctorID: form.primaryDoctorID.value,
            appointmentID: form.appointmentID.value,
            dateOfBirth: form.dateOfBirth.value,
            contactPhone: form.contactPhone.value,
            contactEmail: form.contactEmail.value,
            address: form.address.value,
            emergencyContactName: form.emergencyContactName.value,
            emergencyContactPhone: form.emergencyContactPhone.value,
            emergencyContactEmail: form.emergencyContactEmail.value,
            checkInTime: form.checkInTime.value,
            bloodType: form.bloodType.value,
            sex: form.sex.value,
            gender: form.gender.value,
            age: form.age.value,
            language: form.language.value,
            patientType: form.patientType.value,
            releaseDate: form.releaseDate.value,
        };

        try {
            const response = await fetch(`/patients/${editPatient.patientID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPatient),
            });

            if (response.ok) {
                alert('Patient updated successfully!');
                form.reset();
                fetchPatients();
                setShowForm(false);
                setShowTable(true);
                setEditPatient(null);
            } else {
                const errorMessage = await response.text();
                alert(`Failed to update patient: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error updating patient:', error);
            alert('Error updating patient. Please try again.');
        }
    };

    const handleDeletePatient = async (patientID) => {
        if (!window.confirm('Are you sure you want to delete this patient?')) {
            return;
        }

        try {
            const response = await fetch(`/patients/${patientID}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Patient deleted successfully!');
                fetchPatients();
            } else {
                const errorMessage = await response.text();
                alert(`Failed to delete patient: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error deleting patient:', error);
            alert('Error deleting patient. Please try again.');
        }
    };

    const renderTableSection = () => (
        <>
            <SearchBar placeholder="Search Patients..." onSearch={handleSearch} />
            <div className="patients-list">
                <PatientsTable patients={filteredPatients} onUpdatePatient={handleUpdatePatient} onDeletePatient={handleDeletePatient} />

            </div>
        </>
    );

    const renderFormSection = () => (
        <form onSubmit={editPatient ? handleSubmitUpdatePatient : handleSubmitNewPatient}>
            <h3>{editPatient ? 'Update Patient' : 'Add New Patient'}</h3>
            <input type="text" name="firstName" placeholder="First Name" defaultValue={editPatient ? editPatient.firstName : ''} required />
            <input type="text" name="lastName" placeholder="Last Name" defaultValue={editPatient ? editPatient.lastName : ''} required />
            <input type="text" name="roomID" placeholder="Room ID" defaultValue={editPatient ? editPatient.roomID : ''} required />
            <input type="text" name="primaryDoctorID" placeholder="Primary Doctor ID" defaultValue={editPatient ? editPatient.primaryDoctorID : ''} required />
            <input type="text" name="appointmentID" placeholder="Appointment ID" defaultValue={editPatient ? editPatient.appointmentID : ''} required />
            <input type="date" name="dateOfBirth" placeholder="Date of Birth" defaultValue={editPatient ? editPatient.dateOfBirth : ''} required />
            <input type="text" name="contactPhone" placeholder="Contact Phone" defaultValue={editPatient ? editPatient.contactPhone : ''} required />
            <input type="email" name="contactEmail" placeholder="Contact Email" defaultValue={editPatient ? editPatient.contactEmail : ''} />
            <input type="text" name="address" placeholder="Address" defaultValue={editPatient ? editPatient.address : ''} required />
            <input type="text" name="emergencyContactName" placeholder="Emergency Contact Name" defaultValue={editPatient ? editPatient.emergencyContactName : ''} />
            <input type="text" name="emergencyContactPhone" placeholder="Emergency Contact Phone" defaultValue={editPatient ? editPatient.emergencyContactPhone : ''} />
            <input type="email" name="emergencyContactEmail" placeholder="Emergency Contact Email" defaultValue={editPatient ? editPatient.emergencyContactEmail : ''} />
            <input type="datetime-local" name="checkInTime" placeholder="Check-in Time" defaultValue={editPatient ? editPatient.checkInTime : ''} required />
            <input type="text" name="bloodType" placeholder="Blood Type" defaultValue={editPatient ? editPatient.bloodType : ''} required />
            <input type="text" name="sex" placeholder="Sex" defaultValue={editPatient ? editPatient.sex : ''} required />
            <input type="text" name="gender" placeholder="Gender" defaultValue={editPatient ? editPatient.gender : ''} required />
            <input type="number" name="age" placeholder="Age" defaultValue={editPatient ? editPatient.age : ''} required />
            <input type="text" name="language" placeholder="Language" defaultValue={editPatient ? editPatient.language : ''} required />
            <input type="text" name="patientType" placeholder="Patient Type" defaultValue={editPatient ? editPatient.patientType : ''} required />
            <input type="datetime-local" name="releaseDate" placeholder="Release Date" defaultValue={editPatient ? editPatient.releaseDate : ''} />
            <button type="submit" className="btn-action">{editPatient ? 'Update' : 'Submit'}</button>
        </form>
    );

    return (
        <>
            <NavigationBar />
            <div className="container">
                <section className="patients-section">
                    <h2>Patients</h2>
                    <p>Manage patient information</p>
                    <div className="patient-actions">
                        <button className="btn-action" onClick={() => { setShowTable(true); setShowForm(false); }}>View All Patients</button>
                        <button className="btn-action" onClick={() => { setShowTable(false); setShowForm(true); setEditPatient(null); }}>Add New Patient</button>
                    </div>
                    {showTable && renderTableSection()}
                    {showForm && renderFormSection()}
                </section >
            </div >
        </>
    );
}

export default PatientsPage;
