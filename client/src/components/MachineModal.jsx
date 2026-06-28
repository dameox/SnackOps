import { Button } from 'react-bootstrap';
import '../stylesheets/modalSheet.css';


function MachineModal({show, onClose, machine}){
    
    function handleSubmitAdd(e){
        e.preventDefault();
        onClose();
        console.log('submitted');
    }
     function handleSubmitEdit(e){
        e.preventDefault();
        onClose();
        console.log('submitted');
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
                                <input className='modal-input' type='text' placeholder=''/>
                            </div>
                            <div className='modal-field'>
                                <label className='modal-label'>Address</label>
                                <input className='modal-input' type='text' placeholder=''/>
                            </div>
                            <div className='modal-field'>
                                <label className='modal-label'>Coordinates</label>
                                <input className='modal-input' type='text' placeholder=''/>
                            </div>
                            <div className='modal-field'>
                                <label className='modal-label'>Assign a worker</label>
                                <select className='modal-select'>
                                    <option value=''>Select an Item</option>
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
                                <input className='modal-input' type='text' placeholder=''/>
                            </div>
                            <div className='modal-field'>
                                <label className='modal-label'>Address</label>
                                <input className='modal-input' type='text' placeholder=''/>
                            </div>
                            <div className='modal-field'>
                                <label className='modal-label'>Coordinates</label>
                                <input className='modal-input' type='text' placeholder=''/>
                            </div>
                            <div className='modal-field'>
                                <label className='modal-label'>Assign a worker</label>
                                <select className='modal-select'>
                                    <option value=''>Select an Item</option>
                                </select>
                            </div>
                            <div className='modal-footer'>
                                <button className='modal-submit-btn' type='submit'>
                                    <i className='bi bi-plus'></i> Edit Machine
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
    
}



export default MachineModal;