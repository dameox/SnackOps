import WorkerRow from './WorkerRow';
import { useState, useEffect } from 'react';
import axios from 'axios'



function WorkersTable() {
    
    const [workers, setWorkers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('/api/users/workers', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => setWorkers(res.data))
            .catch(err => console.error('Failed to load workers:', err));
    }, []);


    return(
        <div className='machine-table-wrapper'>
            <table className='machine-table'>
                <thead>
                    <tr className='machine-table-head'>
                        <th>Worker</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {workers.map(w => (
                        <WorkerRow key={w.id} worker={w} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default WorkersTable