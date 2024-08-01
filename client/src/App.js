import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// Pages
import HomePage from './pages/HomePage.js';
import PatientsPage from './pages/PatientsPage.js';
import AppointmentsPage from './pages/AppointmentsPage.js';
import DoctorsPage from './pages/DoctorsPage.js';
import TreatmentsPage from './pages/TreatmentsPage.js';
import RoomsPage from './pages/RoomsPage.js';

function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <main>
          <section>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/PatientsPage" element={<PatientsPage />} />
              <Route path="/AppointmentsPage" element={<AppointmentsPage />} />
              <Route path="/DoctorsPage" element={<DoctorsPage />} />
              <Route path="/TreatmentsPage" element={<TreatmentsPage />} />
              <Route path="/RoomsPage" element={<RoomsPage />} />
            </Routes>
          </section>
        </main>

        <footer>
          <div className="container">
            <div className="footer-content">
              <div className="footer-left">
                <p>Need help? Get help at <a href="mailto:support@medixmanager.com">support@medixmanager.com</a></p>
                <p>&copy; 2024 Hospital Management System</p>
              </div>
              <div className="footer-right">
                <div className="social-icons">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                  <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer"><FaPinterest /></a>
                </div>
                <div className="contact-info">
                  <span>+1-123-456-7890</span>
                  <span>contactus@medixmanager.com</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
