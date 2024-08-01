import React from 'react';

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
                <button className="btn-action">Edit</button>
                <button className="btn-action">Delete</button>
            </td>
        </tr>
    );
}

export default Doctors;
