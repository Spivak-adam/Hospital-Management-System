import React from 'react';

// Change the icons, function names, and parameters 
// to fit your portfolio topic and schema.

import { MdDeleteForever, MdEdit } from 'react-icons/md';


function Rooms({ rooms }) {
    console.log(rooms);
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

            {/* Update these icons to something that matches your style. */}
        </tr>
    );
}

export default Rooms;