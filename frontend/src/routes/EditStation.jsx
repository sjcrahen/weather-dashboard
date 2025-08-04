import { useParams } from 'react-router-dom';
import MainContent from '../components/MainContent.jsx';
import { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import Layout from '../components/Layout.jsx';

function EditStation() {
    const { slug } = useParams();
    const [station, setStation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const token = localStorage.getItem('token');

        setLoading(true);
        setError(null);

        fetch(`http://localhost:8080/api/admin/stations/${slug}`, {
            signal: controller.signal,
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch stations.');
                return response.json();
            })
            .then(json => {
                if (json) {
                    setStation(json);
                    setError(null);
                } else {
                    throw new Error('Invalid data format received.');
                }
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                    setStation(null);
                }
            })
            .finally(() => setLoading(false));

        return () => {
            controller.abort();
        };
    }, []);

    const submitForm = e => {
        console.log('submit');
    };

    return (
        <Layout>
            <Header label={'Edit Station'} />
            {loading && <p className={'loading'}>Loading...</p>}
            {error && <p className={'error'}>Error: {error}</p>}
            {!loading && !error && station && (
                <MainContent>
                    <form onSubmit={submitForm} className={'flex flex-row gap-x-4 h-full'}>
                        <div className={'card flex flex-col gap-y-4 flex-1'}>
                            <div className={'form-control flex flex-col'}>
                                <label className={'mb-1'} htmlFor="name-input">
                                    Name
                                </label>
                                <input id="name-input" type="text" name="name" value={station.name} />
                            </div>
                            <div className={'form-control flex flex-col'}>
                                <label htmlFor="slug-input">Slug</label>
                                <input id="slug-input" type="text" name="slug" value={station.slug} />
                            </div>
                            <div className={'flex flex-row gap-x-4'}>
                                <div className={'form-control flex flex-col flex-1'}>
                                    <label htmlFor="city-input">City</label>
                                    <input id="city-input" type="text" name="city" value={station.city} />
                                </div>
                                <div className={'form-control flex flex-col flex-1'}>
                                    <label htmlFor="state-input">State</label>
                                    <input id="state-input" type="text" name="state" value={station.state} />
                                </div>
                            </div>
                            <div className={'flex flex-row gap-x-4'}>
                                <div className={'form-control flex flex-col flex-1'}>
                                    <label htmlFor="latitude-input">Latitude</label>
                                    <input id="latitude-input" type="text" name="latitude" value={station.latitude} />
                                </div>
                                <div className={'form-control flex flex-col flex-1'}>
                                    <label htmlFor="longitude-input">Longitude</label>
                                    <input id="longitude-input" type="text" name="longitude" value={station.longitude} />
                                </div>
                            </div>
                            <div className={'mt-auto flex flex-row justify-end gap-x-4'}>
                                <button type="cancel" className={'font-medium'}>
                                    Cancel
                                </button>
                                <button type="submit" className={'font-medium'}>
                                    Save
                                </button>
                            </div>
                        </div>
                        <div className={'card w-1/2 flex flex-col gap-y-4 flex1'}></div>
                    </form>
                </MainContent>
            )}
            {!loading && !error && !station && <p>No stations found.</p>}
        </Layout>
    );
}

export default EditStation;
