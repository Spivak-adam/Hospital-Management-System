import React from 'react';
import NavigationBar from '../components/NavigationBar';

function DoctorsPage() {
    return (
        <>
            <NavigationBar />
            <div className="container">
                <section className="patients-section">
                    <h2>Doctors</h2>
                    <p>View and manage doctor information</p>
                    <div className="patient-actions">
                        <a href="#" className="btn-action">Add New Doctor</a>
                        <a href="#" className="btn-action">View All Doctors</a>
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
                                <tr>
                                    <td>1</td>
                                    <td>Jane</td>
                                    <td>Smith</td>
                                    <td>Cardiology</td>
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

export default DoctorsPage;
