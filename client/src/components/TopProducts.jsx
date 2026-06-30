import '../stylesheets/machineSheet.css';

function TopProducts({products = []}) {
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
                    {products.map((p,index) => (
                        <tr key={index} className='machine-row'>
                            <td className='machine-row-address'>{index + 1}</td>
                            <td className='machine-row-name'>{p.name}</td>
                            <td className='machine-row-address'>€{p.revenue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TopProducts