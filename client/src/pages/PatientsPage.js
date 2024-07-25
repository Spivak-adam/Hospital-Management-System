import React from 'react';
import NavigationBar from '../components/NavigationBar';

function PatientsPage() {
    return (
        <>
            <NavigationBar />
            <div className="container">
                <section className="patients-section">
                    <h2>Patients</h2>
                    <p>View and manage patient records</p>

                    <div className="patient-actions">
                        <a href="#" className="btn-action">Add New Patient</a>
                        <a href="#" className="btn-action">View All Patients</a>
                    </div>

                    <div className="patients-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Patient ID</th>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Gender</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>John Doe</td>
                                    <td>30</td>
                                    <td>Male</td>
                                    <td>
                                        <a href="#" className="btn-action">Edit</a>
                                        <a href="#" className="btn-action">Delete</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </>
    );
}

export default PatientsPage;

