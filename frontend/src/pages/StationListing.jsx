import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function StationListing() {
    const { logout } = useAuth();
    const { navigate } = useNavigate();
    const [data, setData] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/api/admin/stations', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching protected data:', error);
            }
        };
        fetchData();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <>
            <h1>Station Listing (Protected): {data}</h1>
            <button onClick={handleLogout}>Logout</button>
        </>
    );
}

export default StationListing;
