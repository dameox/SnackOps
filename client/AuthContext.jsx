import {createContext, useState, useContext} from 'react';

const AuthContext = createContext();

export function AuthProvider({children}) {
    
   // const [token, setToken] =useState(localStorage.getItem('token'));
   // const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

   //HARDCODED USER AND TOKEN SO I DONT HAVE TO START UP THE SERVER ALL THE TIME WHEN MAKING FRONT_END
    const [token, setToken] = useState('fake-token');
    const [user, setUser] = useState({name: 'Admin Owner', email: 'owner@snackops.com', role: 'owner'});

    const login = (token, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setToken(token);
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{token, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}