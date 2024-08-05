import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function Rooms({ rooms, onUpdateRoom, onDeleteRoom }) {
    const [editing, setEditing] = useState(false);
    const [updatedRoom, setUpdatedRoom] = useState(rooms);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        onUpdateRoom(rooms.roomID, updatedRoom);
        setEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedRoom({ ...updatedRoom, [name]: value });
    };

    return (
        <tr>
            {editing ? (
                <>
                    <td><input type="text" name="patientID" value={updatedRoom.patientID} onChange={handleChange} /></td>
                    <td><input type="text" name="doctorID" value={updatedRoom.doctorID} onChange={handleChange} /></td>
                    <td><input type="text" name="location" value={updatedRoom.location} onChange={handleChange} /></td>
                    <td><input type="text" name="number" value={updatedRoom.number} onChange={handleChange} /></td>
                    <td><input type="text" name="occupied" value={updatedRoom.occupied} onChange={handleChange} /></td>
                    <td><input type="text" name="accommodations" value={updatedRoom.accommodations} onChange={handleChange} /></td>
                    <td><input type="text" name="lengthOfStay" value={updatedRoom.lengthOfStay} onChange={handleChange} /></td>
                    <td style={{ textAlign: 'center' }}>
                        <button className="btn-action" onClick={handleSave}>Save</button>
                    </td>
                </>
            ) : (
                <>
                    <td>{rooms.roomID}</td>
                    <td>{rooms.patientID}</td>
                    <td>{rooms.doctorID}</td>
                    <td>{rooms.location}</td>
                    <td>{rooms.number}</td>
                    <td>{rooms.occupied}</td>
                    <td>{rooms.accommodations}</td>
                    <td>{rooms.lengthOfStay}</td>
                    <td style={{ textAlign: 'center' }}>
                        <button className="btn-action" onClick={handleEdit}><FaEdit /></button>
                        <button className="btn-action" onClick={() => onDeleteRoom(rooms.roomID)}><FaTrashAlt /></button>
                    </td>
                </>
            )}

        </tr>
    );
}

export default Rooms;
