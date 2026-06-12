import { Button } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import FleetStatus from '../components/FleetStatus';
import StatComponent from '../components/StatComponent';
import '../stylesheets/dashboardSheet.css';

function Dashboard(){
    return(
        <div className='layout'>
            <Sidebar/>
            <div className='content'>
                <div className='dashboard-header'>
                    <div className='dashboard-title'>Dashboard</div>
                    <Button className='restock-btn' variant='none'>
                        <i className='bi bi-arrow-clockwise me-2'></i>Generate Restock Plan
                    </Button>
                </div>
                <div className='stats'>
                    <StatComponent title='Total Machines' value={10} icon='bi-cpu' color='#7b6ef6'/>
                    <StatComponent title='Stock' value={4} footer='machines below limit' icon='bi-exclamation-triangle' color='#f0a500'/>
                    <StatComponent title='Active Routes' value={1} footer='in progress' icon='bi-truck' color='#28a745'/>
                </div>
                <div className='fleet'>
                    <div className='fleet-title'>Fleet Status</div>
                    <FleetStatus/>
                </div>
            </div>
        </div>
    );
}

export default Dashboard