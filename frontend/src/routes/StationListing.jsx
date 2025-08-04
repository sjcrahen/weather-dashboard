import { useEffect, useState } from 'react';
import MainContent from '../components/MainContent.jsx';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Layout from '../components/Layout.jsx';

function StationListing() {
    const navigate = useNavigate();
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const token = localStorage.getItem('token');

        setLoading(true);
        setError(null);

        fetch('http://localhost:8080/api/admin/stations', {
            signal: controller.signal,
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch stations.');
                return response.json();
            })
            .then(json => {
                if (Array.isArray(json)) {
                    setData(json);
                    setError(null);
                } else {
                    throw new Error('Invalid data format received.');
                }
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                    setData(null);
                }
            })
            .finally(() => setLoading(false));

        return () => {
            controller.abort();
        };
    }, []);

    const editStation = e => {
        navigate(`/admin/stations/${e.currentTarget.dataset.slug}`);
    };

    const renderedDataRows = Array.isArray(data)
        ? data.map(station => (
              <button
                  key={station.id}
                  onClick={editStation}
                  className={'card table row grid grid-cols-6 items-center justify-items-start hover:outline duration-300'}
                  data-title={'Click to edit'}
                  data-slug={station.slug}
              >
                  <span>{station.name}</span>
                  <span>{station.slug}</span>
                  <span>{station.city}</span>
                  <span>{station.state}</span>
                  <span>{station.latitude}</span>
                  <span>{station.longitude}</span>
              </button>
          ))
        : null;

    return (
        <Layout>
            <Header label={'Stations'} />
            {loading && <p className={'loading'}>Loading...</p>}
            {error && <p className={'error'}>Error: {error}</p>}
            {!loading && !error && data.length && (
                <MainContent>
                    <div className={'flex flex-col gap-y-1'}>
                        <div className={'card table head grid grid-cols-6 font-bold text-lg'}>
                            <span>Name</span>
                            <span>Slug</span>
                            <span>City</span>
                            <span>State</span>
                            <span>Lat</span>
                            <span>Long</span>
                        </div>
                        {renderedDataRows}
                    </div>
                </MainContent>
            )}
            {!loading && !error && data.length === 0 && <p>No stations found.</p>}
        </Layout>
    );
}

export default StationListing;
