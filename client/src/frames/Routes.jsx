import Sidebar from '../components/Sidebar';
import RouteStopCard from '../components/RouteStopCard';
import '../stylesheets/routesSheet.css';

const mockRoute = {
    date: '15 May, 2026',
    stops: [
        {id: 1, name: 'Pošta 1', address: 'Kolodvorska cesta 9', slots: 4, distance: '1,5km'},
        {id: 2, name: 'FAMNIT',  address: 'Glagoljaška ulica 8', slots: 4, distance: '+1,2km'},
        {id: 3, name: 'FHŠ',     address: 'Titov trg 5',         slots: 4, distance: '+0,2km'},
    ],
    total: '2,9km',
    time: '35 minutes'
};

function Routes_(){
    return(
        <div className='layout'>
            <Sidebar/>
            <div className='content'>
                <div className='routes-header'>
                    <div className='routes-title'>Route - {mockRoute.date}</div>
                    <div className='routes-actions'>
                        <select className='driver-select'>
                            <option>Select a driver</option>
                        </select>
                        <button className='add-btn'>
                            <i className='bi bi-person-check'></i> Assign Route
                        </button>
                    </div>
                </div>
                <div className='routes-body'>
                    <div className='routes-map-placeholder'></div>
                    <div className='routes-panel'>
                        <div className='routes-stops-title'>Route Stops ({mockRoute.stops.length})</div>
                        <div className='routes-stops'>
                            {mockRoute.stops.map(s => (
                                <RouteStopCard key={s.id} stop={s}/>
                            ))}
                        </div>
                        <div className='routes-summary'>
                            <div className='routes-summary-row'>
                                <span>Total: {mockRoute.total}</span>
                                <span>Time: {mockRoute.time}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Routes_