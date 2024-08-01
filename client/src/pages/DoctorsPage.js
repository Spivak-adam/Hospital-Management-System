import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import SearchBar from '../components/SearchBar';

function DoctorsPage() {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);

    useEffect(() => {
        // Fetch doctors data from the server
        const fetchDoctors = async () => {
            try {
                const response = await fetch('/doctors');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setDoctors(data);
                setFilteredDoctors(data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, []);

    const handleSearch = (searchTerm) => {
        const filtered = doctors.filter(doctor =>
            `${doctor.firstName} ${doctor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredDoctors(filtered);
    };

    return (
        <>
            <NavigationBar />
            <div className="container">
                <section className="patients-section">
                    <h2>Doctors</h2>
                    <p>View and manage doctor information</p>

                    <SearchBar placeholder="Search Doctors..." onSearch={handleSearch} />

                    <div className="patient-actions">
                        <button className="btn-action">Add New Doctor</button>
                        <button className="btn-action">View All Doctors</button>
                    </div>

                    <div className="patients-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Doctor ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Specialty</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDoctors.map((doctor, index) => (
                                    <tr key={index}>
                                        <td>{doctor.doctorID}</td>
                                        <td>{doctor.firstName}</td>
                                        <td>{doctor.lastName}</td>
                                        <td>{doctor.specialization}</td>
                                        <td>
                                            <button className="btn-action">Edit</button>
                                            <button className="btn-action">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </>
    );
}

export default DoctorsPage;
