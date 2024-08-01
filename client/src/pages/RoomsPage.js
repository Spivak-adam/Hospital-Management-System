import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import SearchBar from '../components/SearchBar';
import RoomsTable from '../components/RoomsTable';

function RoomsPage() {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);

    useEffect(() => {
        // Fetch rooms data from the server
        const fetchRooms = async () => {
            try {
                const response = await fetch('/rooms');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRooms(data);
                setFilteredRooms(data);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchRooms();
    }, []);

    const handleSearch = (searchTerm) => {
        const filtered = rooms.filter(room =>
            room.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredRooms(filtered);
    };

    return (
        <>
            <NavigationBar />
            <div className="container">
                <section className="patients-section">
                    <h2>Rooms</h2>
                    <p>Assign and manage room allocations</p>

                    <SearchBar placeholder="Search Rooms..." onSearch={handleSearch} />

                    <div className="patient-actions">
                        <button className="btn-action">Add New Room</button>
                        <button className="btn-action">Edit Rooms</button>
                        <button className="btn-action">Delete Rooms</button>
                    </div>

                    <div className="patients-list">
                        <RoomsTable rooms={filteredRooms} />
                    </div>
                </section>
            </div>
        </>
    );
}

export default RoomsPage;
