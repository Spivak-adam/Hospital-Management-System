import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import SearchBar from '../components/SearchBar';
import DoctorsTable from '../components/DoctorsTable';

function DoctorsPage() {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [patients, setPatients] = useState([]);
    const [rooms, setRooms] = useState([]);
    
    useEffect(() => {
        fetchDoctors();
        fetchPatients();
        fetchRooms();
    }, []);
    
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
    
    const fetchDoctors = async () => {
        try {
            const response = await fetch('/doctors');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setDoctors(data);
            setFilteredDoctors(data);
        } catch (error) {
            console.error('Error fetching doctor data:', error);
        }
    };


    
    const handleSearch = (searchTerm) => {
        const filtered = doctors.filter(doctor => {
            // Find all patients associated with this doctor
            const associatedPatients = patients.filter(patient => patient.primaryDoctorID === doctor.doctorID);
            // Find all rooms associated with this doctor
            const associatedRooms = rooms.filter(room => room.doctorID === doctor.doctorID);
    
            // Combine all the fields into a single string to search within
            const combinedData = `
                ${doctor.doctorID}
                ${doctor.firstName}
                ${doctor.lastName}
                ${doctor.specialization}
                ${doctor.email}
                ${doctor.phoneNumber}
                ${doctor.language}
                ${doctor.gender}
                ${associatedPatients.map(patient => `${patient.firstName} ${patient.lastName} ${patient.patientID}`).join(" ")}
                ${associatedRooms.map(room => `${room.roomID} ${room.location} ${room.number}`).join(" ")}
            `.toLowerCase();
    
            // Check if the search term is present in the combined data
            return combinedData.includes(searchTerm.toLowerCase());
        });
    
        setFilteredDoctors(filtered);
    };
    
    

    const handleSubmitNewDoctor = async (event) => {
        event.preventDefault();
        const form = event.target;
        const newDoctor = {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            specialization: form.specialization.value,
            email: form.email.value,
            phoneNumber: form.phoneNumber.value,
            language: form.language.value,
            gender: form.gender.value,
        };

        try {
            const response = await fetch('/doctors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newDoctor),
            });

            if (response.ok) {
                alert('New doctor added successfully!');
                form.reset();
                fetchDoctors();
                setShowForm(false);
                setShowTable(true);
            } else {
                const errorMessage = await response.text();
                alert(`Failed to add new doctor: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error adding new doctor:', error);
            alert('Error adding new doctor. Please try again.');
        }
    };

    const handleUpdateDoctor = async (doctorID, updatedDoctor) => {
        const confirmUpdate = window.confirm("Are you sure you want to udpate this doctor?");
        if (!confirmUpdate) return;

        try {
            const response = await fetch(`/doctors/${doctorID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedDoctor),
            });

            if (response.ok) {
                alert('Doctor updated successfully!');
                fetchDoctors();
            } else {
                const errorMessage = await response.text();
                alert(`Failed to update doctor: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error updating doctor:', error);
            alert('Error updating doctor. Please try again.');
        }
    };

    const handleDeleteDoctor = async (doctorID) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this doctor?");
        if (!confirmDelete) return;
        
        try {
            const response = await fetch(`/doctors/${doctorID}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Doctor deleted successfully!');
                fetchDoctors();
            } else {
                const errorMessage = await response.text();
                alert(`Failed to delete doctor: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error deleting doctor:', error);
            alert('Error deleting doctor. Please try again.');
        }
    };

    const renderTableSection = () => (
        <>
            <SearchBar placeholder="Search Doctors..." onSearch={handleSearch} />
            <div className="patients-list">
                <DoctorsTable
                    doctors={filteredDoctors}
                    onUpdateDoctor={handleUpdateDoctor}
                    onDeleteDoctor={handleDeleteDoctor}
                />
            </div>
        </>
    );

    const renderFormSection = () => (
        <form className="createDataForm" onSubmit={handleSubmitNewDoctor}>
            <h3>Add New Doctor</h3>
        <label htmlFor="firstName">First Name:</label>
            <input type="text" name="firstName" placeholder="First Name" required />
        <label htmlFor="lastName">last Name:</label>        
            <input type="text" name="lastName" placeholder="Last Name" required />
        <label htmlFor="specialization">Specialization:</label>        
            <input type="text" name="specialization" placeholder="Specialization" required />
        <label htmlFor="email">Email:</label>        
            <input type="email" name="email" placeholder="Email" required />
        <label htmlFor="phoneNumber">Phone Number:</label>        
            <input type="text" name="phoneNumber" placeholder="Phone Number" required />
        <label htmlFor="language">Language:</label>        
            <input type="text" name="language" placeholder="Language" required />
        <label htmlFor="gender">Gender:</label>        
             <select name="gender">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
            </select>
            <button type="submit" className="btn-action">Submit</button>

        </form>
    );

    return (
        <>
            <NavigationBar />
            <div className="container">
                <section className="patients-section">
                    <h2>Doctors</h2>
                    <p>Manage doctors in the system</p>
                    <div className="patientss-actions">
                        <button className="btn-action" onClick={() => { setShowTable(true); setShowForm(false); setFilteredDoctors(doctors); }}>View All Doctors</button>
                        <button className="btn-action" onClick={() => { setShowTable(false); setShowForm(true); }}>Add New Doctor</button>
                    </div>
                    {showTable && renderTableSection()}
                    {showForm && renderFormSection()}
                </section>
            </div>
        </>
    );
}

export default DoctorsPage;
