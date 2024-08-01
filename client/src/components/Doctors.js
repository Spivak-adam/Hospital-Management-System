import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function Doctors({ doctor }) {
  return (
    <tr>
      <td>{doctor.doctorID}</td>
      <td>{doctor.firstName}</td>
      <td>{doctor.lastName}</td>
      <td>{doctor.specialization}</td>
      <td>{doctor.email}</td>
      <td>{doctor.phoneNumber}</td>
      <td>{doctor.language}</td>
      <td>{doctor.gender}</td>
      <td>
        <button className="btn-action"><FaEdit /></button>
        <button className="btn-action"><FaTrashAlt /></button>
      </td>
    </tr>
  );
}

export default Doctors;
