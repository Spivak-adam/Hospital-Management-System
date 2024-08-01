import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

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

            <td>
                <a href="#" className="btn-action"><MdEdit />Edit</a>
                <a href="#" className="btn-action"><MdDeleteForever />Delete</a>
            </td>
        </tr>
    );
}

export default Rooms;