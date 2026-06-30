import { Button } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import WorkersTable from '../components/WorkerTable';
import '../stylesheets/machineSheet.css';
import WorkersModal from '../components/WorkersModal';
import { useState } from 'react';

function Workers(){
    let [showModal, setShowModal] = useState(false);

    return(
        <div className='layout'>
            <Sidebar/>
            <div className='content'>
                <div className='machines-header'>
                    <div className='machines-title'>Workers</div>
                    <Button className='add-btn' variant='none' onClick={() => setShowModal(true)}>
                        <i className='bi bi-plus'></i>Add Worker
                    </Button>
                    <WorkersModal show={showModal} onClose={() => setShowModal(false)}/>
                </div>
                <div className='machines-content'>
                    <WorkersTable />
                </div>
            </div>
        </div>
    );
}

export default Workers