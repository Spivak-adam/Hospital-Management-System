import React from 'react';
import RoomTableList from './RoomTable';

function RoomsTable({ rooms, onDelete, onEdit }) {
    console.log('RoomsTable received rooms:', rooms); // Debugging log
    return (
        <table id="rooms">
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
                {rooms.map((room, i) => 
                    <RoomTableList 
                        room={room} 
                        key={i}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />)}
            </tbody>
        </table>
    );
}

export default RoomsTable;
