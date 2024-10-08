import React from 'react';
import Rooms from './Rooms';

function RoomsTable({ rooms, onUpdateRoom, onDeleteRoom, }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Room ID</th>
                    <th>Location</th>
                    <th>Number</th>
                    <th>Occupied</th>
                    <th>Accommodations</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {rooms.length > 0 ? (
                    rooms.map((room, index) => (
                        <Rooms
                            room={room}
                            key={index}
                            onUpdateRoom={onUpdateRoom}
                            onDeleteRoom={onDeleteRoom}
                        />
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
