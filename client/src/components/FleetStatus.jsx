import MachineCard from './MachineCard';

const mockMachines = [
    {id: 1, name: 'FAMNIT',   stock: 80},
    {id: 2, name: 'Pošta 1',  stock: 29},
    {id: 3, name: 'FAMNIT 2', stock: 52},
    {id: 4, name: 'FHŠ',      stock: 10},
];

function FleetStatus() {
    return (
        <div className='fleet-grid'>
            {mockMachines.map(m => (
                <MachineCard key={m.id} name={m.name} stock={m.stock} />
            ))}
        </div>
    );
}

export default FleetStatus