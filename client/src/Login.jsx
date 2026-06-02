import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../AuthContext.jsx';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuth();
    const navigate = useNavigate();
    const [failattempt, setFailAttempt] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://88.200.63.148:3000/api/auth/login',{
                email,
                password
            });
            login(response.data.token, response.data.user);

            if (response.data.user.role === 'owner') {
                navigate('/dashboard');
            } else {
                navigate('/worker');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setFailAttempt(true);
            alert('Login failed. Please check your credentials and try again.');
        }
        
    };

    return(<div>
        <h1>SnackOps</h1>
        {failattempt && <p style={{color: 'red'}}>Login failed. Please check your credentials and try again.</p>}
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Password:</label>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type='submit'>Login</button>
        </form>
    </div>);
}

 export default Login;   