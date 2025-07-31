import { useEffect, useState } from 'react';
import axios from 'axios';

function StationListing() {
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

    return <h1>Station Listing (Protected): {data}</h1>;
}

export default StationListing;
