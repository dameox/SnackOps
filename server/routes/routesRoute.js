const express = require('express');
const router = express.Router();
const pool = require('../database');
const authenticateToken = require('../authorization/auth');
const ownerOnly = require('../authorization/ownerPermission');
const {createRoute} = require('../algos/routeAlgo')

router.post('/generate', authenticateToken, ownerOnly, async (req,res) => {
    const {restock_plan_id, user_id} = req.body;
    try{
        let result = await createRoute(restock_plan_id,user_id);
        res.json(result);
    }catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/', authenticateToken, async (req,res) => {
    try{
        let routes;
        if(req.user.role==='owner'){
            [routes] = await pool.query(`
                SELECT *
                FROM ROUTE
                ORDER BY route_date_on DESC
                `);
        }else{
            [routes] = await pool.query(`
                SELECT *
                FROM ROUTE
                WHERE user_id=${req.user.id}
                ORDER BY route_date_on DESC
                `);
        }
        res.json(routes);
    }catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/:id', authenticateToken, async (req,res) => {
    try {
        const [routes] = await pool.query(`
            SELECT *
            FROM ROUTE
            WHERE id=${req.params.id}
            `);
        if(routes.length === 0){
            return res.status(404).json({ message: 'Route not found' });
        }
        let route = routes[0];

        const [stops] = await pool.query(`
            SELECT rs.*, m.name as machine_name, m.address, m.coordinates
            FROM ROUTE_STOP rs
            JOIN MACHINE m ON rs.machine_id = m.id
            WHERE rs.route_id = ${req.params.id}
            ORDER BY rs.order_index ASC
            `);

        for(let stop of stops) {
            const [items] = await pool.query(`
                SELECT rpi.*, p.name as product_name, s.slot_code
                FROM RESTOCK_PLAN_ITEM rpi
                JOIN SLOT s ON rpi.slot_id = s.id
                JOIN PRODUCT p ON s.product_id = p.id
                WHERE rpi.machine_id = ${stop.machine_id}
                AND rpi.restock_plan_id = ${route.restock_plan_id}
                `);
            stop.items = items;
        }
        res.json({...route, stops })

    }catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.patch('/:id/complete', authenticateToken, async (req,res) => {
    const stopId = req.params.id;
    try {
        const [stops] = await pool.query(`SELECT machine_id, route_id FROM ROUTE_STOP WHERE id = ${stopId}`);
        if (stops.length === 0) {
            return res.status(404).json({ message: 'Stop not found' });
        }
        const stop = stops[0];

        const [routes] = await pool.query(`SELECT restock_plan_id FROM ROUTE WHERE id = ${stop.route_id}`);
        const planId = routes[0].restock_plan_id;

        const [items] = await pool.query(`SELECT slot_id FROM RESTOCK_PLAN_ITEM WHERE restock_plan_id = ${planId} AND machine_id = ${stop.machine_id}`);

        for (let item of items) {
            await pool.query(`UPDATE SLOT SET current_qty = max_capacity WHERE id = ${item.slot_id}`);
        }

        await pool.query(`UPDATE ROUTE_STOP SET completed_at = NOW() WHERE id = ${stopId}`);

        res.json({ message: 'Stop completed and stock refilled' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.patch('/:id/assign', authenticateToken, ownerOnly, async (req, res) => {
    const { user_id } = req.body;
    try {
        await pool.query(
            `UPDATE ROUTE SET user_id = ${user_id}, status = 'assigned' WHERE id = ${req.params.id}`);
        res.json({ message: 'Driver assigned' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


module.exports=router;