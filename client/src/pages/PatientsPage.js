import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import SearchBar from '../components/SearchBar';
import PatientsTable from '../components/PatientsTable';

function PatientsPage() {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const fetchPatients = async () => {
        try {
            const response = await fetch('/patients');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setPatients(data);
            setFilteredPatients(data);
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
            `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPatients(filtered);
    };

    const handleSubmitNewPatient = async (event) => {
        event.preventDefault();
        const form = event.target;
        const newPatient = {
            patientID: form.patientID.value,
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
            releaseDate: form.releaseDate.value
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

    const renderTableSection = () => (
        <>
            <SearchBar placeholder="Search Patients..." onSearch={handleSearch} />
            <div className="patients-list">
                <PatientsTable patients={filteredPatients} />
            </div>
        </>
    );

    const renderFormSection = () => (
        <form onSubmit={handleSubmitNewPatient}>
            <h3>Add New Patient</h3>
            <input type="text" name="patientID" placeholder="Patient ID" required />
            <input type="text" name="firstName" placeholder="First Name" required />
            <input type="text" name="lastName" placeholder="Last Name" required />
            <input type="text" name="roomID" placeholder="Room ID" required />
            <input type="text" name="primaryDoctorID" placeholder="Primary Doctor ID" required />
            <input type="text" name="appointmentID" placeholder="Appointment ID" required />
            <input type="date" name="dateOfBirth" placeholder="Date of Birth" required />
            <input type="text" name="contactPhone" placeholder="Contact Phone" required />
            <input type="email" name="contactEmail" placeholder="Contact Email" />
            <input type="text" name="address" placeholder="Address" required />
            <input type="text" name="emergencyContactName" placeholder="Emergency Contact Name" />
            <input type="text" name="emergencyContactPhone" placeholder="Emergency Contact Phone" />
            <input type="email" name="emergencyContactEmail" placeholder="Emergency Contact Email" />
            <input type="datetime-local" name="checkInTime" placeholder="Check-In Time" required />
            <input type="text" name="bloodType" placeholder="Blood Type" required />
            <select name="sex" required>
                <option value="">Select Sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <select name="gender" required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
            <input type="number" name="age" placeholder="Age" required />
            <input type="text" name="language" placeholder="Language" required />
            <select name="patientType" required>
                <option value="">Select Patient Type</option>
                <option value="Primary">Primary</option>
                <option value="Emergency">Emergency</option>
                <option value="Specialist">Specialist</option>
            </select>
            <input type="datetime-local" name="releaseDate" placeholder="Release Date" />
            <button type="submit" className="btn-action">Submit</button>
        </form>
    );

    return (
        <>
            <NavigationBar />
            <div className="container">
                <section className="patients-section">
                    <h2>Patients</h2>
                    <p>View and manage patient records</p>
                    <div className="patient-actions">
                        <button className="btn-action" onClick={() => { setShowTable(true); setShowForm(false); }}>View All Patients</button>
                        <button className="btn-action" onClick={() => { setShowTable(false); setShowForm(true); }}>Add New Patient</button>
                    </div>
                    {showTable && renderTableSection()}
                    {showForm && renderFormSection()}
                </section>
            </div>
        </>
    );
}

export default PatientsPage;
