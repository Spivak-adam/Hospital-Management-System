import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import SearchBar from '../components/SearchBar';
import TreatmentsTable from '../components/TreatmentsTable';
import { useNavigate } from "react-router-dom";

function TreatmentsPage() {
    const [treatments, setTreatments] = useState([]);
    const [filteredTreatments, setFilteredTreatments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editTreatment, setEditTreatment] = useState(null);

    const redirect = useNavigate();

    const fetchTreatments = async () => {
        try {
            const response = await fetch('/treatments');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            console.log("Successfully Retrieved data", data)
            let treatData = data.treatment;
            let doctorData = data.doctors
            setTreatments(treatData);
            setFilteredTreatments(treatData);
            setDoctors(doctorData);
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

    // CREATE and Insert to table and database
    const handleSubmitNewTreatment = async (event) => {
        event.preventDefault();
        const form = event.target;
        const newTreatment = {
            patientID: form.patientID.value,
            description: form.description.value,
            date: form.date.value,
            diagnosis: form.diagnosis.value,
            symptoms: form.symptoms.value,
            doctorID: form.doctorID.value
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

    const handleUpdateTreatment = async (id, updatedTreatment) => {
        try {
            const response = await fetch(`/treatments/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTreatment),
            });

            if (response.ok) {
                alert('Treatment updated successfully!');
                fetchTreatments();
                setEditMode(false);
                setEditTreatment(null);
            } else {
                const errorMessage = await response.text();
                alert(`Failed to update treatment: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error updating treatment:', error);
            alert('Error updating treatment. Please try again.');
        }
    };

    const handleDeleteTreatment = async (id) => {
        try {
            const response = await fetch(`/treatments/${id}`, {
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

    const handleEditClick = (treatment) => {
        setEditMode(true);
        setEditTreatment(treatment);
        setShowForm(true);
        setShowTable(false);
    };

    const renderTableSection = () => (
        <>
            <SearchBar placeholder="Search Treatments..." onSearch={handleSearch} />
            <div className="patients-list">
                <TreatmentsTable
                    treatments={filteredTreatments}
                    onUpdateTreatment={handleUpdateTreatment}
                    onDeleteTreatment={handleDeleteTreatment}
                    onEditClick={handleEditClick}
                />
            </div>
        </>
    );

    // Add treatment information form
    const renderFormSection = () => (
        <form class="createDataForm" onSubmit={editMode ? (e) => handleSubmitEdit(e) : handleSubmitNewTreatment}>
            <h3>{editMode ? 'Edit Treatment' : 'Add New Treatment'}</h3>
            <label for="patientID">Patient ID:</label>
            <input type="text" name="patientID" placeholder="Patient ID" defaultValue={editMode ? editTreatment.patientID : ''} required />

            <label for="description">Description:</label>
            <input type="text" name="description" placeholder="Description" defaultValue={editMode ? editTreatment.description : ''} required />

            <label for="date">Date:</label>
            <input type="datetime-local" name="date" placeholder="Date" defaultValue={editMode ? editTreatment.date : ''} required />

            <label for="diagnosis">Diagnosis:</label>
            <input type="text" name="diagnosis" placeholder="Diagnosis" defaultValue={editMode ? editTreatment.diagnosis : ''} required />

            <label for="symptoms">Symptoms:</label>
            <input type="text" name="symptoms" placeholder="Symptoms" defaultValue={editMode ? editTreatment.symptoms : ''} required />

            <label for="doctorID">Doctor ID:</label>
            <select id="doctorID" name="doctorID" placeholder="Doctor ID" required>
                <option value="">Select a doctor</option>
                {doctors.map(doctor => (
                    <option key={doctor.doctorID} value={doctor.doctorID}>
                        {doctor.lastName}
                    </option>
                ))}
            </select>
            <button type="submit" className="btn-action">{editMode ? 'Update' : 'Submit'}</button>
        </form>
    );

    const handleSubmitEdit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const updatedTreatment = {
            patientID: form.patientID.value,
            description: form.description.value,
            date: form.date.value,
            diagnosis: form.diagnosis.value,
            symptoms: form.symptoms.value,
        };

        handleUpdateTreatment(editTreatment.treatmentID, updatedTreatment);
    };

    return (
        <>
            <NavigationBar />
            <div className="container">
                <section className="patients-section">
                    <h2>Treatments</h2>
                    <p>Manage treatments</p>
                    <div className="patients-actions">
                        <button className="btn-action" onClick={() => { setShowTable(true); setShowForm(false); }}>View All Treatments</button>
                        <button className="btn-action" onClick={() => { setShowTable(false); setShowForm(true); setEditMode(false); setEditTreatment(null); }}>Add New Treatment</button>
                    </div>
                    {showTable && renderTableSection()}
                    {showForm && renderFormSection()}
                </section>
            </div>
        </>
    );
}

export default TreatmentsPage;
