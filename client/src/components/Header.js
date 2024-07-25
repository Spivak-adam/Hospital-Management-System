import React from 'react';
import { Link } from 'react-router-dom';

import faceBookLogo from '../images/facebookLogo.png';
import companyLogo from '../images/companyLogo.png';
import twitterLogo from '../images/twitterLogo.png';
import instagramLogo from '../images/instagramLogo.png';
import pinterestLogo from '../images/pinterestLogo.png';

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

export default Header;
