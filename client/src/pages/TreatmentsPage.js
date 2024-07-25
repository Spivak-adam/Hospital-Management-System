import React from 'react';
import NavigationBar from '../components/NavigationBar';

function TreatmentsPage() {
    return (
        <>
            <NavigationBar />
            <div className="container">
                <section className="patients-section">
                    <h2>Treatments</h2>
                    <p>Manage treatments and procedures</p>
                    <div className="patient-actions">
                        <a href="#" className="btn-action">Add New Treatment</a>
                        <a href="#" className="btn-action">View All Treatments</a>
                    </div>
                    <div className="patients-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Treatment ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Chemotherapy</td>
                                    <td>Cancer treatment using chemical substances</td>
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

export default TreatmentsPage;

export default TreatmentsPage;
