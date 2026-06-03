function parseCoordinates(coord) {
    const [lat,lng] = coord.split(",").map(Number);

    return {lat,lng};
}

function haversineDistance(a,b) {
    let R = 6371;
    let dLat = (b.lat-a.lat) * Math.PI / 180;
    let dLng = (b.lng-a.lng) * Math.PI / 180;
    let x = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    let c = 2 * Math.atan2(Math.sqrt(x),Math.sqrt(1-x));

    return R * c; //kilometers

}

function nearestNeighbor(machines) {
    const visited = new Array(machines.length);
    let ordered = []
    for(let m of visited){m=false}
    let cIndex = 0;
    visited[cIndex] = true;
    ordered.push(machines[cIndex])
    
    for(let i=1; i<machines.length; i++) {
        let nIndex = 0;
        let nDistance = 10000000;
        for(let j=0; j<machines.length;j++){
            if(!visited[j]){
            let distance=haversineDistance(machines[cIndex].coords,machines[j].coords);
            if(distance < nDistance){
                nDistance = distance;
                nIndex=j;
                }
            }
        }
        visited[nIndex] = true;
        ordered.push(machines[nIndex]);
        cIndex=nIndex
    }
    return ordered;
}

async function createRoute(planId, workerId){
    const[machines] = await pool.query(`
        SELECT DISTINCT m.id, m.name, m.coordinates
        FROM RESTOCK_PLAN_ITEM rpi
        JOIN MACHINE m ON rpi.machine_id = m.id
        WHERE rpi.restock_plan_id = ${planId}
        `);

    if(machines.length === 0){throw new Error ('no machines found');}
    
    machines.forEach(machine => {
            machine.coords = parseCoordinates(machine.coordinates);
        })

    let orderedMachines = nearestNeighbor(machines);

    const [routeResult] = await pool.query(`
            INSERT INTO ROUTE (restock_plan_id, user_id, route_date_on, status)
            VALUES (${planId}, ${workerId}, CURDATE(), 'assigned')
            `);
    let routeId = routeResult.insertId;
    for(let i=0;i<orderedMachines.length;i++){
        await pool.query(`
            INSERT INTO ROUTE_STOP (route_id, machine_id, order_index)
            VALUES (${routeId}, ${orderedMachines[i].id}, ${i + 1})
            `);
    }
    return {routeId, orderedMachines};

}

module.exports = { parseCoordinates, haversineDistance, nearestNeighbor, createRoute };