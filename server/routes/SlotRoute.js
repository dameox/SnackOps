const express = require('express');
const router = express.Router();
const pool = require('../database');
const authenticateToken = require('../authorization/auth');
const ownerOnly = require('../authorization/ownerPermission');

router.put('/:id', authenticateToken, async (req, res) => {
    const slotId = req.params.id;
    const { product_id, current_qty, max_capacity, min_amount } = req.body;

    if(product_id === undefined || current_qty === undefined 
        || max_capacity === undefined || min_amount === undefined) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try{
        const [result] = await pool.query(`
            UPDATE SLOT
            SET product_id = ${product_id}, current_qty = ${current_qty}, max_capacity = ${max_capacity}, min_amount = ${min_amount}
            WHERE id = ${slotId}`);

        if(result.affectedRows === 0) {
            return res.status(404).json({ message: 'Slot not found' });
        }
        res.status(200).json({ message: 'Slot updated successfully' });
    }catch (error) {
        console.error('Error updating slot:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

});

router.delete('/:id', authenticateToken, ownerOnly, async (req, res) => {
    const slotId = req.params.id;
    try {
        const [result] = await pool.query(`DELETE FROM SLOT WHERE id = ${slotId}`);
        if(result.affectedRows === 0) {
            return res.status(404).json({ message: 'Slot not found' });
        }
        res.status(200).json({ message: 'Slot deleted successfully' });
    } catch (error) {
        console.error('Error deleting slot:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;