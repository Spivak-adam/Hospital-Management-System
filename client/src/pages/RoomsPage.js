import NavigationBar from '../components/NavigationBar';
import Rooms from '../components/Rooms';
import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function RoomsPage({ }) {
    // useNavigate to Redirect

    // Use state to bring in data
    const [roomData, setRoomData] = useState([]);

    // Retrieve Data
    const loadRoomData = async () => {
        const response = await fetch('/rooms');
        const roomData = await response.json();
        setRoomData(roomData);
    }

    // LOAD all the room data when page is started
    useEffect(() => {
        loadRoomData();
    }, []);

    return (
        <>
            <NavigationBar />
            <div className="container">
                <section className="patients-section">
                    <h2>Rooms</h2>
                    <p>Assign and manage room allocations</p>
                    <div className="patient-actions">
                        <a href="#" className="btn-action">Add New Room</a>
                        <a href="#" className="btn-action">View All Rooms</a>
                    </div>
                    <div className="patients-list">
                        <Rooms
                            rooms={roomData}/>
                    </div>
                </section>
            </div>
        </>
    );
}

export default RoomsPage;
