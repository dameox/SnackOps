

function StatComponent({title, value, footer, icon, color}) {
    return (
    <div className="stat-comp">
        <div className="stat-title">{title}</div>
        <i className={`bi ${icon} stat-icon`} style={{color: color}}></i>
        <div className="stat-num">{value}</div>
        {footer && <div className="stat-footer">{footer}</div>}
    </div>
    );
}

export default StatComponent;