import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function Rooms({ room }) {
    return (
        <tr>
            <td>{room.roomID}</td>
            <td>{room.patientID}</td>
            <td>{room.doctorID}</td>
            <td>{room.location}</td>
            <td>{room.number}</td>
            <td>{room.occupied.toString()}</td>
            <td>{room.accommodations}</td>
            <td>{room.lengthOfStay}</td>
            <td>
                <button className="btn-action"><FaEdit /></button>
                <button className="btn-action"><FaTrashAlt /></button>
            </td>
        </tr>
    );
}

export default Rooms;
