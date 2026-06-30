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
const routeRoutes = require('./routes/routesRoute.js');
const usersRoute = require('./routes/usersRoute.js');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use('/api/auth', autheticationRoutes);
app.use('/api/machines', machinesRoutes);
app.use('/api/products', productsRoute);
app.use('/api/slots', slotRoutes);
app.use('/api/restock-plan', restockPlanRoute);
app.use('/api/routes', routeRoutes);
app.use('/api/users', usersRoute);


// Routes
app.get('/api/initialRoute', (req, res) => {
    res.json({ message: 'API is working!' });
});

const reactBuildPath = path.join(__dirname, '../client/dist');
app.use(express.static(reactBuildPath));
app.get((req, res) => {
    res.sendFile(path.join(reactBuildPath, 'index.html'));
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