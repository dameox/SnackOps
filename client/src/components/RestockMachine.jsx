import SlotItem from './SlotItem';
import { useState } from 'react';

function RestockMachine({ id, order, name , slots, showDoneBtn, onComplete}){
    let [markDone, setMarkDone] = useState(false);
    let [fading, setFading] = useState(false);


    return(
        <div className={`restock-machine ${markDone ? 'card-completing':''} ${fading ? 'card-fading' : ''}`}>
            <div className='restock-machine-header'>
                <div className='restock-machine-index'>{order}</div>
                <div className='restock-machine-name'>{name}</div>
                {showDoneBtn && (
                    <button className={`show-done-btn ${markDone ? 'btn-done' : ''}`} onClick={() => {
                        setMarkDone(true);
                        setTimeout(() => setFading(true), 300);
                        setTimeout(() => onComplete(id), 700);
                        }}>
                        <i className='bi bi-check2'></i>
                         {markDone ? 'Done' : 'Mark Stop Done'}
                    </button>
                )}
            </div>
            <div className='restock-machine-slots'>
                {slots.map(s => (
                    <SlotItem key={s.id} id={s.id} code={s.slot_code} product={s.product_name} units={s.qty_to_fill}/>
                ))}
            </div>
        </div>
    );
}

export default RestockMachine