import { useNavigate, useParams } from 'react-router-dom';
import MainContent from '../../components/MainContent.jsx';
import Header from '../../components/Header.jsx';
import Layout from '../../components/Layout.jsx';
import useFetch from '../../hooks/useFetch.jsx';
import { useEffect, useMemo, useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';

function EditStation() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const { data, loading, error, doFetch } = useFetch();
    const [form, setForm] = useState({
        name: data?.name || '',
        slug: data?.slug || '',
        city: data?.city || '',
        state: data?.state || '',
        latitude: data?.latitude || '',
        longitude: data?.longitude || '',
        timezone: data?.timezone || '',
        dataSources: data?.dataSources || [],
    });
    const token = localStorage.getItem('token');
    const options = useMemo(() => ({ headers: { Authorization: `Bearer ${token}` } }), [token]);

    useEffect(() => {
        doFetch(`http://localhost:8080/api/admin/stations/${slug}`, options);
    }, [slug, doFetch, options]);

    useEffect(() => {
        if (data)
            setForm({
                name: data.name || '',
                slug: data.slug || '',
                city: data.city || '',
                state: data.state || '',
                latitude: data.latitude || '',
                longitude: data.longitude || '',
                timezone: data.timezone || '',
                dataSources: data.dataSources || [],
            });
    }, [data]);

    const handleFieldInput = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const navigateToStationList = () => navigate('/admin/stations');

    const submitForm = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append('dataSourcesJson', JSON.stringify(form.dataSources));

        doFetch(`http://localhost:8080/api/admin/stations/${slug}`, {
            ...options,
            method: 'PUT',
            body: formData,
        });
    };

    const moveItem = (from, to) => {
        if (to < 0 || to >= form.dataSources.length) return;
        const updated = [...form.dataSources];
        const [moved] = updated.splice(from, 1);
        updated.splice(to, 0, moved);

        setForm(prev => ({
            ...prev,
            dataSources: updated,
        }));
    };

    const handleAdd = () => {
        setForm(prev => ({
            ...prev,
            dataSources: [
                ...prev.dataSources,
                {
                    type: 'NewType',
                    name: 'NewName',
                    sourceIdentifier: `id-${Date.now()}`,
                },
            ],
        }));
    };

    return (
        <Layout>
            <Header label={'Edit Station'} />
            <MainContent loading={loading} error={error} data={data}>
                {data && (
                    <form onSubmit={submitForm} className={'flex flex-row gap-x-4 h-full'}>
                        <div className={'card flex flex-col gap-y-4 flex-1'}>
                            <div className={'form-control flex flex-col'}>
                                <label className="mb-1" htmlFor="name-input">
                                    Name
                                </label>
                                <input id="name-input" type="text" name="name" value={form.name} onInput={handleFieldInput} />
                            </div>
                            <div className={'form-control flex flex-col'}>
                                <label className="mb-1" htmlFor="slug-input">
                                    Slug
                                </label>
                                <input id="slug-input" type="text" name="slug" value={form.slug} onInput={handleFieldInput} />
                            </div>
                            <div className={'flex flex-row gap-x-4'}>
                                <div className={'form-control flex flex-col flex-1'}>
                                    <label className="mb-1" htmlFor="city-input">
                                        City
                                    </label>
                                    <input id="city-input" type="text" name="city" value={form.city} onInput={handleFieldInput} />
                                </div>
                                <div className={'form-control flex flex-col flex-1'}>
                                    <label className="mb-1" htmlFor="state-input">
                                        State
                                    </label>
                                    <input id="state-input" type="text" name="state" value={form.state} onInput={handleFieldInput} />
                                </div>
                            </div>
                            <div className={'flex flex-row gap-x-4'}>
                                <div className={'form-control flex flex-col flex-1'}>
                                    <label className="mb-1" htmlFor="latitude-input">
                                        Latitude
                                    </label>
                                    <input id="latitude-input" type="text" name="latitude" value={form.latitude} onInput={handleFieldInput} />
                                </div>
                                <div className={'form-control flex flex-col flex-1'}>
                                    <label className="mb-1" htmlFor="longitude-input">
                                        Longitude
                                    </label>
                                    <input id="longitude-input" type="text" name="longitude" value={form.longitude} onInput={handleFieldInput} />
                                </div>
                            </div>
                            <div className={'form-control flex flex-col flex-1'}>
                                <label className="mb-1" htmlFor="timezone-input">
                                    Timezone
                                </label>
                                <input id="timezone-input" type="text" name="timezone" value={form.timezone} onInput={handleFieldInput} />
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
                        <div className="card w-1/2 flex flex-col flex1">
                            <div className="mb-1 flex justify-between items-center">
                                <span>Datasources</span>
                                <button type="button" className="link" onClick={handleAdd}>
                                    <span className="flex flex-row gap-x-1 items-center">
                                        <IoAddCircleOutline className="color-text" />
                                        Add
                                    </span>
                                </button>
                            </div>

                            <div className="flex flex-col gap-y-2">
                                <div className="card table head grid grid-cols-4 font-bold text-lg">
                                    <span>Type</span>
                                    <span>Name</span>
                                    <span>Identifier</span>
                                    <span>Actions</span>
                                </div>

                                {form.dataSources
                                    .filter(ds => ds != null)
                                    .map((ds, index) => (
                                        <div className="card table head grid grid-cols-4 items-center" key={`${ds.name}-${ds.type}`}>
                                            <span>{ds.type}</span>
                                            <span>{ds.name}</span>
                                            <span>{ds.sourceIdentifier}</span>
                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => moveItem(index, index - 1)}
                                                    disabled={index === 0}
                                                    className="bg-gray-200 px-2 rounded disabled:opacity-50"
                                                >
                                                    ⬆
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => moveItem(index, index + 1)}
                                                    disabled={index === form.dataSources.length - 1}
                                                    className="bg-gray-200 px-2 rounded disabled:opacity-50"
                                                >
                                                    ⬇
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </form>
                )}
            </MainContent>
        </Layout>
    );
}

export default EditStation;
