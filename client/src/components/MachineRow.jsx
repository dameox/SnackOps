import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router";

function MachineRow({machine, onDelete}) {
    const navigate = useNavigate();

    let stockColor;
    if(machine.stock > 60 ){
        stockColor = '#28a745';
    }
    else if(machine.stock > 30 ){
        stockColor = '#f0a500';
    }
    else{
        stockColor = '#dc3545';
    }

    return(
        <tr className='machine-row'>
            <td className='machine-row-name'>{machine.name}</td>
            <td className='machine-row-address'>{machine.address}</td>
            <td>
                <span className='machine-row-stock' style={{color: stockColor}}>{machine.stock}%</span>
            </td>
            <td className='machine-row-actions'>
                <Button className='machine-row-btn-delete' variant='none' onClick={() => onDelete(machine.id)}><i className='bi bi-trash'></i></Button>
                <Button className='machine-row-btn-view' variant='none' onClick={() => navigate(`/machines/${machine.id}`)}><i className='bi bi-eye'></i></Button>
            </td>
        </tr>
    );
}

export default MachineRow