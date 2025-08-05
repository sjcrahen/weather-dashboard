import { useNavigate, useParams } from 'react-router-dom';
import MainContent from '../../components/MainContent.jsx';
import Header from '../../components/Header.jsx';
import Layout from '../../components/Layout.jsx';
import useFetch from '../../hooks/useFetch.jsx';
import { useEffect, useMemo, useState } from 'react';

function EditStation() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [form, setForm] = useState({
        name: '',
        slug: '',
        city: '',
        state: '',
        latitude: '',
        longitude: '',
    });
    const token = localStorage.getItem('token');

    const options = useMemo(() => ({ headers: { Authorization: `Bearer ${token}` } }), [token]);
    const { data, loading, error } = useFetch(`http://localhost:8080/api/admin/stations/${slug}`, options);

    useEffect(() => {
        if (data)
            setForm({
                name: data.name || '',
                slug: data.slug || '',
                city: data.city || '',
                state: data.state || '',
                latitude: data.latitude || '',
                longitude: data.longitude || '',
            });
    }, [data]);

    const handleFieldInput = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const navigateToStationList = () => navigate('/admin/stations');

    const submitForm = e => {
        console.log('submit');
    };

    return (
        <Layout>
            <Header label={'Edit Station'} />
            {data && (
                <MainContent loading={loading} error={error}>
                    <form onSubmit={submitForm} className={'flex flex-row gap-x-4 h-full'}>
                        <div className={'card flex flex-col gap-y-4 flex-1'}>
                            <div className={'form-control flex flex-col'}>
                                <label className={'mb-1'} htmlFor="name-input">
                                    Name
                                </label>
                                <input id="name-input" type="text" name="name" value={form.name} onInput={handleFieldInput} />
                            </div>
                            <div className={'form-control flex flex-col'}>
                                <label htmlFor="slug-input">Slug</label>
                                <input id="slug-input" type="text" name="slug" value={form.slug} onInput={handleFieldInput} />
                            </div>
                            <div className={'flex flex-row gap-x-4'}>
                                <div className={'form-control flex flex-col flex-1'}>
                                    <label htmlFor="city-input">City</label>
                                    <input id="city-input" type="text" name="city" value={form.city} onInput={handleFieldInput} />
                                </div>
                                <div className={'form-control flex flex-col flex-1'}>
                                    <label htmlFor="state-input">State</label>
                                    <input id="state-input" type="text" name="state" value={form.state} onInput={handleFieldInput} />
                                </div>
                            </div>
                            <div className={'flex flex-row gap-x-4'}>
                                <div className={'form-control flex flex-col flex-1'}>
                                    <label htmlFor="latitude-input">Latitude</label>
                                    <input id="latitude-input" type="text" name="latitude" value={form.latitude} onInput={handleFieldInput} />
                                </div>
                                <div className={'form-control flex flex-col flex-1'}>
                                    <label htmlFor="longitude-input">Longitude</label>
                                    <input id="longitude-input" type="text" name="longitude" value={form.longitude} onInput={handleFieldInput} />
                                </div>
                            </div>
                            <div className={'mt-auto flex flex-row justify-end gap-x-4'}>
                                <button type="button" className={'font-medium'} onClick={navigateToStationList}>
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
        </Layout>
    );
}

export default EditStation;
