import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
          <p>Need help? Contact us at <a href="mailto:support@medixmanager.com">support@medixmanager.com</a></p>
          <p>&copy; 2024 Hospital Management System</p>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;

