import { Button } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import WorkersTable from '../components/WorkerTable';
import '../stylesheets/machineSheet.css';

function Workers(){
    return(
        <div className='layout'>
            <Sidebar/>
            <div className='content'>
                <div className='machines-header'>
                    <div className='machines-title'>Workers</div>
                    <Button className='add-btn' variant='none'>
                        <i className='bi bi-plus'></i>Add Worker
                    </Button>
                </div>
                <div className='machines-content'>
                    <WorkersTable/>
                </div>
            </div>
        </div>
    );
}

export default Workers