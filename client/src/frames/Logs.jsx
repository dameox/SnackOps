import Sidebar from '../components/Sidebar';
import StatComponent from '../components/StatComponent';
import TopProducts from '../components/TopProducts.jsx';
import '../stylesheets/logsSheet.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


function Logs(){
    const [data, setData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('/api/products/analytics', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => setData(res.data))
            .catch(err => console.error('Failed to load analytics:', err));
    }, []);

    if (!data) return null;
    return(
        <div className='layout'>
            <Sidebar/>
            <div className='content'>
                <div className='logs-title'>Analytics</div>
                <div className='stats'>
                    <StatComponent title='Total revenue' value={`€${Number(data.totalRevenue).toLocaleString()}`}/>
                    <StatComponent title='Units Sold' value={Number(data.unitsSold).toLocaleString()} footer='across all machines' />
                    <StatComponent title='Best Machine' value={data.bestMachine ? data.bestMachine.name : '-'} 
                    footer={data.bestMachine ? `€${Number(data.bestMachine.revenue).toLocaleString()} total revenue` : ''}/>
                </div>
                <div className='top-products-title'>Top selling products</div>
                <TopProducts products={data.topProducts}/>
            </div>
        </div>
    );
}

export default Logs