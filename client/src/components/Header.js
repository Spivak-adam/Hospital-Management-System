import React from 'react';
import { Link } from 'react-router-dom';

import { FaFacebook, FaInstagram, FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import companyLogo from '../images/companyLogo.png';


function Header() {
    return (
        <div class="top-bar">
            <div class="container">
                <div class="logo-name">
                    <Link to="/"><img src={companyLogo} alt="Company Logo" class="logo"/> </Link>
                    <h1>MedixManager</h1>
                </div>
                <div class="contact-info">
                <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                        <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer"><FaPinterest /></a>
                    </div>
                    <span>+1-123-456-7890</span>
                    <span>contactus@medixmanager.com</span>
                </div>
            </div>
        </div>
    );
};

export default Header;
