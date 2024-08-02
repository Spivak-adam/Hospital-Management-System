import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function Rooms({ rooms }) {
    return (
        <tr>
            <td>{rooms.roomID}</td>
            <td>{rooms.patientID}</td>
            <td>{rooms.doctorID}</td>
            <td>{rooms.location}</td>
            <td>{rooms.number}</td>
            <td>{rooms.occupied}</td>
            <td>{rooms.accommodations}</td>
            <td>{rooms.lengthOfStay}</td>
            <td style={{ textAlign: 'center' }}>
                <button className="btn-action"><FaEdit /></button>
                <button className="btn-action"><FaTrashAlt /></button>
            </td>
        </tr>
    );
}

export default Rooms;
