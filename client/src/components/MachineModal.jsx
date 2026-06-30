import { Button } from 'react-bootstrap';
import '../stylesheets/modalSheet.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function MachineModal({show, onClose, machine}){
    
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState('');
    const [userId, setUserId] = useState('');
    const [workers, setWorkers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('/api/users/workers', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => setWorkers(res.data))
            .catch(err => console.error('Failed to load workers:', err));
    }, []);

    useEffect(() => {
        if (machine) {
            setName(machine.name);
            setAddress(machine.address);
            setCoordinates(machine.coordinates);
            setUserId(machine.user_id);
        }
    }, [machine]);

    function handleSubmitAdd(e){
        e.preventDefault();
        const token = localStorage.getItem('token');
        axios.post('/api/machines',
            { name, address, coordinates, user_id: userId },
            { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                onClose();
                window.location.reload(); 
            })
            .catch(err => console.error('Failed to add machine:', err));
    }
     function handleSubmitEdit(e){
        e.preventDefault();
        const token = localStorage.getItem('token');
        axios.put(`/api/machines/${machine?.id}`,
            { name, address, coordinates, user_id: userId },
            { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                onClose();
                window.location.reload();
            })
            .catch(err => console.error('Failed to update machine:', err));
    }

    if(!show) return null;

    if(machine === null){
        return(
                <div className='overlay' onClick={onClose}>
                    <div className='box' onClick={e => e.stopPropagation()}>
                    <div className="header">
                        <div className="title">Add new machine</div>
                        <Button className='close-btn' variant='none' onClick={onClose}><i className='bi bi-x-lg'></i></Button>
                    </div>
                    <form onSubmit={handleSubmitAdd}>
                            <div className='modal-field'>
                                <label className='modal-label'>Machine name</label>
                                <input className='modal-input' type='text' value={name} onChange={e => setName(e.target.value)} required/>
                            </div>
                            <div className='modal-field'>
                                <label className='modal-label'>Address</label>
                                <input className='modal-input' type='text' value={address} onChange={e => setAddress(e.target.value)} required/>
                            </div>
                            <div className='modal-field'>
                                <label className='modal-label'>Coordinates</label>
                                <input className='modal-input' type='text' value={coordinates} onChange={e => setCoordinates(e.target.value)} required/>
                            </div>
                            <div className='modal-field'>
                                <label className='modal-label'>Assign a worker</label>
                                <select className='modal-select' value={userId} onChange={e => setUserId(e.target.value)} required>
                                    <option>Select an Item</option>
                                    {workers.map(w => (
                                        <option key={w.id} value={w.id}>{w.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='modal-footer'>
                                <button className='modal-submit-btn' type='submit'>
                                    <i className='bi bi-plus'></i> Add Machine
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        } else {
             return(
                <div className='overlay' onClick={onClose}>
                    <div className='box' onClick={e => e.stopPropagation()}>
                    <div className="header">
                        <div className="title">Edit</div>
                        <Button className='close-btn' variant='none' onClick={onClose}><i className='bi bi-x-lg'></i></Button>
                    </div>
                    <form onSubmit={handleSubmitEdit}>
                            <div className='modal-field'>
                                <label className='modal-label'>Machine name</label>
                                <input className='modal-input' type='text' value={name} onChange={e => setName(e.target.value)} required/>
                            </div>
                            <div className='modal-field'>
                                <label className='modal-label'>Address</label>
                                <input className='modal-input' type='text' value={address} onChange={e => setAddress(e.target.value)} required/>
                            </div>
                            <div className='modal-field'>
                                <label className='modal-label'>Coordinates</label>
                                <input className='modal-input' type='text' value={coordinates} onChange={e => setCoordinates(e.target.value)}/>
                            </div>
                            <div className='modal-field'>
                                <label className='modal-label'>Assign a worker</label>
                                <select className='modal-select'value={userId} onChange={e => setUserId(e.target.value)} required>
                                    <option value=''>Select an Item</option>
                                    {workers.map(w => (
                                        <option key={w.id} value={w.id}>{w.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='modal-footer'>
                                <button className='modal-submit-btn' type='submit' >
                                    <i className='bi bi-plus'></i> Edit Machine
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
    
}



export default MachineModal