import { Button } from 'react-bootstrap';
import '../stylesheets/modalSheet.css';


function WorkersModal({show, onClose}){
    
    function handleSubmit(e){
        e.preventDefault();
        onClose();
        console.log('submitted');
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
                                <input className='modal-input' type='text' placeholder=''/>
                            </div>
                            <div className='modal-field'>
                                <label className='modal-label'>Email address</label>
                                <input className='modal-input' type='text' placeholder=''/>
                            </div>
                            <div className='modal-field'>
                                <label className='modal-label'>Password</label>
                                <input className='modal-input' type='text' placeholder=''/>
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