import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

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
                            <td style={{ textAlign: 'center' }}>
                                <button className="btn-action"><FaEdit /></button>
                                <button className="btn-action"><FaTrashAlt /></button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="8" style={{ textAlign: 'center' }}>No rooms available</td>
                        <td style={{ textAlign: 'center' }}>
                            <button className="btn-action"><FaEdit /></button>
                            <button className="btn-action"><FaTrashAlt /></button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function Rooms({ rooms }) {
    return (
        <tr>
            <td>{rooms.roomID}</td>
            <td>{rooms.patientID}</td>
            <td>{rooms.doctorID}</td>
            <td>{rooms.location}</td>
            <td>{rooms.number}</td>
            <td>{rooms.occupied}</td>
            <td>{rooms.accommodations}</td>
            <td>{rooms.lengthOfStay}</td>

            <td>
                <a href="#" className="btn-action"><MdEdit />Edit</a>
                <a href="#" className="btn-action"><MdDeleteForever />Delete</a>
            </td>
        </tr>
    );
}

export default RoomsTable;
