import Sidebar from '../components/Sidebar';
import RestockMachine from '../components/restockMachine';
import '../stylesheets/restockSheet.css';

const mockMachines = [
    {
        id: 1, order: 91, name: 'FAMNIT',
        slots: [
            {id: 1, code: 'A2', product: 'Argeta',   units: 6},
            {id: 2, code: 'A3', product: 'Pringles', units: 2},
            {id: 3, code: 'A4', product: 'Lays',     units: 4},
            {id: 4, code: 'B2', product: 'Sola',     units: 3},
        ]
    },
    {
        id: 2, order: 90, name: 'Pošta 1',
        slots: [
            {id: 1, code: 'A2', product: 'Argeta',   units: 6},
            {id: 2, code: 'A3', product: 'Pringles', units: 2},
            {id: 3, code: 'A4', product: 'Lays',     units: 6},
            {id: 4, code: 'B2', product: 'Sola',     units: 3},
        ]
    },
    {
        id: 3, order: 20, name: 'FHŠ',
        slots: [
            {id: 1, code: 'A2', product: 'Argeta',   units: 6},
            {id: 2, code: 'A3', product: 'Pringles', units: 2},
            {id: 3, code: 'A4', product: 'Lays',     units: 4},
            {id: 4, code: 'B2', product: 'Sola',     units: 3},
        ]
    },
];


function WorkerDashboard(){
    return(
        <div className='layout'>
            <Sidebar/>
            <div className='content'>
            <div className='restock-machines'>
                    {mockMachines.map(m => (
                        <RestockMachine key={m.id} id={m.id} order={m.order} name={m.name} slots={m.slots} showDoneBtn={true}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WorkerDashboard