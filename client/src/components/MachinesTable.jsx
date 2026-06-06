import MachineRow from './MachineRow';

const mockMachines = [
    {id: 1, name: 'FAMNIT',    address: 'Example address 1, Koper', stock: 'Low',    lastRestock: 'May 20'},
    {id: 2, name: 'Pošta 1',   address: 'Example address 1, Koper', stock: 'Medium', lastRestock: 'May 12'},
    {id: 3, name: 'Pošta 2',   address: 'Example address 1, Koper', stock: 'Low',    lastRestock: 'April 28'},
    {id: 4, name: 'FHŠ 1',     address: 'Example address 1, Koper', stock: 'Medium', lastRestock: 'May 22'},
    {id: 5, name: 'PEF',       address: 'Example address 1, Koper', stock: 'High',   lastRestock: 'May 15'},
    {id: 6, name: 'Titov Trg', address: 'Example address 1, Koper', stock: 'Medium', lastRestock: 'May 20'},
    {id: 7, name: 'FM 1',      address: 'Example address 1, Koper', stock: 'Medium', lastRestock: 'May 21'},
    {id: 8, name: 'FM 2',      address: 'Example address 1, Koper', stock: 'High',   lastRestock: 'May 12'},
];

function MachineTable() {
    return(
            <table className='machine-table'>
                <thead>
                    <tr className='machine-table-head'>
                        <th>Machine</th>
                        <th>Address</th>
                        <th>Stock Level</th>
                        <th>Last Restock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {mockMachines.map(m => (
                        <MachineRow key={m.id} machine={m} />
                    ))}
                </tbody>
            </table>
    );
}

export default MachineTable