import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import SearchBar from '../components/SearchBar';
import DoctorsTable from '../components/DoctorsTable';

function DoctorsPage() {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editDoctor, setEditDoctor] = useState(null);

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

    useEffect(() => {
        if (showTable) {
            fetchDoctors();
        }
    }, [showTable]);

    const handleSearch = (searchTerm) => {
        const filtered = doctors.filter(doctor =>
            doctor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase())
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
            image: form.image.value,
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

    const handleUpdateDoctor = (doctor) => {
        setEditDoctor(doctor);
        setShowForm(true);
        setShowTable(false);
    };

    const handleSubmitUpdateDoctor = async (event) => {
        event.preventDefault();
        const form = event.target;
        const updatedDoctor = {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            specialization: form.specialization.value,
            email: form.email.value,
            phoneNumber: form.phoneNumber.value,
            image: form.image.value,
            language: form.language.value,
            gender: form.gender.value,
        };

        try {
            const response = await fetch(`/doctors/${editDoctor.doctorID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedDoctor),
            });

            if (response.ok) {
                alert('Doctor updated successfully!');
                form.reset();
                fetchDoctors();
                setShowForm(false);
                setShowTable(true);
                setEditDoctor(null);
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
        if (!window.confirm('Are you sure you want to delete this doctor?')) {
            return;
        }

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
                <DoctorsTable doctors={filteredDoctors} onUpdateDoctor={handleUpdateDoctor} onDeleteDoctor={handleDeleteDoctor} />
            </div>
        </>
    );

    const renderFormSection = () => (
        <form class="createDataForm" onSubmit={editDoctor ? handleSubmitUpdateDoctor : handleSubmitNewDoctor}>
            <h3>{editDoctor ? 'Update Doctor' : 'Add New Doctor'}</h3>
            <input type="text" name="firstName" placeholder="First Name" defaultValue={editDoctor ? editDoctor.firstName : ''} required />
            <input type="text" name="lastName" placeholder="Last Name" defaultValue={editDoctor ? editDoctor.lastName : ''} required />
            <input type="text" name="specialization" placeholder="Specialization" defaultValue={editDoctor ? editDoctor.specialization : ''} required />
            <input type="email" name="email" placeholder="Email" defaultValue={editDoctor ? editDoctor.email : ''} required />
            <input type="text" name="phoneNumber" placeholder="Phone Number" defaultValue={editDoctor ? editDoctor.phoneNumber : ''} required />
            <input type="text" name="image" placeholder="Image" defaultValue={editDoctor ? editDoctor.image : ''} />
            <input type="text" name="language" placeholder="Language" defaultValue={editDoctor ? editDoctor.language : ''} required />
            <input type="text" name="gender" placeholder="Gender" defaultValue={editDoctor ? editDoctor.gender : ''} required />
            <button type="submit" className="btn-action">{editDoctor ? 'Update' : 'Submit'}</button>
        </form>
    );

    return (
        <>
            <NavigationBar />
            <div className="container">
                <section className="patients-section">
                    <h2>Doctors</h2>
                    <p>Manage doctor information</p>
                    <div className="patients-actions">
                        <button className="btn-action" onClick={() => { setShowTable(true); setShowForm(false); }}>View All Doctors</button>
                        <button className="btn-action" onClick={() => { setShowTable(false); setShowForm(true); setEditDoctor(null); }}>Add New Doctor</button>
                    </div>
                    {showTable && renderTableSection()}
                    {showForm && renderFormSection()}
                </section>
            </div>
        </>
    );
}

export default DoctorsPage;
