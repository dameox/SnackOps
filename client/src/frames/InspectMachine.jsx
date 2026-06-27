import { Button } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import '../stylesheets/machineSheet.css';
import StatComponent from '../components/StatComponent.jsx';
import { useParams } from 'react-router-dom';
import SlotCard from '../components/SlotCard.jsx';
import '../stylesheets/inspectSheet.css';

  const mockMachines = [
    {
        id: 1, name: 'Pošta 2', address: 'Kolodvorska cesta 9, 6000 Koper',
        slots: [
            {id: 1, slot_code: 'A1', product_name: 'Lays',     current_qty: 6, max_capacity: 10, status: 'Good'},
            {id: 2, slot_code: 'A2', product_name: 'Argeta',   current_qty: 2, max_capacity: 10, status: 'Low'},
            {id: 3, slot_code: 'A3', product_name: 'Pringles', current_qty: 7, max_capacity: 10, status: 'Good'},
            {id: 4, slot_code: 'A4', product_name: 'Orbit',    current_qty: 4, max_capacity: 10, status: 'OK'},
            {id: 5, slot_code: 'B1', product_name: 'Coca Cola',current_qty: 1, max_capacity: 10, status: 'Low'},
            {id: 6, slot_code: 'B2', product_name: 'Cockta',   current_qty: 8, max_capacity: 10, status: 'Good'},
            {id: 7, slot_code: 'B3', product_name: 'Sola',     current_qty: 6, max_capacity: 10, status: 'Good'},
            {id: 8, slot_code: 'B4', product_name: 'Monster',  current_qty: 5, max_capacity: 10, status: 'OK'},
        ]
    }
];

function InspectMachine(){

 
    const {id} = useParams();
    console.log(id);

    const machine = mockMachines.find(m => m.id === parseInt(id));

    return(
         <div className='layout'>
            <Sidebar/>
            <div className='content'>
                <div className='inspect-header'>
                    <div className='inspect-header-left'>
                        <div className='inspect-title'>{machine.name}</div>
                        <div className='inspect-address'>{machine.address}</div>
                    </div>
                    <button className='add-btn'>
                        <i className='bi bi-arrow-clockwise'></i> Edit Machine
                    </button>
                </div>
                <div className='slot-status'>
                    <StatComponent title={'Total slots'} value={8} footer={''} color={'#ffffff'}/>
                    <StatComponent title={'Good slots'} value={8} footer={''} color={'#28a745'}/>
                    <StatComponent title={'Medium slots'} value={8} footer={''} color={'#f0a500'}/>
                    <StatComponent title={'Low slots'} value={8} footer={''} color={'#dc3545'}/>
                </div>
                <div className='slot-inventory'>
                    <div className='slot-inventory-header'>Slot Inventory</div>
                    <div className='slot-cards'>
                        {machine.slots.map(s => ( 
                            <SlotCard key={s.id} slot={s} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InspectMachine