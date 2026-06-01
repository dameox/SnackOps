const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./database.js');
require('dotenv').config();
const autheticationRoutes = require('./routes/auth.js');

app.use(cors());
app.use(express.json());
app.use('/api/auth', autheticationRoutes);

// Routes
app.get('/api/initialRoute', (req, res) => {
    res.json({ message: 'API is working!' });
});


const PORT = process.env.PORT || 3000;

// server start + database connection test
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);

    try {
        await pool.query('SELECT 1');
        console.log('Database connection successful!');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
});