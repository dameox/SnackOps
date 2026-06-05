function MachineCard({name, stock}) {

    let barColor;
    if (stock > 60){
        barColor = '#28a745';
    }    
    else if (stock > 30) { 
            barColor = '#f0a500';
            }
    else {
        barColor = '#dc3545';
    }

    const showWarning = stock <= 30;

    return (
        <div className='machine-card'>
            <div className='machine-card-header'>
                <div className='machine-card-name'>{name}</div>
                {showWarning && <i className='bi bi-exclamation-triangle machine-card-warn'></i>}
            </div>
            <div className='machine-card-stock'>Stock: {stock}%</div>
            <div className='machine-card-bar-bg'>
                <div className='machine-card-bar-fill' style={{width: `${stock}%`, background: barColor}}></div>
            </div>
        </div>
    );
}

export default MachineCard