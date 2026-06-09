function RouteStopCard({stop}){
    return(
        <div className='route-stop-card'>
            <div className='route-stop-name'>{stop.name}</div>
            <div className='route-stop-address'>{stop.address}</div>
            <div className='route-stop-info'>
                <span>{stop.slots} slots</span>
                <span>{stop.distance}</span>
            </div>
        </div>
    );
}

export default RouteStopCard