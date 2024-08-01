import React from 'react';
import Rooms from './Rooms';

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
                {rooms.map((room, index) => (
                    <Rooms key={index} room={room} />
                ))}
            </tbody>
        </table>
    );
}

export default RoomsTable;
