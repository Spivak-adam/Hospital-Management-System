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
            const response = await fetch('/create-treatments', {
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
                redirect("/TreatmentsPage")
            } else {
                const errorMessage = await response.text();
                alert(`Failed to add new treatment: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error adding new treatment:', error);
            alert('Error adding new treatment. Please try again.');
        }
    };

    // Search Patient information
    const renderTableSection = () => (
        <>
            <SearchBar placeholder="Search Treatments..." onSearch={handleSearch} />
            <div className="patients-list">
                <TreatmentsTable treatments={filteredTreatments} />
            </div>
        </>
    );

    // Add treatment information form
    const renderFormSection = () => (
        <form class="createDataForm" onSubmit={handleSubmitNewTreatment}>
            <h3>Add New Treatment</h3>
            <label for="patientID">Patient ID:</label>
            <input type="text" id="patientID" name="patientID" placeholder="Patient ID" required />

            <label for="description">Description:</label>
            <textarea id="description" name="description" placeholder="Description" required></textarea>

            <label for="date">Date:</label>
            <input type="datetime-local" id="date" name="date" placeholder="Date" required />

            <label for="diagnosis">Diagnosis:</label>
            <textarea id="diagnosis" name="diagnosis" placeholder="Diagnosis" required></textarea>

            <label for="symptoms">Symptoms:</label>
            <textarea id="symptoms" name="symptoms" placeholder="Symptoms" required></textarea>

            <label for="doctorID">Doctor ID:</label>
            <select id="doctorID" name="doctorID" placeholder="Doctor ID" required>
                <option value="">Select a doctor</option>
                {doctors.map(doctor =>(
                    <option key={doctor.doctorID} value={doctor.doctorID}>
                        {doctor.lastName}
                    </option>
                ))}
            </select>

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
