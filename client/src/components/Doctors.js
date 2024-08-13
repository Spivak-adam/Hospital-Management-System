import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function Doctors({ doctor, onUpdateDoctor, onDeleteDoctor }) {
    const [editing, setEditing] = useState(false);
    const [updatedDoctor, setUpdatedDoctor] = useState(doctor);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        onUpdateDoctor(doctor.doctorID, updatedDoctor);
        setEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedDoctor({ ...updatedDoctor, [name]: value });
    };

    return (
        <tr>
            <td>{doctor.doctorID}</td>
            {editing ? (
                <>
                    <td>
                        <input
                            type="text"
                            name="firstName"
                            value={updatedDoctor.firstName}
                            onChange={handleChange}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            name="lastName"
                            value={updatedDoctor.lastName}
                            onChange={handleChange}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            name="specialization"
                            value={updatedDoctor.specialization}
                            onChange={handleChange}
                        />
                    </td>
                    <td>
                        <input
                            type="email"
                            name="email"
                            value={updatedDoctor.email}
                            onChange={handleChange}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={updatedDoctor.phoneNumber}
                            onChange={handleChange}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            name="language"
                            value={updatedDoctor.language}
                            onChange={handleChange}
                        />
                    </td>
                    <td>
                    <select name="gender" value={updatedDoctor.gender} onChange={handleChange}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                        <button className="btn-action" onClick={handleSave}>Save</button>
                    </td>
                </>
            ) : (
                <>
                    <td>{doctor.firstName}</td>
                    <td>{doctor.lastName}</td>
                    <td>{doctor.specialization}</td>
                    <td>{doctor.email}</td>
                    <td>{doctor.phoneNumber}</td>
                    <td>{doctor.language}</td>
                    <td>{doctor.gender}</td>
                    <td style={{ textAlign: 'center' }}>
                        <button className="btn-action" onClick={handleEdit}><FaEdit /></button>
                        <button className="btn-action" onClick={() => onDeleteDoctor(doctor.doctorID)}><FaTrashAlt /></button>
                    </td>
                </>
            )}
        </tr>
    );
}

export default Doctors;

