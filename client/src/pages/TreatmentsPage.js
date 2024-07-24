function TreatmentsPage(){
    return(
        <div class="container">
            <section class="patients-section">
                <h2>Treatments</h2>
                <p>Manage treatments and procedures</p>

                <div class="patient-actions">
                    <a href="#" class="btn-action">Add New Treatment</a>
                    <a href="#" class="btn-action">View All Treatments</a>
                </div>

                <div class="patients-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Treatment ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Chemotherapy</td>
                                <td>Cancer treatment using chemical substances</td>
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

export default TreatmentsPage;