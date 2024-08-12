import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import SearchBar from '../components/SearchBar';
import RoomsTable from '../components/RoomsTable';

function RoomsPage() {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        try {
            const response = await fetch('/rooms');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setRooms(data);
            setFilteredRooms(data);
        } catch (error) {
            console.error('Error fetching room data:', error);
        }
    };



    

    const handleSearch = (searchTerm) => {
        const filtered = rooms.filter(room => {
            // Get the related patient and doctor data
            
            // Combine all the fields into a single string to search within
            const combinedData = `
                ${room.roomID}
                ${room.location}
                ${room.number}
                ${room.occupied}
                ${room.accommodations}
            `.toLowerCase();
    
            // Check if the search term is present in the combined data
            return combinedData.includes(searchTerm.toLowerCase());
        });
    
        setFilteredRooms(filtered);
    };

    

    const handleSubmitNewRoom = async (event) => {
        event.preventDefault();
        const form = event.target;
        const newRoom = {
            location: form.location.value,
            number: form.number.value,
            occupied: form.occupied.value === 'yes',
            accommodations: form.accommodations.value,
        };

        try {
            const response = await fetch('/rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRoom),
            });

            if (response.ok) {
                alert('New room added successfully!');
                form.reset();
                fetchRooms();
                setShowForm(false);
                setShowTable(true);
            } else {
                const errorMessage = await response.text();
                alert(`Failed to add new room: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error adding new room:', error);
            alert('Error adding new room. Please try again.');
        }
    };

    const handleUpdateRoom = async (roomID, updatedRoom) => {
        const confirmUpdate = window.confirm("Are you sure you want to update this room?");
        if (!confirmUpdate) return;

        try {
            const response = await fetch(`/rooms/${roomID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedRoom),
            });

            if (response.ok) {
                alert('Room updated successfully!');
                fetchRooms();
            } else {
                const errorMessage = await response.text();
                alert(`Failed to update room: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error updating room:', error);
            alert('Error updating room. Please try again.');
        }
    };

    const handleDeleteRoom = async (roomID) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this room?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`/rooms/${roomID}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Room deleted successfully!');
                fetchRooms();
            } else {
                const errorMessage = await response.text();
                alert(`Failed to delete room: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error deleting room:', error);
            alert('Error deleting room. Please try again.');
        }
    };

    const renderTableSection = () => (
        <>
            <SearchBar placeholder="Search Rooms..." onSearch={handleSearch} />
            <div className="patients-list">
                <RoomsTable
                    rooms={filteredRooms}
                    onUpdateRoom={handleUpdateRoom}
                    onDeleteRoom={handleDeleteRoom}
                />
            </div>
        </>
    );

    const renderFormSection = () => (
        <form className="createDataForm" onSubmit={handleSubmitNewRoom}>
            <h3>Add New Room</h3>
            <select name="location" required>
                <option value="">Select Location</option>
                <option value="ICU">ICU</option>
                <option value="Recovery">Recovery</option>
                <option value="General">General</option>
            </select>
            <input type="text" name="number" placeholder="Room Number" required />
            <select name="occupied" required>
                <option value="">Occupied?(Yes/No)</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
            <input type="text" name="accommodations" placeholder="Accommodations" required />
            <button type="submit" className="btn-action">Submit</button>
        </form>
    );

    return (
        <>
            <NavigationBar />
            <div className="container">
                <section className="patients-section">
                    <h2>Rooms</h2>
                    <p>Assign and manage room allocations</p>
                    <div className="patients-actions">
                        <button className="btn-action" onClick={() => { setShowTable(true); setShowForm(false); setFilteredRooms(rooms); }}>View All Rooms</button>
                        <button className="btn-action" onClick={() => { setShowTable(false); setShowForm(true); }}>Add New Room</button>
                    </div>
                    {showTable && renderTableSection()}
                    {showForm && renderFormSection()}
                </section>
            </div>
        </>
    );
}

export default RoomsPage;

