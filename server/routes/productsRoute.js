const express = require('express');
const router = express.Router();
const pool = require('../database');
const authenticateToken = require('../authorization/auth');
const ownerOnly = require('../authorization/ownerPermission');

router.get('/', authenticateToken, async (req, res) => {
    try {
        const [products] = await pool.query(`
            SELECT * 
            FROM PRODUCT
            ORDER BY id`);
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/analytics', authenticateToken, ownerOnly, async(req, res) => {
    try{
        const [sales] = await pool.query(`
            SELECT sl.qty_sold, p.sell_price, p.name AS product_name, m.name AS machine_name
            FROM SALE_LOG sl
            JOIN PRODUCT p ON sl.product_id = p.id
            JOIN MACHINE m ON sl.machine_id = m.id`);

        let totalRevenue = 0;
        let unitsSold = 0;
        let machineRevenue = {};
        let productRevenue = {};
        sales.forEach(s => {
            let revenue = s.qty_sold * s.sell_price

            totalRevenue += revenue;
            unitsSold += s.qty_sold;
            machineRevenue[s.machine_name] = (machineRevenue[s.machine_name] || 0) + revenue;
            productRevenue[s.product_name] = (productRevenue[s.product_name] || 0) + revenue;
        
        });

        let bestMachine = null;
        for (let name in machineRevenue) {
            if (!bestMachine || machineRevenue[name] > bestMachine.revenue) {
                bestMachine = { name, revenue: machineRevenue[name] };
            }
        }

        let topProducts = Object.keys(productRevenue)
            .map(name => ({ name, revenue: productRevenue[name] }))
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 5);

        res.json({ totalRevenue, unitsSold, bestMachine, topProducts });
    } catch(err){
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.post('/', authenticateToken, ownerOnly, async (req, res) => {
    const { name, category, unit_cost, sell_price } = req.body;

    if (!name || !category || unit_cost === undefined 
        || sell_price === undefined) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const [result] = await pool.query(`
            INSERT INTO PRODUCT (name, category, unit_cost, sell_price)
            VALUES ('${name}', '${category}', ${unit_cost}, ${sell_price})`);
        res.status(201).json({ message: 'Product created successfully', product: result });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }  
});

router.put('/:id', authenticateToken, ownerOnly, async (req, res) => {
    const productId = req.params.id;
    const { name, category, unit_cost, sell_price } = req.body;

    if (!name || !category || unit_cost === undefined 
        || sell_price === undefined) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try{
        const [result] = await pool.query(`
            UPDATE PRODUCT
            SET name = '${name}', category = '${category}', unit_cost = ${unit_cost}, sell_price = ${sell_price}
            WHERE id = ${productId}`);
            if(result.affectedRows === 0) {
                return res.status(404).json({ message: 'Product not found' });
            }
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/:id', authenticateToken, ownerOnly, async (req, res) => {
    const productId = req.params.id;

    try {
        const [result] = await pool.query(`
            DELETE FROM PRODUCT
            WHERE id = ${productId}`);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;