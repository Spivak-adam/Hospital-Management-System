import React from 'react';
import { Link } from 'react-router-dom';

import { FaFacebook } from "react-icons/fa";
import companyLogo from '../images/companyLogo.png';
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";

function NavigationBar() {
    return (
        <div className="top-bar">
            <div className="container">
                <div className="logo-name">
                    <Link to="/"><img src={companyLogo} alt="Company Logo" className="logo"/> </Link>
                    <h1>MedixManager</h1>
                </div>
                <div className="nav-links">
                    <Link to="/PatientsPage">Patients</Link>
                    <Link to="/DoctorsPage">Doctors</Link>
                    <Link to="/AppointmentsPage">Appointments</Link>
                    <Link to="/TreatmentsPage">Treatments</Link>
                    <Link to="/RoomsPage">Rooms</Link>
                </div>
                <div className="contact-info">
                    <div className="social-icons">
                        <a href="#"><FaFacebook /></a>
                        <a href="#"><FaXTwitter /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaPinterest /></a>
                    </div>
                    <span>+1-123-456-7890</span>
                    <span>contactus@medixmanager.com</span>
                </div>
            </div>
        </div>
    );
};

export default NavigationBar;
