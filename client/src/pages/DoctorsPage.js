import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import SearchBar from '../components/SearchBar';
import DoctorsTable from '../components/DoctorsTable';

function DoctorsPage() {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [showForm, setShowForm] = useState(false);

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
            `${doctor.firstName} ${doctor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredDoctors(filtered);
    };

    const handleSubmitNewDoctor = async (event) => {
        event.preventDefault();
        const form = event.target;
        const newDoctor = {
            doctorID: form.doctorID.value,
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

    const renderTableSection = () => (
        <>
            <SearchBar placeholder="Search Doctors..." onSearch={handleSearch} />
            <div className="patients-list">
                <DoctorsTable doctors={filteredDoctors} />
            </div>
        </>
    );

    const renderFormSection = () => (
        <form onSubmit={handleSubmitNewDoctor}>
            <h3>Add New Doctor</h3>
            <input type="text" name="doctorID" placeholder="Doctor ID" required />
            <input type="text" name="firstName" placeholder="First Name" required />
            <input type="text" name="lastName" placeholder="Last Name" required />
            <input type="text" name="specialization" placeholder="Specialization" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="text" name="phoneNumber" placeholder="Phone Number" required />
            <input type="text" name="language" placeholder="Language" required />
            <select name="gender" required>
                <option value="">Select Gender</option>
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
                    <p>View and manage doctors</p>
                    <div className="patient-actions">
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
