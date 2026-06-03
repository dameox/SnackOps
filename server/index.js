const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./database.js');
require('dotenv').config();
const autheticationRoutes = require('./routes/authRoute.js');
const authenticateToken = require('./authorization/auth.js');
const machinesRoutes = require('./routes/machinesRoute.js');
const slotRoutes = require('./routes/SlotRoute.js');
const productsRoute = require('./routes/productsRoute.js');
const restockPlanRoute = require('./routes/restockPlanRoute.js');

app.use(cors());
app.use(express.json());
app.use('/api/auth', autheticationRoutes);
app.use('/api/machines', machinesRoutes);
app.use('/api/products', productsRoute);
app.use('/api/slots', slotRoutes);
app.use('/api/restock-route', restockPlanRoute);

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