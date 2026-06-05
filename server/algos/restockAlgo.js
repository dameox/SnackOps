const pool = require('../database.js');

async function generateRestockPlan() {
    //get number of low slots
    const [lowSlots] = await pool.query(`
        SELECT s.*, m.id AS machine_id, m.name AS machine_name, m.coordinates as machine_coordinates
        FROM SLOT s
        JOIN MACHINE m ON s.machine_id = m.id
        WHERE s.current_qty < s.min_amount`);

    //get number of total slots by machine
    const [totalSlots] = await pool.query(`
        SELECT machine_id, COUNT(*) AS total_slots
        FROM SLOT
        GROUP BY machine_id`);
    
    //dictionary of total slots by machine id
    let totalSlotsMap = {};
    totalSlots.forEach(slot => {
        totalSlotsMap[slot.machine_id] = slot.total_slots;
    });

    //Get all machines with low slots
    let machineMap = {};
    lowSlots.forEach(slot => {
        if (!machineMap[slot.machine_id]) {
            machineMap[slot.machine_id] = {
                machine_id: slot.machine_id,
                machine_name: slot.machine_name,
                machine_coordinates: slot.machine_coordinates,
                low_slots: [slot],
                total_slots: totalSlotsMap[slot.machine_id]
            };
        }else{
            machineMap[slot.machine_id].low_slots.push(slot);
        }
       
    });

    //turns the machine dictionary into an arr and calculates the urgency score based on the formula.
    let machines = Object.values(machineMap);
    machines.forEach(machine => {
        let lowSlots = machine.low_slots.length;
        let total = totalSlotsMap[machine.machine_id];
        machine.urgency_score = Math.min(Math.round((lowSlots / total)*100), 100)
    });

    //number sort for arr(DESCENDING)
    machines.sort((a,b) => b.urgency_score - a.urgency_score);

    let overallUrgency = machines[0] || 0;
    const [plan] = await pool.query(`
        INSERT INTO RESTOCK_PLAN (status, urgency_score)
        VALUES ('pending', ${overallUrgency})
        `);
    let planId = plan.insertId;
    for(let machine of machines) {
        for(let slot of machine.low_slots){
            await pool.query(`
                INSERT INTO RESTOCK_PLAN_ITEM (restock_plan_id, machine_id, slot_id, qty_to_fill, is_completed) 
                VALUES (${planId}, ${machine.machine_id}, ${slot.id}, ${qtyToFill}, false)
                `);
        }
    }

    return { planId,machines };


}

module.exports = { generateRestockPlan };