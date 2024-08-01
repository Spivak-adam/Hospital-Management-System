import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import SearchBar from '../components/SearchBar';
import TreatmentsTable from '../components/TreatmentsTable';

function TreatmentsPage() {
    const [treatments, setTreatments] = useState([]);
    const [filteredTreatments, setFilteredTreatments] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [showForm, setShowForm] = useState(false);

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

    useEffect(() => {
        if (showTable) {
            fetchTreatments();
        }
    }, [showTable]);

    const handleSearch = (searchTerm) => {
        const filtered = treatments.filter(treatment =>
            treatment.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTreatments(filtered);
    };

    const handleSubmitNewTreatment = async (event) => {
        event.preventDefault();
        const form = event.target;
        const newTreatment = {
            treatmentID: form.treatmentID.value,
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

    const renderTableSection = () => (
        <>
            <SearchBar placeholder="Search Treatments..." onSearch={handleSearch} />
            <div className="patients-list">
                <TreatmentsTable treatments={filteredTreatments} />
            </div>
        </>
    );

    const renderFormSection = () => (
        <form onSubmit={handleSubmitNewTreatment}>
            <h3>Add New Treatment</h3>
            <input type="text" name="treatmentID" placeholder="Treatment ID" required />
            <input type="text" name="patientID" placeholder="Patient ID" required />
            <textarea name="description" placeholder="Description" required></textarea>
            <input type="datetime-local" name="date" placeholder="Date" required />
            <textarea name="diagnosis" placeholder="Diagnosis" required></textarea>
            <textarea name="symptoms" placeholder="Symptoms" required></textarea>
            <button type="submit" className="btn-action">Submit</button>
        </form>
    );

    return (
        <>
            <NavigationBar />
            <div className="container">
                <section className="patients-section">
                    <h2>Treatments</h2>
                    <p>View and manage treatments</p>
                    <div className="patient-actions">
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
