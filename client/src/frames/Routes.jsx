import Sidebar from '../components/Sidebar';
import RouteStopCard from '../components/RouteStopCard';
import '../stylesheets/routesSheet.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

//leaflet map
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});


function Routes_(){
    const [route, setRoute] = useState(null);
    const [workers, setWorkers] = useState([]);
    const [driverId, setDriverId] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get('/api/users/workers', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => setWorkers(res.data))
            .catch(err => console.error('Failed to load workers:', err));

        
        axios.get('/api/routes', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                if (res.data.length === 0) return;
                const newest = res.data.sort((a, b) => b.id - a.id)[0];
                return axios.get(`/api/routes/${newest.id}`, { headers: { Authorization: `Bearer ${token}` } })
                    .then(r => {
                        setRoute(r.data);
                        if (r.data.user_id) setDriverId(r.data.user_id);
                    });
            })
            .catch(err => console.error('Failed to load route:', err));
    }, []);

    function parseCoords(coordString){
        const [lat, lng] = coordString.split(',').map(Number);
        return [lat, lng];
    }

    function assignDriver(){
        const token = localStorage.getItem('token');
        axios.patch(`/api/routes/${route?.id}/assign`,
            { user_id: driverId }, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => alert('Driver assigned'))
            .catch(err => console.error('Failed to assign driver:', err));
    }
    
    if (!route) {
        return (
            <div className='layout'>
                <Sidebar/>
                <div className='content'>
                    <div className='routes-header'>
                        <div className='routes-title'>Route</div>
                    </div>
                    <div className='routes-title'>No Routes, generate a plan first.</div>
                </div>
            </div>
        );
    }

    let routeDateFormatted = new Date(route.route_date_on).toLocaleDateString('en-GB', {day:'numeric', month:'long', year:'numeric'});

    return (
        <div className='layout'>
            <Sidebar/>
            <div className='content'>
                <div className='routes-header'>
                    <div className='routes-title'>Route - {routeDateFormatted}</div>
                    <div className='routes-actions'>
                        <select className='driver-select' value={driverId} onChange={e => setDriverId(e.target.value)}>
                            <option value=''>Select a driver</option>
                            {workers.map(w => (
                                <option key={w.id} value={w.id}>{w.name}</option>
                            ))}
                        </select>
                        <button className='add-btn' onClick={assignDriver}>
                            <i className='bi bi-person-check'></i> Assign Route
                        </button>
                    </div>
                </div>
                <div className='routes-body'>
                    <MapContainer center={parseCoords(route.stops[0].coordinates)} zoom={13} className='routes-map-placeholder'>
                        <TileLayer
                            attribution='&copy; OpenStreetMap contributors'
                            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        />
                        {route.stops.map(stop => (
                            <Marker key={stop.id} position={parseCoords(stop.coordinates)}>
                                <Popup>{stop.machine_name}</Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                    <div className='routes-panel'>
                        <div className='routes-stops-title'>Route Stops ({route.stops.length})</div>
                        <div className='routes-stops'>
                            {route.stops.map(s => (
                                <RouteStopCard key={s.id} stop={s}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Routes_