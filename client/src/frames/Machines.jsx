import { Button } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import MachinesTable from '../components/MachinesTable';
import '../stylesheets/machineSheet.css'
import MachineModal from '../components/MachineModal';
import { useState } from 'react';

function Machines(){
    let [showModal, setShowModal] = useState(false);

    return(
         <div className='layout'>
            <Sidebar/>
            <div className='content'>
                <div className='machines-header'>
                    <div className='machines-title'>Machines</div>
                    <Button className='add-btn' variant='none' onClick={() => setShowModal(true)}>
                        <i className='bi bi-plus'></i>Add Machine
                    </Button>
                    <MachineModal show={showModal} onClose={() => setShowModal(false)} machine={null}/>
                </div>
                <div className='machines-content'>
                    <MachinesTable/>
                </div>
            </div>
        </div>
    );
}

export default Machines