import NavigationBar from '../components/NavigationBar';
import Patients from '../components/Patients';
import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function PatientsPage() {
    // Use state to bring in data
    const [patientData, setPatientData] = useState([]);

    // Retrieve Data
    const loadPatientData = async () => {
        const response = await fetch('/patients');
        const patientData = await response.json();
        setPatientData(patientData);
    }

    // LOAD all the room data when page is started
    useEffect(() => {
        loadPatientData();
    }, []);

    return (
        <>
            <NavigationBar />
            <div className="container">
                <section className="patients-section">
                    <h2>Patients</h2>
                    <p>View and manage patient records</p>
                    <div className="patient-actions">
                        <a href="#" className="btn-action">View All Patients</a>
                        <a href="#" className="btn-action">Add New Patient</a>
                        <a href="#" className="btn-action">Edit Patients</a>
                        <a href="#" className="btn-action"> Delete Patients</a>
                    </div>

                    <div className="patients-list">
                        <Patients
                            patients={patientData}/>

                    </div>
                </section>
            </div>
        </>
    );
}

export default PatientsPage;

