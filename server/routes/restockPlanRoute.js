const express = require('express');
const router = express.Router();
const pool = require('../database');
const authenticateToken = require('../authorization/auth');
const ownerOnly = require('../authorization/ownerPermission');
const { generateRestockPlan } = require('../algos/restockAlgo.js');
const { createRoute } = require('../algos/routeAlgo.js');

router.post('/generate', authenticateToken, ownerOnly, async (req, res) => {
    try{
        let restockPlan = await generateRestockPlan();
        if( restockPlan.machines.length > 0) {
            try{
                await createRoute(restockPlan.planId);
            } catch (err) {
                console.error('Plan created, route generation fail: ', err.message);
            }
        }
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

router.get('/latest', authenticateToken, ownerOnly, async (req, res) => {
    try {
        const [plans] = await pool.query(`SELECT * FROM RESTOCK_PLAN ORDER BY created_at DESC LIMIT 1`);
        if (plans.length === 0) {
            return res.json({ planId: null, machines: [] });
        }
        const plan = plans[0];

        const [items] = await pool.query(`
            SELECT rpi.*, m.name AS machine_name, m.coordinates AS machine_coordinates,
                   s.slot_code, p.name AS product_name
            FROM RESTOCK_PLAN_ITEM rpi
            JOIN MACHINE m ON rpi.machine_id = m.id
            JOIN SLOT s ON rpi.slot_id = s.id
            LEFT JOIN PRODUCT p ON s.product_id = p.id
            WHERE rpi.restock_plan_id = ${plan.id}`);

        const [totalSlots] = await pool.query(`SELECT machine_id, COUNT(*) AS total_slots FROM SLOT GROUP BY machine_id`);
        let totalSlotsMap = {};
        totalSlots.forEach(row =>  { 
            totalSlotsMap[row.machine_id] = row.total_slots; });
        
        let machineMap = {};
        items.forEach(item => {
            if (!machineMap[item.machine_id]) {
                machineMap[item.machine_id] = {
                    machine_id: item.machine_id,
                    machine_name: item.machine_name,
                    machine_coordinates: item.machine_coordinates,
                    low_slots: [item]
                };
            } else {
                machineMap[item.machine_id].low_slots.push(item);
            }
        });

        let machines = Object.values(machineMap);
        machines.forEach(machine => {
            let lowCount = machine.low_slots.length;
            let total = totalSlotsMap[machine.machine_id];
            machine.urgency_score = Math.min(Math.round((lowCount / total) * 100), 100);
        });
        machines.sort((a, b) => b.urgency_score - a.urgency_score);

        res.json({ planId: plan.id, machines });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
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