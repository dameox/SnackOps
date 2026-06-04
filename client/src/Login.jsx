import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../AuthContext.jsx';
import './stylesheets/LoginSheet.css';
import axios from 'axios';

import Button from 'react-bootstrap/Button';

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

    return(<div className='login-page d-flex flex-column align-items-center justify-content-center min-vh-100'>
        <div className='heading mb-4'>
            <h1 className='heading-text'>SnackOps</h1>
            <h3 className='heading-subtitle'>Vending Machine Fleet Management System</h3>
        </div>
        <div className='login-card p-4 p-md-5'>
            <h4 className='login-title py-2 px-3 mb-3'>Sign in to your account</h4>
            {failattempt && <p className='alert alert-danger'>Login failed. Please check your credentials and try again.</p>}
            <form className='login-form' onSubmit={handleSubmit}>
                <div className='form-card mb-3'>
                    <label className='login-label'>Email Address</label>
                    <input className='login-input' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required
                     placeholder='example@snackops.com' />
                </div>
                <div className='form-card mb-2'>
                    <label className='login-label'>Password</label>
                    <input className='login-input' type='password' value={password} onChange={(e) => setPassword(e.target.value)} 
                    placeholder='***********' required />
                </div>
                <p className='login-footer mb-4'>Forgot your password? Contact your admin.</p>
                <button className='login-btn w-100' type='submit' >Log in</button>
            </form>
        </div>
    </div>);
}

 export default Login;   