import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import companyLogo from '../images/companyLogo.png';

function NavigationBar() {
    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    return (
        <div className={`top-bar ${menuActive ? 'active' : ''}`}>
            <div className="container">
                <div className="logo-name">
                    <Link to="/"><img src={companyLogo} alt="Company Logo" className="logo" /> </Link>
                    <h1>MedixManager</h1>
                </div>
                <div className={`nav-links ${menuActive ? 'active' : ''}`}>
                    <Link to="/PatientsPage">Patients</Link>
                    <Link to="/DoctorsPage">Doctors</Link>
                    <Link to="/AppointmentsPage">Appointments</Link>
                    <Link to="/TreatmentsPage">Treatments</Link>
                    <Link to="/RoomsPage">Rooms</Link>
                </div>
                <button className="hamburger-menu" onClick={toggleMenu} aria-label="Open navigation menu">
                    <FaBars />
                </button>
            </div>
        </div>
    );
}

export default NavigationBar;
