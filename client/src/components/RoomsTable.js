import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function RoomTableList({ room, onDelete, onEdit }) {
    return (
        <tr>
            <td>{room.roomID}</td>
            <td>{room.patientID}</td>
            <td>{room.doctorID}</td>
            <td>{room.location}</td>
            <td>{room.number}</td>
            <td>{room.occupied}</td>
            <td>{room.accommodations}</td>
            <td>{room.lengthOfStay}</td>
            <td>
                <MdEdit onClick={() => onEdit(room)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                <MdDeleteForever onClick={() => onDelete(room.roomID)} style={{ cursor: 'pointer' }} />
            </td>
        </tr>
    );
}

export default RoomTableList;
