const express = require('express');
const router = express.Router();
const pool = require('../database');
const authenticateToken = require('../authorization/auth');
const ownerOnly = require('../authorization/ownerPermission');
const { generateRestockPlan } = require('../algos/restockAlgo.js');

router.post('/generate', authenticateToken, ownerOnly, async (req, res) => {
    try{
        let restockPlan = await generateRestockPlan();
        res.json(restockPlan);
    }catch(error){
        res.status(500).json({message: 'Server error', error: error.message });
    }
});

router.get('/', authenticateToken, ownerOnly, async (req, res) => {
       try{
        const [plans] = await pool.query(`
            SELECT *
            FROM RESTOCK_PLAN
            ORDER BY created_at DESC
            `);
        res.json(plans);
    }catch(error){
        res.status(500).json({message: 'Server error', error: error.message });
    }
});

router.get('/:id', authenticateToken, ownerOnly, async (req, res) => {
    try{
        const [plan] = await pool.query(`
            SELECT *
            FROM RESTOCK_PLAN_ITEM
            WHERE id=${req.params.id}
            `);
        if (plan.length === 0 ){
            return res.status(404).json({message: 'PLAN NOT FOUND'});
        }

         const [items] = await pool.query(
            `SELECT rpi.*, m.name as machine_name, s.slot_code, p.name as product_name
            FROM RESTOCK_PLAN_ITEM rpi
            JOIN MACHINE m ON rpi.machine_id = m.id
            JOIN SLOT s ON rpi.slot_id = s.id
            JOIN PRODUCT p ON s.product_id = p.id
            WHERE rpi.restock_plan_id = ${req.params.id}`
        );

        res.json({...plan[0], items});

    }catch(error){
        res.status(500).json({message: 'Server error', error: error.message });
    }
});

module.exports = router;