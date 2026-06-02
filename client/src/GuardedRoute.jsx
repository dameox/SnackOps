import {Navigate} from 'react-router-dom';
import {useAuth} from '../AuthContext.jsx';

function GuardedRoute({children}) {
    const {token} = useAuth();

    if(!token) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default GuardedRoute;