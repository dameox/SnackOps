

function SlotItem({ id, code, product, units }){
    return(
        <div className='slot-item'>
            <div className='slot-item-name'>{code}- {product}</div>
            <div className='slot-item-units'>{units} units needed</div>
        </div>
    );
}

export default SlotItem