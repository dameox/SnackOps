const bcrypt = require('bcryptjs');
const pool = require('./database');
require('dotenv').config();

async function addUsers() {
    //hashing passwords for the two users
    const hashedPasswordOwner = await bcrypt.hash('passwordOwner123', 10);
    const hashedPasswordWorker = await bcrypt.hash('passwordWorker123', 10);

    // queries for inserting the two users into the database
    await pool.query(
        `INSERT INTO USERS (name, email, password, role) VALUES ('Admin', 'admin@snackops.com', '${hashedPasswordOwner}', 'owner')`
    );

    await pool.query(
        `INSERT INTO USERS (name, email, password, role) VALUES ('Worker', 'worker@snackops.com', '${hashedPasswordWorker}', 'worker')`
    );

    console.log('Users created successfully');
    process.exit();
}

addUsers();