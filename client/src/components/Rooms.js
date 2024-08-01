import React from 'react';
import RoomTableList from './RoomsTable';

// Creates Rooms Table and populates it based on component

function RoomsTable({ rooms }) {
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
                    <th>length of Stay</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {rooms.map((room, i) => 
                    <RoomTableList 
                        rooms={room} 
                        key={i}
                    />)}
            </tbody>
        </table>
    );
}

export default RoomsTable;
