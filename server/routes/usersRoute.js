const express = require('express');
const router = express.Router();
const pool = require('../database');
const authenticateToken = require('../authorization/auth');
const ownerOnly = require('../authorization/ownerPermission');
const bcrypt = require('bcryptjs');

// get all workers (for the assign-worker dropdown)
router.get('/workers', authenticateToken, async (req, res) => {
    try {
        const [workers] = await pool.query("SELECT id, name, email FROM USERS WHERE role = 'worker' ORDER BY name");
        res.json(workers);
    } catch (error) {
        console.error('Error fetching workers:', error);
        res.status(500).json({ message: ' server error' });
    }
});


router.post('/workers', authenticateToken, ownerOnly, async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email and password are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
            `INSERT INTO USERS (name, email, password, role) VALUES ('${name}', '${email}', '${hashedPassword}', 'worker')`
        );
        res.status(201).json({ message: 'Worker created successfully' });
    } catch (error) {
        console.error('Error creating worker:', error);
        res.status(500).json({ message: ' server error' });
    }
});


module.exports = router;