function AppointmentsPage(){
    return(
        <div class="container">
            <section class="patients-section">
                <h2>Appointments</h2>
                <p>Schedule and view appointments</p>

                <div class="patient-actions">
                    <a href="#" class="btn-action">Add New Appointment</a>
                    <a href="#" class="btn-action">View All Appointments</a>
                </div>

                <div class="patients-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Appointment ID</th>
                                <th>Patient Name</th>
                                <th>Doctor Name</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>John Doe</td>
                                <td>Dr. Smith</td>
                                <td>2024-07-01</td>
                                <td>10:00 AM</td>
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
    )
};

export default AppointmentsPage;