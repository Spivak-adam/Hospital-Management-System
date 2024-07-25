import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function HomePage() {
    return (
        <>
            <Header />
            <div className="header-content">
                <div className="container">
                    <h1>MedixManager</h1>
                    <p>Your Partner In Health and Wellness</p>
                </div>
            </div>
            <div className="container">
                <section className="services">
                    <h2>Our Healthcare Service</h2>
                    <p>Please select an option provided down below.</p>
                    <div className="services-grid">
                        <div className="service-box">
                            <Link to="/PatientsPage">
                                <h3>Patients</h3>
                                <p>View and manage patient records</p>
                            </Link>
                        </div>
                        <div className="service-box">
                            <Link to="/DoctorsPage">
                                <h3>Doctors</h3>
                                <p>View and manage doctor information</p>
                            </Link>
                        </div>
                        <div className="service-box">
                            <Link to="/AppointmentsPage">
                                <h3>Appointments</h3>
                                <p>Schedule and view appointments</p>
                            </Link>
                        </div>
                        <div className="service-box">
                            <Link to="/TreatmentsPage">
                                <h3>Treatments</h3>
                                <p>Manage treatments and procedures</p>
                            </Link>
                        </div>
                        <div className="service-box">
                            <Link to="/RoomsPage">
                                <h3>Rooms</h3>
                                <p>Assign and manage room allocations</p>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default HomePage;

