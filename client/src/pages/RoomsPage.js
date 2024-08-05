import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import SearchBar from '../components/SearchBar';
import RoomsTable from '../components/RoomsTable';

function RoomsPage() {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [showForm, setShowForm] = useState(false);

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

    useEffect(() => {
        if (showTable) {
            fetchRooms();
        }
    }, [showTable]);



    
    const handleSearch = (searchTerm) => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        const filtered = rooms.filter(room => {
            return (
                room.patientID.toString().includes(lowercasedSearchTerm) ||
                room.doctorID.toString().includes(lowercasedSearchTerm) ||
                room.location.toLowerCase().includes(lowercasedSearchTerm) ||
                room.number.toLowerCase().includes(lowercasedSearchTerm) ||
                room.occupied.toLowerCase().includes(lowercasedSearchTerm) ||
                room.accommodations.toLowerCase().includes(lowercasedSearchTerm) ||
                room.lengthOfStay.toString().includes(lowercasedSearchTerm)
            );
        });
        setFilteredRooms(filtered);
    };



    const handleSubmitNewRoom = async (event) => {
        event.preventDefault();
        const form = event.target;
        const newRoom = {
            patientID: form.patientID.value,
            doctorID: form.doctorID.value,
            location: form.location.value,
            number: form.number.value,
            occupied: form.occupied.value === 'true' ? 'Yes' : 'No',
            accommodations: form.accommodations.value,
            lengthOfStay: form.lengthOfStay.value,
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
                <RoomsTable rooms={filteredRooms} onUpdateRoom={handleUpdateRoom} onDeleteRoom={handleDeleteRoom} />
            </div>
        </>
    );

    const renderFormSection = () => (
        <form onSubmit={handleSubmitNewRoom}>
            <h3>Add New Room</h3>
            <input type="text" name="patientID" placeholder="Patient ID" required />
            <input type="text" name="doctorID" placeholder="Doctor ID" required />
            <input type="text" name="location" placeholder="Location" required />
            <input type="text" name="number" placeholder="Room Number" required />
            <input type="text" name="occupied" placeholder="Occupied (true/false)" required />
            <input type="text" name="accommodations" placeholder="Accommodations" required />
            <input type="text" name="lengthOfStay" placeholder="Length of Stay" required />
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
                    <div className="patient-actions">
                        <button className="btn-action" onClick={() => { setShowTable(true); setShowForm(false); }}>View All Rooms</button>
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
