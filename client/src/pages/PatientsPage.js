function PatientPage(){
  return(
    <div class="container">
            <section class="patients-section">
                <h2>Patients</h2>
                <p>View and manage patient records</p>

                <div class="patient-actions">
                    <a href="#" class="btn-action">Add New Patient</a>
                    <a href="#" class="btn-action">View All Patients</a>
                </div>

                <div class="patients-list">
                    
                    <table>
                        <thead>
                            <tr>
                                <th>Patient ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>John</td>
                                <td>Doe</td>
                                <td>30</td>
                                <td>Male</td>
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

export default PatientPage;