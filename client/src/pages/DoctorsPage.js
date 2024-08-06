import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import SearchBar from '../components/SearchBar';
import DoctorsTable from '../components/DoctorsTable';

function DoctorsPage() {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchDoctors();
    }, []);

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
        const filtered = doctors.filter(doctor =>
            Object.values(doctor).some(value =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
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
            <input type="text" name="firstName" placeholder="First Name" required />
            <input type="text" name="lastName" placeholder="Last Name" required />
            <input type="text" name="specialization" placeholder="Specialization" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="text" name="phoneNumber" placeholder="Phone Number" required />
            <input type="text" name="language" placeholder="Language" required />
            <input type="text" name="gender" placeholder="Gender" required />
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
                        <button className="btn-action" onClick={() => { setShowTable(true); setShowForm(false); }}>View All Doctors</button>
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
