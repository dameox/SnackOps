import { Button } from 'react-bootstrap';
import '../stylesheets/modalSheet.css';
import { useState } from 'react';
import axios from 'axios';

function WorkersModal({show, onClose}){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    function handleSubmit(e){
        e.preventDefault();
        const token = localStorage.getItem('token');
        axios.post('api/users/workers',
            { name, email, password },
            { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                console.log('submitted');
                onClose();
                window.location.reload();
            })
            .catch(err => console.error('Failed to add worker:', err));
   
    }
    if(!show) return null;

        return(
                <div className='overlay' onClick={onClose}>
                    <div className='box' onClick={e => e.stopPropagation()}>
                    <div className="header">
                        <div className="title">Add a new worker</div>
                        <Button className='close-btn' variant='none' onClick={onClose}><i className='bi bi-x-lg'></i></Button>
                    </div>
                    <form onSubmit={handleSubmit}>
                            <div className='modal-field'>
                                <label className='modal-label'>Name</label>
                                <input className='modal-input' type='text' value={name} onChange={e => setName(e.target.value)} required/>
                            </div>
                            <div className='modal-field'>
                                <label className='modal-label'>Email address</label>
                                <input className='modal-input' type='text' value={email} onChange={e => setEmail(e.target.value)} required/>
                            </div>
                            <div className='modal-field'>
                                <label className='modal-label'>Password</label>
                                <input className='modal-input' type='text' value={password} onChange={e => setPassword(e.target.value)} required/>
                            </div>
                            <div className='modal-footer'>
                                <button className='modal-submit-btn' type='submit'>
                                    <i className='bi bi-plus'></i> Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            );
    
}



export default WorkersModal;