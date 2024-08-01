import React from 'react';
import Doctors from './Doctors';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function DoctorsTable({ doctors }) {
  return (
    <div className="patients-list">
      <table>
        <thead>
          <tr>
            <th>Doctor ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Specialization</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Language</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.length > 0 ? (
            doctors.map((doctor) => <Doctors key={doctor.doctorID} doctor={doctor} />)
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>No doctors available</td>
              <td style={{ textAlign: 'center' }}>
                <button className="btn-action"><FaEdit /></button>
                <button className="btn-action"><FaTrashAlt /></button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DoctorsTable;

