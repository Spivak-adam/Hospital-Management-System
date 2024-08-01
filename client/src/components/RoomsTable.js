import React from 'react';

function RoomsTable({ rooms }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Room ID</th>
                    <th>Patient ID</th>
                    <th>Doctor ID</th>
                    <th>Location</th>
                    <th>Number</th>
                    <th>Occupied</th>
                    <th>Accommodations</th>
                    <th>Length of Stay</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {rooms.length > 0 ? (
                    rooms.map((room, index) => (
                        <tr key={index}>
                            <td>{room.roomID}</td>
                            <td>{room.patientID}</td>
                            <td>{room.doctorID}</td>
                            <td>{room.location}</td>
                            <td>{room.number}</td>
                            <td>{room.occupied ? 'Yes' : 'No'}</td>
                            <td>{room.accommodations}</td>
                            <td>{room.lengthOfStay}</td>
                            <td>
                                {/* Add appropriate action buttons or links here */}
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="9" style={{ textAlign: 'center' }}>No rooms available</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default RoomsTable;
