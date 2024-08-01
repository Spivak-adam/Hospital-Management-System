import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import SearchBar from '../components/SearchBar';

function TreatmentsPage() {
    const [treatments, setTreatments] = useState([]);
    const [filteredTreatments, setFilteredTreatments] = useState([]);

    useEffect(() => {
        // Fetch treatments data from the server
        const fetchTreatments = async () => {
            try {
                const response = await fetch('/treatments');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTreatments(data);
                setFilteredTreatments(data);
            } catch (error) {
                console.error('Error fetching treatments:', error);
            }
        };

        fetchTreatments();
    }, []);

    const handleSearch = (searchTerm) => {
        const filtered = treatments.filter(treatment =>
            treatment.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTreatments(filtered);
    };

    return (
        <>
            <NavigationBar />
            <div className="container">
                <section className="patients-section">
                    <h2>Treatments</h2>
                    <p>Manage treatments and procedures</p>

                    <SearchBar placeholder="Search Treatments..." onSearch={handleSearch} />

                    <div className="patient-actions">
                        <button className="btn-action">Add New Treatment</button>
                        <button className="btn-action">View All Treatments</button>
                    </div>

                    <div className="patients-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Treatment ID</th>
                                    <th>Description</th>
                                    <th>Diagnosis</th>
                                    <th>Symptoms</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTreatments.map((treatment, index) => (
                                    <tr key={index}>
                                        <td>{treatment.treatmentID}</td>
                                        <td>{treatment.description}</td>
                                        <td>{treatment.diagnosis}</td>
                                        <td>{treatment.symptoms}</td>
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

export default TreatmentsPage;
