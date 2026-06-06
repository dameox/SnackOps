import Sidebar from '../components/Sidebar';
import StatComponent from '../components/StatComponent';
import TopProducts from '../components/TopProducts.jsx';
import '../stylesheets/logsSheet.css';

function Logs(){
    return(
        <div className='layout'>
            <Sidebar/>
            <div className='content'>
                <div className='logs-title'>Analytics</div>
                <div className='stats'>
                    <StatComponent title='Total revenue' value='€1,532' />
                    <StatComponent title='Units Sold' value='1,321' footer='across all machines' />
                    <StatComponent title='Best Machine' value='FAMNIT' footer='€430 revenue this month' />
                </div>
                <div className='top-products-title'>Top selling products</div>
                <TopProducts/>
            </div>
        </div>
    );
}

export default Logs