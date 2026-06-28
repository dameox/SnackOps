import MachineRow from './MachineRow';
import { useState,useEffect } from 'react';
import axios from 'axios';

function MachineTable() {
    const [machines, setMachines] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('/api/machines', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => setMachines(res.data));
    }, []);


    function deleteRow(id) {
        const token = localStorage.getItem('token');
        axios.delete(`/api/machines/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                setMachines(machines.filter((m) => m.id != id));
            })
            .catch(err => console.error('Failed to delete machine:', err));
    }

    return(
            <table className='machine-table'>
                <thead>
                    <tr className='machine-table-head'>
                        <th>Machine</th>
                        <th>Address</th>
                        <th>Stock Level</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {machines.map(m => (
                        <MachineRow key={m.id} machine={m} onDelete={deleteRow} />
                    ))}
                </tbody>
            </table>
    );
    
}



export default MachineTable