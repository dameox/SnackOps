import WorkerRow from './WorkerRow';

const mockWorkers = [
    {id: 1, name: 'John',    email: 'example@email.com'},
    {id: 2, name: 'James',   email: 'example@email.com'},
    {id: 3, name: 'Jack',    email: 'example@email.com'},
    {id: 4, name: 'Jill',    email: 'example@email.com'},
    {id: 5, name: 'Jade',    email: 'example@email.com'},
    {id: 6, name: 'Jeffery', email: 'example@email.com'},
    {id: 7, name: 'Jojo',    email: 'example@email.com'},
    {id: 8, name: 'Jamall',  email: 'example@email.com'},
];

function WorkersTable() {
    return(
        <div className='machine-table-wrapper'>
            <table className='machine-table'>
                <thead>
                    <tr className='machine-table-head'>
                        <th>Worker</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {mockWorkers.map(w => (
                        <WorkerRow key={w.id} worker={w} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default WorkersTable