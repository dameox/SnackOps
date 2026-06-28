import { Button } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import '../stylesheets/machineSheet.css';
import StatComponent from '../components/StatComponent.jsx';
import { useParams } from 'react-router-dom';
import SlotCard from '../components/SlotCard.jsx';
import '../stylesheets/inspectSheet.css';
import MachineModal from '../components/MachineModal.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';

function InspectMachine(){
    let [showModal, setShowModal] = useState(false);
    const [machine, setMachine] = useState(null);
 
    const {id} = useParams();
    console.log(id);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`/api/machines/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => setMachine(res.data))
            .catch(err => console.error('Failed to load machine:', err));
    }, [id]);

    if (!machine) return null;
    const slots = machine.slots;
    const goodSlots = slots.filter(s => s.status === 'Good').length;
    const lowSlots = slots.filter(s => s.status === 'Low').length;
    const criticalSlots = slots.filter(s => s.status === 'Critical').length; 

    return(
         <div className='layout'>
            <Sidebar/>
            <div className='content'>
                <div className='inspect-header'>
                    <div className='inspect-header-left'>
                        <div className='inspect-title'>{machine.name}</div>
                        <div className='inspect-address'>{machine.address}</div>
                    </div>
                    <button className='add-btn' onClick={() => setShowModal(true)}>
                        <i className='bi bi-arrow-clockwise'></i> Edit Machine
                    </button>
                    <MachineModal show={showModal} onClose={() => setShowModal(false)} machine={machine}/>
                </div>
                <div className='slot-status'>
                    <StatComponent title={'Total slots'} value={slots.length} footer={''} color={'#ffffff'}/>
                    <StatComponent title={'Good slots'} value={goodSlots} footer={''} color={'#28a745'}/>
                    <StatComponent title={'Medium slots'} value={lowSlots} footer={''} color={'#f0a500'}/>
                    <StatComponent title={'Low slots'} value={criticalSlots} footer={''} color={'#dc3545'}/>
                </div>
                <div className='slot-inventory'>
                    <div className='slot-inventory-header'>Slot Inventory</div>
                    <div className='slot-cards'>
                        {slots.map(s => ( 
                            <SlotCard key={s.id} slot={s} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InspectMachine