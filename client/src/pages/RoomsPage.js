import NavigationBar from '../components/NavigationBar';

function RoomsPage(){
    return(
        <>
            <NavigationBar />
            <div class="container">
            <section class="patients-section">
                <h2>Rooms</h2>
                <p>Assign and manage room allocations</p>
    
                <div class="patient-actions">
                    <a href="#" class="btn-action">Add New Room</a>
                    <a href="#" class="btn-action">View All Rooms</a>
                </div>
    
                <div class="patients-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Room ID</th>
                                <th>Room Number</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>101</td>
                                <td>ICU</td>
                                <td>Occupied</td>
                                <td>
                                    <a href="#" class="btn-action">Edit</a>
                                    <a href="#" class="btn-action">Delete</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
        </>
    );
};

export default RoomsPage;
