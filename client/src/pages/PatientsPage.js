import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import SearchBar from '../components/SearchBar';

function PatientsPage() {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);

    useEffect(() => {
        // Fetch patients data from the server
        const fetchPatients = async () => {
            try {
                const response = await fetch('/patients'); // Ensure this endpoint exists and returns data
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPatients(data);
                setFilteredPatients(data);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        fetchPatients();
    }, []);

    const handleSearch = (searchTerm) => {
        const filtered = patients.filter(patient =>
            `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPatients(filtered);
    };

    return (
        <>
            <NavigationBar />
            <div className="container">
                <section className="patients-section">
                    <h2>Patients</h2>
                    <p>View and manage patient records</p>

                    <SearchBar placeholder="Search Patients..." onSearch={handleSearch} />

                    <div className="patient-actions">
                        <button className="btn-action">Add New Patient</button>
                        <button className="btn-action">View All Patients</button>
                    </div>

                    <div className="patients-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Patient ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Age</th>
                                    <th>Gender</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPatients.map((patient, index) => (
                                    <tr key={index}>
                                        <td>{patient.patientID}</td>
                                        <td>{patient.firstName}</td>
                                        <td>{patient.lastName}</td>
                                        <td>{patient.age}</td>
                                        <td>{patient.gender}</td>
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

export default PatientsPage;
