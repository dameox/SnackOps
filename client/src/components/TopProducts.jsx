import '../stylesheets/machineSheet.css';

const mockProducts = [
    {rank: 1, name: 'Coca-Cola 330ml',     revenue: '€332'},
    {rank: 2, name: 'Monster Energy 0.5l', revenue: '€232'},
    {rank: 3, name: 'Lays Original 150g',  revenue: '€164'},
    {rank: 4, name: 'Orbit Lemon Fresh',   revenue: '€90'},
];

function TopProducts() {
    return(
        <div className='machines-content'>
            <table className='machine-table'>
                <thead>
                    <tr className='machine-table-head'>
                        <th>#</th>
                        <th>Product</th>
                        <th>Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    {mockProducts.map(p => (
                        <tr key={p.rank} className='machine-row'>
                            <td className='machine-row-address'>{p.rank}</td>
                            <td className='machine-row-name'>{p.name}</td>
                            <td className='machine-row-address'>{p.revenue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TopProducts