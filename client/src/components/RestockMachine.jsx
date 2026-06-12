import SlotItem from './SlotItem';

function RestockMachine({ id, order, name , slots, showDoneBtn}){
    const mockSlots = slots;


    return(
        <div className='restock-machine'>
            <div className='restock-machine-header'>
                <div className='restock-machine-index'>{order}</div>
                <div className='restock-machine-name'>{name}</div>
                {showDoneBtn && (
                    <button className='show-done-btn'>
                        <i className='bi bi-check2'></i> Mark Stop Done
                    </button>
                )}
            </div>
            <div className='restock-machine-slots'>
                {mockSlots.map(s => (
                    <SlotItem key={s.id} id={s.id} code={s.code} product={s.product} units={s.units}/>
                ))}
            </div>
        </div>
    );
}

export default RestockMachine