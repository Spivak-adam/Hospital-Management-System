import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function Rooms({ room }) {
    return (
        <tr>
            <td>{room.roomID}</td>
            <td>{room.patientID}</td>
            <td>{room.doctorID}</td>
            <td>{room.location}</td>
            <td>{room.number}</td>
            <td>{room.occupied.toString()}</td>
            <td>{room.accommodations}</td>
            <td>{room.lengthOfStay}</td>
            <td>
                <button className="btn-action"><FaEdit /></button>
                <button className="btn-action"><FaTrashAlt /></button>
            </td>
        </tr>
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

export default Rooms;
