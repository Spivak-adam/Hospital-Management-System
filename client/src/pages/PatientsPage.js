import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import SearchBar from '../components/SearchBar';
import PatientsTable from '../components/PatientsTable';

function PatientsPage() {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetchPatients();
        fetchDoctors();
        fetchRooms();
    }, []);

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

    const fetchRooms = async () => {
        try {
            const response = await fetch('/rooms');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setRooms(data);
        } catch (error) {
            console.error('Error fetching room data:', error);
        }
    };



    const handleSearch = (searchTerm) => {
        const filtered = patients.filter(patient => {
            // Get the related room data
            const room = rooms.find(r => r.roomID === patient.roomID);
            // Get the related doctor data
            const doctor = doctors.find(d => d.doctorID === patient.primaryDoctorID);
    
            // Combine all the fields into a single string to search within
            const combinedData = `
                ${patient.patientID}
                ${patient.firstName}
                ${patient.lastName}
                ${patient.dateOfBirth}
                ${patient.contactPhone}
                ${patient.contactEmail}
                ${patient.address}
                ${patient.emergencyContactName}
                ${patient.emergencyContactPhone}
                ${patient.emergencyContactEmail}
                ${patient.checkInTime}
                ${patient.bloodType}
                ${patient.sex}
                ${patient.gender}
                ${patient.age}
                ${patient.language}
                ${patient.patientType}
                ${patient.releaseDate}
                ${room ? `${room.roomID} ${room.location}` : ""}
                ${doctor ? `${doctor.firstName} ${doctor.lastName} ${doctor.doctorID}` : ""}
            `.toLowerCase();
    
            // Check if the search term is present in the combined data
            return combinedData.includes(searchTerm.toLowerCase());
        });
    
        setFilteredPatients(filtered);
    };
        


    const handleSubmitNewPatient = async (event) => {
        event.preventDefault();
        const form = event.target;
        const newPatient = {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            primaryDoctorID: form.primaryDoctorID.value,
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

    const handleUpdatePatient = async (patientID, updatedPatient) => {
        const confirmUpdate = window.confirm("Are you sure you want to update this patient?");
        if (!confirmUpdate) return;

        try {
            const response = await fetch(`/patients/${patientID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPatient),
            });

            if (response.ok) {
                alert('Patient updated successfully!');
                fetchPatients();
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
        const confirmDelete = window.confirm("Are you sure you want to delete this patient?");
        if (!confirmDelete) return;
        
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
                <PatientsTable
                    patients={filteredPatients}
                    onUpdatePatient={handleUpdatePatient}
                    onDeletePatient={handleDeletePatient}
                    rooms={rooms}
                    doctors={doctors}
                />
            </div>
        </>
    );

    

    const renderFormSection = () => (
        <form className="createDataForm" onSubmit={handleSubmitNewPatient}>
            <h3>Add New Patient</h3>
            <label htmlFor="firstName">First Name:</label>
            <input type="text" name="firstName" placeholder="First Name" required />

            <label htmlFor="lastname">Last Name:</label>
            <input type="text" name="lastName" placeholder="Last Name" required />

        
            <label htmlFor="primaryDoctorID">Primary Doctor ID:</label>
            <select name="primaryDoctorID" required>
                <option value="">Select Primary Doctor</option>
                {doctors.map(doctor => (
                    <option key={doctor.doctorID} value={doctor.doctorID}>
                        {doctor.doctorID} - {doctor.firstName} {doctor.lastName}
                    </option>
                ))}
            </select>
              <label htmlFor="dateOfBirth">Date of Birth:</label>          
            <input type="date" name="dateOfBirth" placeholder="Date of Birth" required />
                <label htmlFor="contactPhone">Contact Phone:</label>
            <input type="text" name="contactPhone" placeholder="Contact Phone" required />
                 <label htmlFor="contactEmail">Contact Email:</label>           
            <input type="email" name="contactEmail" placeholder="Contact Email" required />
                <label htmlFor="address">Address:</label>
            <input type="text" name="address" placeholder="Address" required />
                 <label htmlFor="emergencyContactName">Emergency Contact Name::</label>
            <input type="text" name="emergencyContactName" placeholder="Emergency Contact Name" required />
                <label htmlFor="emergencyContactPhone">Emergency Contact Phone Number:</label>                    
            <input type="text" name="emergencyContactPhone" placeholder="Emergency Contact Phone" required />
                 <label htmlFor="emergencyContactEmail">Emergency Contact Email:</label>               
            <input type="email" name="emergencyContactEmail" placeholder="Emergency Contact Email" required />
                   <label htmlFor="checkInTime">Check-In Time:</label>             
            <input type="datetime-local" name="checkInTime" placeholder="Check-In Time" required />
                 <label htmlFor="bloodType">Blood Type:</label>               
            <input type="text" name="bloodType" placeholder="Blood Type" required />
                 <label htmlFor="sex">Sex:</label>               
            <select name="sex" required>
                <option value="">Select Sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
                  <label htmlFor="gender">Gender:</label>              
            <select name="gender" required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
                  <label htmlFor="age">Age:</label>              
            <input type="number" name="age" placeholder="Age" required />
                   <label htmlFor="language">Language:</label>       
            <input type="text" name="language" placeholder="Language" required />
                  <label htmlFor="patientType">Patient Type::</label>                        
            <select name="patientType" required>
                <option value="">Select Patient Type</option>
                <option value="Primary">Primary</option>
                <option value="Emergency">Emergency</option>
                <option value="Specialist">Specialist</option>
            </select>
                  <label htmlFor="releaseDate">Release Date:</label>                        
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
                    <p>Manage patients in the system</p>
                    <div className="patients-actions">
                        <button className="btn-action" onClick={() => { setShowTable(true); setShowForm(false); setFilteredPatients(patients); }}>View All Patients</button>
                        <button className="btn-action" onClick={() => { setShowTable(false); setShowForm(true); }}>Add New Patient</button>
                    </div>
                    {showTable && renderTableSection()}
                    {showForm && renderFormSection()}
                </section >
            </div >
        </>
    );
}

export default PatientsPage;
