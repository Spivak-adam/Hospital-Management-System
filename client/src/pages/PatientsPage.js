import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import SearchBar from '../components/SearchBar';

function PatientsPage() {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const fetchPatients = async () => {
        try {
            const response = await fetch('/patients');
            const data = await response.json();
            setPatients(data);
            setFilteredPatients(data);
            setShowTable(true); // Show the table after fetching data
            setShowForm(false); // Hide form if it was shown
        } catch (error) {
            console.error('Error fetching patient data:', error);
        }
    };

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
            age: form.age.value,
            gender: form.gender.value,
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
            } else {
                alert('Failed to add new patient.');
            }
        } catch (error) {
            console.error('Error adding new patient:', error);
        }
    };

    return (
        <>
            <NavigationBar />
            <div className="container">
                <section className="patients-section">
                    <h2>Patients</h2>
                    <p>View and manage patient records</p>

                    <div className="patient-actions">
                        <button className="btn-action" onClick={fetchPatients}>View All Patients</button>
                        <button className="btn-action" onClick={() => { setShowTable(false); setShowForm(true); }}>Add New Patient</button>
                    </div>

                    {showTable && (
                        <>
                            <SearchBar placeholder="Search Patients..." onSearch={handleSearch} />

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
                        </>
                    )}

                    {showForm && (
                        <form onSubmit={handleSubmitNewPatient}>
                            <h3>Add New Patient</h3>
                            <input type="text" name="patientID" placeholder="Patient ID" required />
                            <input type="text" name="firstName" placeholder="First Name" required />
                            <input type="text" name="lastName" placeholder="Last Name" required />
                            <input type="number" name="age" placeholder="Age" required />
                            <input type="text" name="gender" placeholder="Gender" required />
                            <button type="submit" className="btn-action">Submit</button>
                        </form>
                    )}
                </section>
            </div>
        </>
    );
}

export default PatientsPage;
