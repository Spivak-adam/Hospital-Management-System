# MedixManager

MedixManager is a Hospital Management System designed to help manage patients, doctors, appointments, treatments, and rooms. The system provides an intuitive interface for administrators to perform CRUD operations efficiently.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/medixmanager.git
    cd medixmanager
    ```

2. **Install the required dependencies:**
    ```bash
    npm install
    ```

3. **Set up the database:**

    - Ensure you have MySQL installed and running.
    - Create a new database:
        ```sql
        CREATE DATABASE medixmanager;
        ```
    - Import the SQL schema and sample data:
        ```bash
        mysql -u yourusername -p medixmanager < sql/ddl.sql
        mysql -u yourusername -p medixmanager < sql/dml.sql
        ```

4. **Configure the database connection:**

    - Update the `config/database.js` file with your database credentials:
        ```javascript
        const mysql = require('mysql');

        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'yourusername',
            password: 'yourpassword',
            database: 'medixmanager'
        });

        module.exports = connection;
        ```

5. **Start the application:**
    ```bash
    npm start
    ```

    Alternatively, you can use `nodemon` to automatically restart the server when changes are detected:
    ```bash
    npm install -g nodemon
    nodemon app.js
    ```

6. **Access the application:**

    Open your web browser and navigate to:
    ```
    http://yourserveraddress:3000
    ```

## Usage

- **Home Page:** Provides an overview of the hospital management system and quick links to different sections.
- **Patients:** View, add, update, and delete patient records.
- **Doctors:** View, add, update, and delete doctor records.
- **Appointments:** Schedule, view, update, and delete appointments.
- **Treatments:** Manage treatment procedures.
- **Rooms:** Assign and manage room allocations.

## File Structure

medixmanager/
│
├── styles.css # Main stylesheet for the application
│
├── images/
│ └── ... # Image assets used in the application
│
├── routes/
│ ├── appointments.js # Routes for managing appointments
│ ├── doctors.js # Routes for managing doctors
│ ├── patients.js # Routes for managing patients
│ ├── rooms.js # Routes for managing rooms
│ └── treatments.js # Routes for managing treatments
│
├── ddl.sql # Database schema definition
├── dml.sql # Data manipulation queries
│
├── public/
│ ├── appointments.html # HTML for managing appointments
│ ├── doctors.html # HTML for managing doctors
│ ├── index.html # Home page HTML
│ ├── patients.html # HTML for managing patients
│ ├── rooms.html # HTML for managing rooms
│ └── treatments.html # HTML for managing treatments
│
├── app.js # Main server file
├── package.json # Node.js dependencies and scripts
├── config/
│ └── database.js # Database configuration
└── README.md # This file


## Technologies Used

- **Backend:**
  - Node.js
  - Express.js

- **Frontend:**
  - HTML
  - CSS

- **Database:**
  - MySQL

## Contributing

1. **Fork the repository.**
2. **Create a new branch:**
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. **Commit your changes:**
    ```bash
    git commit -m 'Add some feature'
    ```
4. **Push to the branch:**
    ```bash
    git push origin feature/your-feature-name
    ```
5. **Submit a pull request.**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
