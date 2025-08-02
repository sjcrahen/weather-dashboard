import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

function StationListing() {
    const { logout } = useAuth();
    const { navigate } = useNavigate();
    const [data, setData] = useState('');

    useEffect(() => {
        const controller = new AbortController();
        const token = localStorage.getItem('token');

        fetch('http://localhost:8080/api/admin/stations', {
            signal: controller.signal,
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.error('Error fetching protected data:', err);
            });

        return () => {
            controller.abort();
        };
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            <h1>Station Listing (Protected): {data}</h1>
            <button onClick={handleLogout}>Logout</button>
        </>
    );
}

export default StationListing;
