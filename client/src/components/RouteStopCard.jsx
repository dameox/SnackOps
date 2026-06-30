function RouteStopCard({stop}){
    return(
        <div className='route-stop-card'>
            <div className='route-stop-name'>{stop.machine_name}</div>
            <div className='route-stop-address'>{stop.address}</div>
            <div className='route-stop-info'>
                <span>{stop.items.length} slots</span>
            </div>
        </div>
    );
}

export default RouteStopCard