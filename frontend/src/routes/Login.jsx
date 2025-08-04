import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import { FaCircleUser } from 'react-icons/fa6';
import MainContent from '../components/MainContent.jsx';
import Layout from '../components/Layout.jsx';
import Header from '../components/Header.jsx';

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState({ username: '', password: '' });

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
        <Layout>
            <Header label={''} />
            <MainContent>
                <form onSubmit={handleLogin} className={'flex items-center justify-center h-screen'}>
                    <div className={'card flex-col items-center gap-y-7'}>
                        <FaCircleUser className={'size-20 c-card-1'} />
                        <div className={'relative'}>
                            <input className={'pr-10'} type="text" value={loginForm.username} onChange={handleUsernameChange} placeholder="Username" />
                            <FaUser className={'size-5 absolute top-3 right-3'} />
                        </div>
                        <div className={'relative'}>
                            <input className={'pr-10'} type="password" value={loginForm.password} onChange={handlePasswordChange} placeholder="Password" />
                            <FaLock className={'size-5 absolute top-3 right-3'} />
                        </div>
                        <button type="submit">Log In</button>
                    </div>
                </form>
            </MainContent>
        </Layout>
    );
}

export default Login;
