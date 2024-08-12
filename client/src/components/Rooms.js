import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function Rooms({ room, onUpdateRoom, onDeleteRoom, patients, doctors }) {
    const [editing, setEditing] = useState(false);
    const [updatedRoom, setUpdatedRoom] = useState(room);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        onUpdateRoom(room.roomID, updatedRoom);
        setEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedRoom({ ...updatedRoom, [name]: value });
    };
        
    return (
        <tr>
            <td>{room.roomID}</td>
            {editing ? (
                <>
                    <td>
                        <select name="location" value={updatedRoom.location} onChange={handleChange}>
                            <option value="ICU">ICU</option>
                            <option value="Recovery">Recovery</option>
                            <option value="General">General</option>
                        </select>
                    </td>
                    <td>
                        <input type="text" name="number" value={updatedRoom.number} onChange={handleChange} />
                    </td>
                    <td>
                      <select name="occupied" value={updatedRoom.occupied} onChange={handleChange}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    </td>
                    <td>
                        <input
                            type="text"
                            name="accommodations"
                            value={updatedRoom.accommodations}
                            onChange={handleChange}
                        />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                        <button className="btn-action" onClick={handleSave}>Save</button>
                    </td>
                </>
            ) : (
                <>
                    <td>{room.location}</td>
                    <td>{room.number}</td>
                    <td>{room.occupied}</td>
                    <td>{room.accommodations}</td>
                    <td style={{ textAlign: 'center' }}>
                        <button className="btn-action" onClick={handleEdit}><FaEdit /></button>
                        <button className="btn-action" onClick={() => onDeleteRoom(room.roomID)}><FaTrashAlt /></button>
                    </td>
                </>
            )}
        </tr>
    );
}

export default Rooms;
