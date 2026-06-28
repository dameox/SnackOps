import MachineCard from './MachineCard';

function FleetStatus({ machines }) {
    return (
        <div className='fleet-grid'>
            {machines.map(m => (
                <MachineCard key={m.id} name={m.name} stock={m.stock} />
            ))}
        </div>
    );
}

export default FleetStatus