import { Button } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import FleetStatus from '../components/FleetStatus';
import StatComponent from '../components/StatComponent';
import '../stylesheets/dashboardSheet.css';
import { useNavigate } from "react-router";
import { useState, useEffect } from 'react';
import axios from 'axios';


function Dashboard(){
    const navigate = useNavigate();
    const [machines, setMachines] = useState([]);
    const [activeRoutes, setActiveRoutes] = useState(0);
    const belowLimit = machines.filter(m => m.stock <= 30).length;

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('/api/machines', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => setMachines(res.data));
        
            axios.get('/api/routes', { headers: { Authorization: `Bearer ${token}` } })
                .then(res => setActiveRoutes(res.data.filter(r => r.status === 'in progress').length));

        }, []);




    return(
        <div className='layout'>
            <Sidebar/>
            <div className='content'>
                <div className='dashboard-header'>
                    <div className='dashboard-title'>Dashboard</div>
                    <Button className='restock-btn' variant='none' onClick={() => navigate('/restock-plan?generated=true')}>
                        <i className='bi bi-arrow-clockwise me-2'></i>Generate Restock Plan
                    </Button>
                </div>
                <div className='stats'>
                    <StatComponent title='Total Machines' value={machines.length} icon='bi-cpu' color='#7b6ef6'/>
                    <StatComponent title='Stock' value={belowLimit} footer='machines below limit' icon='bi-exclamation-triangle' color='#f0a500'/>
                    <StatComponent title='Active Routes' value={activeRoutes} footer='in progress' icon='bi-truck' color='#28a745'/>
                </div>
                <div className='fleet'>
                    <div className='fleet-title'>Fleet Status</div>
                    <FleetStatus machines={machines}/>
                </div>
            </div>
        </div>
    );
}

export default Dashboard