import Sidebar from '../components/Sidebar';
import RestockMachine from '../components/RestockMachine';
import '../stylesheets/restockSheet.css';
import { useEffect, useState } from 'react';
import {useSearchParams} from 'react-router-dom';
import axios from 'axios';



function RestockPlan(){
    let [showBanner, setShowBanner] = useState(false);
    let [machines, setMachines] = useState([]);
    const date = new Date().toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric'});

    const [searchParams] = useSearchParams();
    const generated = searchParams.get('generated');
    //console.log(generated);

    function generatePlan(){
        const token = localStorage.getItem('token');
        axios.post('/api/restock-plan/generate', {}, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setMachines(res.data.machines);
                setShowBanner(true);
            })
            .catch(err => console.error('Failed to generate plan:', err));
    }

    function loadLatest(){
        const token = localStorage.getItem('token');
        axios.get('/api/restock-plan/latest', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setMachines(res.data.machines);
                if (res.data.machines.length > 0) setShowBanner(true);
            })
            .catch(err => console.error('Failed to load latest plan:', err));
    }


    useEffect(() => {
        if(generated === 'true'){
            generatePlan();
        } else {
            loadLatest();
        }
    }, [generated]);


    return(
        <div className='layout'>
            <Sidebar/>
            <div className='content'>
                <div className='restock-header'>
                    <div className='restock-title'>Restock Plan</div>
                    <button className='add-btn'onClick={generatePlan}>
                        <i className='bi bi-arrow-clockwise'></i> Generate New Plan
                    </button>
                </div>
                {showBanner && (
                    <div className='restock-plan-banner'>
                        <div>
                            <div className='restock-plan-date'>Plan generated - {date}</div>
                            <div className='restock-plan-sub'>{machines.length} machines to refill</div>
                        </div>
                    </div>
                )}
                <div className='restock-machines'>
                    {machines.map(m => (
                        <RestockMachine key={m.machine_id} id={m.machine_id} order={m.urgency_score} name={m.machine_name} slots={m.low_slots}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RestockPlan