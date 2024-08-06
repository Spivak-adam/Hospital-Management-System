import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import SearchBar from '../components/SearchBar';
import TreatmentsTable from '../components/TreatmentsTable';

function TreatmentsPage() {
    const [treatments, setTreatments] = useState([]);
    const [filteredTreatments, setFilteredTreatments] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetchTreatments();
        fetchPatients();
        fetchDoctors();
    }, []);

    const fetchTreatments = async () => {
        try {
            const response = await fetch('/treatments');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setTreatments(data);
            setFilteredTreatments(data);
        } catch (error) {
            console.error('Error fetching treatment data:', error);
        }
    };

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

    const handleSearch = (searchTerm) => {
        const filtered = treatments.filter(treatment =>
            Object.values(treatment).some(value =>
                (value !== null && value !== undefined ? value.toString() : "").toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setFilteredTreatments(filtered);
    };

    const handleSubmitNewTreatment = async (event) => {
        event.preventDefault();
        const form = event.target;
        const newTreatment = {
            patientID: form.patientID.value,
            description: form.description.value,
            date: form.date.value,
            diagnosis: form.diagnosis.value,
            symptoms: form.symptoms.value,
        };

        try {
            const response = await fetch('/treatments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTreatment),
            });

            if (response.ok) {
                alert('New treatment added successfully!');
                form.reset();
                fetchTreatments();
                setShowForm(false);
                setShowTable(true);
            } else {
                const errorMessage = await response.text();
                alert(`Failed to add new treatment: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error adding new treatment:', error);
            alert('Error adding new treatment. Please try again.');
        }
    };

    const handleUpdateTreatment = async (treatmentID, updatedTreatment) => {
        try {
            const response = await fetch(`/treatments/${treatmentID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTreatment),
            });

            if (response.ok) {
                alert('Treatment updated successfully!');
                fetchTreatments();
            } else {
                const errorMessage = await response.text();
                alert(`Failed to update treatment: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error updating treatment:', error);
            alert('Error updating treatment. Please try again.');
        }
    };

    const handleDeleteTreatment = async (treatmentID) => {
        try {
            const response = await fetch(`/treatments/${treatmentID}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Treatment deleted successfully!');
                fetchTreatments();
            } else {
                const errorMessage = await response.text();
                alert(`Failed to delete treatment: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error deleting treatment:', error);
            alert('Error deleting treatment. Please try again.');
        }
    };

    const renderTableSection = () => (
        <>
            <SearchBar placeholder="Search Treatments..." onSearch={handleSearch} />
            <div className="patients-list">
                <TreatmentsTable
                    treatments={filteredTreatments}
                    onUpdateTreatment={handleUpdateTreatment}
                    onDeleteTreatment={handleDeleteTreatment}
                    patients={patients}
                    doctors={doctors}
                />
            </div>
        </>
    );

    const renderFormSection = () => (
        <form className="createDataForm" onSubmit={handleSubmitNewTreatment}>
            <h3>Add New Treatment</h3>
            <select name="patientID" required>
                <option value="">Select Patient</option>
                {patients.map(patient => (
                    <option key={patient.patientID} value={patient.patientID}>
                        {patient.patientID} - {patient.firstName} {patient.lastName}
                    </option>
                ))}
            </select>
            <input type="text" name="description" placeholder="Description of Treatment" required />
            <p>Date of Treatment:</p>
            <input type="datetime-local" name="date" placeholder="Date" required />
            <input type="text" name="diagnosis" placeholder="Diagnosis" required />
            <input type="text" name="symptoms" placeholder="Symptoms" required />
            <button type="submit" className="btn-action">Submit</button>
        </form>
    );

    return (
        <>
            <NavigationBar />
            <div className="container">
                <section className="patients-section">
                    <h2>Treatments</h2>
                    <p>Manage treatments in the system</p>
                    <div className="patients-actions">
                        <button className="btn-action" onClick={() => { setShowTable(true); setShowForm(false); }}>View All Treatments</button>
                        <button className="btn-action" onClick={() => { setShowTable(false); setShowForm(true); }}>Add New Treatment</button>
                    </div>
                    {showTable && renderTableSection()}
                    {showForm && renderFormSection()}
                </section>
            </div>
        </>
    );
}

export default TreatmentsPage;
