
function SlotCard({slot}){
    return(
    <div className="slot-card">
        <div className="slot-card-header">
            <div className="slot-card-code">{slot.slot_code}</div>
            <div className={`slot-card-status ${slot.status}`}>{slot.status}</div>
        </div>
        <div className="slot-card-name">{slot.product_name}</div>
        <div className="slot-card-qty">
            {slot.current_qty}/{slot.max_capacity}
        </div>
    </div>);
}

export default SlotCard;