import Sidebar from '../components/Sidebar';
import RestockMachine from '../components/RestockMachine';
import '../stylesheets/restockSheet.css';
import { useState } from 'react';

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


function RestockPlan(){
    const [showBanner, setShowBanner] = useState(false);
    const date = new Date().toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric'});

    return(
        <div className='layout'>
            <Sidebar/>
            <div className='content'>
                <div className='restock-header'>
                    <div className='restock-title'>Restock Plan</div>
                    <button className='add-btn'onClick={() => setShowBanner(true)}>
                        <i className='bi bi-arrow-clockwise'></i> Generate New Plan
                    </button>
                </div>
                {showBanner && (
                    <div className='restock-plan-banner'>
                        <div>
                            <div className='restock-plan-date'>Plan generated - {date}</div>
                            <div className='restock-plan-sub'>3 machines to refill</div>
                        </div>
                    </div>
                )}
                <div className='restock-machines'>
                    {mockMachines.map(m => (
                        <RestockMachine key={m.id} id={m.id} order={m.order} name={m.name} slots={m.slots}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RestockPlan