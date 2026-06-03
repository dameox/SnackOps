const express = require('express');
const router = express.Router();
const pool = require('../database');
const authenticateToken = require('../authorization/auth');
const ownerOnly = require('../authorization/ownerPermission');



router.get('/', authenticateToken, async (req, res) => {
    try {
        let machines;
        if (req.user.role === 'owner') {
            [machines] = await pool.query(`
                SELECT * 
                FROM MACHINE
                ORDER BY id`);
        } else {
            [machines] = await pool.query(`
                SELECT *
                FROM MACHINE 
                WHERE user_id = ${req.user.id}
                ORDER BY id`);
        }
        res.json(machines);
    } catch (error) {
        console.error('Error fetching machines:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:id', authenticateToken, async (req, res) => {
    const machineId = req.params.id;
    try {
        let machines;
        let slots;
        if(req.user.role === 'owner') {
            [machines] = await pool.query(`
                SELECT * 
                FROM MACHINE
                WHERE id = ${machineId}`);
        } else {
            [machines] = await pool.query(`
                SELECT *
                FROM MACHINE 
                WHERE id = ${machineId} AND user_id = ${req.user.id}`);
        }
        if (machines.length === 0) {
            return res.status(404).json({ message: 'Machine not found' });
        }
       let machine = machines[0];
        [slots] = await pool.query(`
            SELECT 
                s.*,
                p.name AS product_name,
                p.category,
                p.unit_cost,
                p.sell_price
            FROM SLOT s
            LEFT JOIN PRODUCT p ON p.id = s.product_id
            WHERE s.machine_id = ${machineId}
            ORDER BY s.id`);
        
        let slotsStatus = slots.map((slot) => {
            let status;
            if(slot.current_qty === 0) {
                status = "Critical";
            } else if(slot.current_qty <= slot.min_amount) {
                status = "Low";
            } else {
                status = "Good";
            }



            return {
                ...slot,
                status
            };
        });
        res.json({ ...machine, slots: slotsStatus });
    } catch (error) {
        console.error('Error fetching machine details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:id/slots', authenticateToken, async(req, res) => {
    const machineId = req.params.id;

    try{
        let machines;
        if(req.user.role === 'owner'){
            [machines] = await pool.query(`
                SELECT *
                FROM MACHINE
                WHERE id = ${machineId}`);
        } else {
            [machines] = await pool.query(`
                SELECT *
                FROM MACHINE
                WHERE id = ${machineId} AND user_id = ${req.user.id}`);
        }

        if(machines.length === 0) {
            return res.status(404).json({ message: 'Machine not found' });
        }
        const [slots] = await pool.query(`
           SELECT 
                s.*,
                p.name AS product_name,
                p.category,
                p.unit_cost,
                p.sell_price
            FROM SLOT s
            LEFT JOIN PRODUCT p ON p.id = s.product_id
            WHERE s.machine_id = ${machineId}
            ORDER BY s.id `);
        let slotsStatus = slots.map((slot) => {
            let status;
            if(slot.current_qty === 0) {
                status = "Critical";
            } else if(slot.current_qty <= slot.min_amount) {
                status = "Low";
            } else {
                status = "Good";
            } 
            return {
                ...slot,
                status
            };
        });
        res.json(slotsStatus);
    } catch (error) {
        console.error('Error fetching machine slots:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/:id/slots', authenticateToken, ownerOnly, async (req, res) => {
    const machineId = req.params.id;
    const { slot_code, product_id, current_qty, max_capacity, min_amount } = req.body;
    if(!slot_code || product_id==undefined || current_qty == undefined 
        || max_capacity == undefined || min_amount == undefined) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try{
        const [machines] = await pool.query(`
            SELECT *
            FROM MACHINE
            WHERE id = ${machineId}`);
        if(machines.length === 0) {
            return res.status(404).json({ message: 'Machine not found' });
        }

        const [result] = await pool.query(`
            INSERT INTO SLOT (slot_code, product_id, current_qty, max_capacity, min_amount, machine_id)
            VALUES ('${slot_code}', ${product_id}, ${current_qty}, ${max_capacity}, ${min_amount}, ${machineId})`);

        res.status(201).json({ message: 'Slot created successfully' });
        
    }catch (error) {
        console.error('Error creating slot:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    
});

router.post('/', authenticateToken, ownerOnly, async (req, res) => {
    const { name, address, coordinates, user_id } = req.body;

    if(!name || !address) {
        return res.status(400).json({ message: 'Name and address are required' });
    }

    try {
        await pool.query(`
            INSERT INTO MACHINE (name, address, coordinates, user_id)
            VALUES ('${name}', '${address}', '${coordinates}', ${user_id})`);
      
            res.status(201).json({ message: 'Machine created successfully' });
    } catch (error) {
        console.error('Error creating machine:', error);
        res.status(500).json({ message: 'Internal server error' });
    }});    

router.put('/:id', authenticateToken, ownerOnly, async (req, res) => {
    const machineId = req.params.id;
    const { name, address, coordinates, user_id } = req.body;

    if(!name || !address) {
        return res.status(400).json({ message: 'Name and address are required' });
    }

    try {
        const [result] = await pool.query(`
            UPDATE MACHINE
            SET name = '${name}', address = '${address}', coordinates = '${coordinates}', user_id = ${user_id}
            WHERE id = ${machineId}`);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Machine not found' });
            }
            res.json({ message: 'Machine updated successfully' });

    } catch (error) {
        console.error('Error updating machine:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/:id', authenticateToken, ownerOnly, async (req, res) => {
    const machineId = req.params.id;
    try {
        const [result] = await pool.query(`
            DELETE FROM MACHINE
            WHERE id = ${machineId}`);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Machine not found' });
            }
            res.json({ message: 'Machine deleted successfully' });
    } catch (error) {
        console.error('Error deleting machine:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;