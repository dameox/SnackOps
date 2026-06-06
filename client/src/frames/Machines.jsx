import { Button } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import MachinesTable from '../components/MachinesTable';
import '../stylesheets/machineSheet.css'

function Machines(){
    return(
         <div className='layout'>
            <Sidebar/>
            <div className='content'>
                <div className='machines-header'>
                    <div className='machines-title'>Machines</div>
                    <Button className='add-btn' variant='none'>
                        <i className='bi bi-plus'></i>Add Machine
                    </Button>
                </div>
                <div className='machines-content'>
                    <MachinesTable/>
                </div>
            </div>
        </div>
    );
}

export default Machines