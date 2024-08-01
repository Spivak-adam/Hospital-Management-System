import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

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
                <button><MdEdit /></button>
                <button><MdDeleteForever /></button>
            </td>
        </tr>
    );
}

export default Rooms;
