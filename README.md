# Hospital Management System

    This is a web application for managing hospital data including rooms, patients, doctors, appointments, and treatments.

## Prerequisites

    1. **Node.js**: Ensure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
    2. **MySQL**: Make sure you have a running MySQL server.
    3. **VPN**: You need to be connected to the school VPN to access the database server.

## Getting Started

### Step 1: Connect to the School VPN

    Follow the instructions provided by your school to connect to the VPN. This is required to access the remote MySQL server.

### Step 2: Clone the Repository

    Clone this repository to your local machine using the following command:

        git clone <repository-url>
        cd Hospital-Management-System

### Step 3: Install Dependencies

    You need to make sure dependencies are installed for both the server and client.

    server:

        cd server
        npm install
    
    client:

        cd ../client
        npm install


### Step 4: Congigure the Databse

    Make sure the MySQL server is running with your own credentials. Import the database schema and data using the DDL.sql and DML.sql file.

### Step 5: Build the Client

    Navigate to the client directory and build the client:
        
        npm run build

### Step 6: Start the Server

    Navigate to the server and start the server. You can also use nodemon or forever for production if you don't want to keep restarting the server.

    Development:

        npm start
        OR
        npm run dev

    production:

        alias forever='./node_modules/forever/bin/forever'
        forever start app.js


### Step 7: access the application:

    open browser and navigate to URL (only after starting program).

        if you using forever on the backend you can use your local machine to access frontend:

            http://localhost:2102/

        if you used nodemon on the backend you can use remoter server to access frontend:

            http://classwork.engr.oregonstate.edu:2102/

### IMPORTANT: DATBASE CONNECTION

    Make sure that you are connected to the VPN and the MySQL server.

       
