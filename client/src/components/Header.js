import React from 'react';
import { Link } from 'react-router-dom';
import companyLogo from '../images/companyLogo.png';


function Header() {
    return (
        <div class="top-bar">
            <div class="container">
                <div class="logo-name">
                    <Link to="/"><img src={companyLogo} alt="Company Logo" class="logo"/> </Link>
                    <h1>MedixManager</h1>
                </div>
            </div>
        </div>
    );
};

export default Header;
