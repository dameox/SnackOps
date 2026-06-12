import {NavLink} from 'react-router-dom';
import {useAuth} from '../../AuthContext.jsx';
import '../stylesheets/sidebarSheet.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Sidebar(){
    const {user} = useAuth();
    const roleLabel = user.role === 'owner' ? 'Owner' : 'Worker';

    return(
        <div className='sidebar'>
            <div className='sidebar-title'>
                <div className='sidebar-title-name'>SnackOps</div>
                <div className='sidebar-title-role'>{roleLabel}</div>
            </div>
            <nav className='sidebar-nav'>
                {user.role === 'owner' ? (
                    <>
                        <NavLink to='/dashboard' className={({isActive}) => 'sidebar-nav-link' + (isActive ? ' active' : '')}>
                            <i className='bi bi-grid sidebar-icon'></i>
                            <div className='sidebar-label'>Dashboard</div>
                        </NavLink>
                        <NavLink to='/machines' className={({isActive}) => 'sidebar-nav-link' + (isActive ? ' active' : '')}>
                            <i className='bi bi-cpu sidebar-icon'></i>
                            <div className='sidebar-label'>Machines</div>
                        </NavLink>
                        <NavLink to='/restock-plan' className={({isActive}) => 'sidebar-nav-link' + (isActive ? ' active' : '')}>
                            <i className='bi bi-truck sidebar-icon'></i>
                            <div className='sidebar-label'>Restock Plan</div>
                        </NavLink>
                        <NavLink to='/routes' className={({isActive}) => 'sidebar-nav-link' + (isActive ? ' active' : '')}>
                            <i className='bi bi-map sidebar-icon'></i>
                            <div className='sidebar-label'>Routes</div>
                        </NavLink>
                        <NavLink to='/logs' className={({isActive}) => 'sidebar-nav-link' + (isActive ? ' active' : '')}>
                            <i className='bi bi-journal-text sidebar-icon'></i>
                            <div className='sidebar-label'>Logs</div>
                        </NavLink>
                        <NavLink to='/workers' className={({isActive}) => 'sidebar-nav-link' + (isActive ? ' active' : '')}>
                            <i className='bi bi-people sidebar-icon'></i>
                            <div className='sidebar-label'>Workers</div>
                        </NavLink>
                    </> ) : (
                    <>
                        <NavLink to='/worker' className={({isActive}) => 'sidebar-nav-link' + (isActive ? ' active' : '')}>
                            <i className='bi bi-box-seam sidebar-icon'></i>
                            <div className='sidebar-label'>My Routes</div>
                        </NavLink>
                        {/* <NavLink to='/worker/slots' className={({isActive}) => 'sidebar-nav-link' + (isActive ? ' active' : '')}>
                            <i className='bi bi-person-circle sidebar-icon'></i>
                            <div className='sidebar-label'>Update Inventory</div>
                        </NavLink> */}
                    </>
                )}
            </nav>
            <div className='footer'>
                <i className='bi bi-grid sidebar-icon'></i>
                <div>
                    <div className='footer-name'>{user.name}</div>
                    <div className='footer-email'>{user.email}</div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar