import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import Card from '../components/Card.jsx';

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState({});

    const handleLogin = async e => {
        e.preventDefault();
        const success = await login(loginForm);
        if (success) {
            navigate('/admin/stations');
        } else {
            // TODO: handle failed login
            alert('Login failed');
        }
    };

    const handleUsernameChange = e => {
        setLoginForm(prev => ({
            ...prev,
            username: e.target.value,
        }));
    };

    const handlePasswordChange = e => {
        setLoginForm(prev => ({
            ...prev,
            password: e.target.value,
        }));
    };

    return (
        <form onSubmit={handleLogin} className={'flex items-center justify-center h-screen'}>
            <Card classes={'items-center gap-y-7'}>
                <FontAwesomeIcon icon={faCircleUser} className={'size-20 c-card-1'} />
                <div className={'relative'}>
                    <input className={'pr-10'} type="text" value={loginForm.username} onChange={handleUsernameChange} placeholder="Username" />
                    <FontAwesomeIcon icon={faUser} className={'size-5 absolute top-3 right-3'} />
                </div>
                <div className={'relative'}>
                    <input className={'pr-10'} type="password" value={loginForm.password} onChange={handlePasswordChange} placeholder="Password" />
                    <FontAwesomeIcon icon={faLock} className={'size-5 absolute top-3 right-3'} />
                </div>
                <button type="submit">Log In</button>
            </Card>
        </form>
    );
}

export default Login;
