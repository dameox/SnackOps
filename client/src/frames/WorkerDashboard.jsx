import Sidebar from '../components/Sidebar';
import RestockMachine from '../components/RestockMachine.jsx';
import '../stylesheets/restockSheet.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function WorkerDashboard(){
    const [stops, setStops] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const authHeader = { headers: { Authorization: `Bearer ${token}` } };

        axios.get('/api/routes', authHeader)
            .then(res => {
                if (res.data.length === 0) return;
                const newest = res.data.sort((a, b) => b.id - a.id)[0];
                return axios.get(`/api/routes/${newest.id}`, authHeader)
                    .then(r => setStops(r.data.stops.filter(s => !s.completed_at)))
            })
            .catch(err => console.error('Failed to load route:', err));
    }, []);

    function completeStop(stopId){
        const token = localStorage.getItem('token');
        axios.patch(`/api/routes/${stopId}/complete`, {}, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => setStops(prev => prev.filter(s => s.id !== stopId)))
            .catch(err => console.error('Failed to complete stop:', err));
    }
    
    return(
        <div className='layout'>
            <Sidebar/>
            <div className='content'>
            <div className='restock-machines'>
                    {stops.map(s => (
                        <RestockMachine key={s.id} id={s.id} order={s.order_index} 
                        name={s.machine_name} slots={s.items} showDoneBtn={true} onComplete={completeStop}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WorkerDashboard