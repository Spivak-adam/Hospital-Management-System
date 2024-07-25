import React from 'react';
import { Link } from 'react-router-dom';

import { FaFacebook } from "react-icons/fa";
import companyLogo from '../images/companyLogo.png';
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";

function Header() {
    return (
        <div class="top-bar">
            <div class="container">
                <div class="logo-name">
                    <Link to="/"><img src={companyLogo} alt="Company Logo" class="logo"/> </Link>
                    <h1>MedixManager</h1>
                </div>
                <div class="contact-info">
                    <div class="social-icons">
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

export default Header;
