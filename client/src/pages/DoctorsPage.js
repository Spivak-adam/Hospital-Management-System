function DoctorsPage(){
    return(
        <div class="container">
            <section class="patients-section">
                <h2>Doctors</h2>
                <p>View and manage doctor information</p>

                <div class="patient-actions">
                    <a href="#" class="btn-action">Add New Doctor</a>
                    <a href="#" class="btn-action">View All Doctors</a>
                </div>

                <div class="patients-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Doctor ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Specialty</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Jane</td>
                                <td>Smith</td>
                                <td>Cardiology</td>
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
    );
};

export default DoctorsPage;