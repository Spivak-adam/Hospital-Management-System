import React from 'react';
import { Link } from 'react-router-dom';
import companyLogo from '../images/companyLogo.png';

function Header() {
    return (
        <div className="top-bar">
            <div className="container">
                <div className="logo-name">
                    <Link to="/"><img src={companyLogo} alt="Company Logo" className="logo"/> </Link>
                    <h1>MedixManager</h1>
                </div>
            </div>
        </div>
    );
};

export default Header;
