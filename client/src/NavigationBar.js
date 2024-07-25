import React from 'react';
import { Link } from 'react-router-dom';

import faceBookLogo from '../images/facebookLogo.png';
import companyLogo from '../images/companyLogo.png';
import twitterLogo from '../images/twitterLogo.png';
import instagramLogo from '../images/instagramLogo.png';
import pinterestLogo from '../images/pinterestLogo.png';

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
                        <a href="#"><img src={faceBookLogo} alt="Facebook Logo"/></a>
                        <a href="#"><img src={twitterLogo} alt="Twitter Logo"/></a>
                        <a href="#"><img src={instagramLogo} alt="Instagram Logo"/></a>
                        <a href="#"><img src={pinterestLogo} alt="Pinterest Logo"/></a>
                    </div>
                    <span>+1-123-456-7890</span>
                    <span>contactus@medixmanager.com</span>
                </div>
            </div>
        </div>
    );
};

export default NavigationBar;
