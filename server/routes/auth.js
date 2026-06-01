const express = require('express');
const router = express.Router();
const pool = require('../database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [userRows] = await pool.query(`SELECT * FROM users WHERE email = '${email}'`);
        if (userRows.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const user = userRows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user.id, name: user.name, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: '6h'}
        );
        res.json({token, user: {id: user.id, name: user.name, role: user.role}});
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;