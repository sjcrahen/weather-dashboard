import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import Input from '../Input.jsx';
import StationDataSourcesList from './StationDataSourcesList.jsx';

function StationForm({ data, slug, doFetch }) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const options = useMemo(() => ({ headers: { Authorization: `Bearer ${token}` } }), [token]);
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

    const handleFieldInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const navigateToStationList = () => navigate('/admin/stations');

    const submitForm = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append('dataSourcesJson', JSON.stringify(form.dataSources));

        const method = slug === 'new' ? 'POST' : 'PUT';
        const url = `http://localhost:8080/api/admin/stations${slug === 'new' ? '' : `/${slug}`}`;

        await doFetch(url, {
            ...options,
            method,
            body: formData,
        });
        if (slug === 'new') navigate(`/admin/stations/${form.slug}`);
    };

    return (
        <form id="edit-station" onSubmit={submitForm} className={'flex flex-col gap-y-4'}>
            <div className="flex flex-row gap-x-8 h-full">
                <div className={'flex flex-col gap-y-4 flex-1'}>
                    <Input label="Name" type="text" name="name" value={form.name} onInput={handleFieldInput} required={true} attrs='{"maxLength":"50"}' />
                    <Input label="Slug" type="text" name="slug" value={form.slug} onInput={handleFieldInput} required={true} attrs='{"maxLength":"50"}' />
                    <div className={'flex flex-row gap-x-4'}>
                        <Input
                            containerClass="grow"
                            label="City"
                            type="text"
                            name="city"
                            value={form.city}
                            onInput={handleFieldInput}
                            required={true}
                            attrs='{"maxLength":"100"}'
                        />
                        <Input
                            containerClass="flex-none w-14"
                            label="State"
                            type="text"
                            name="state"
                            value={form.state}
                            onInput={handleFieldInput}
                            required={true}
                            attrs='{"maxLength":"2"}'
                        />
                    </div>
                    <Input label="Timezone" type="text" name="timezone" value={form.timezone} onInput={handleFieldInput} required={true} attrs='{"maxLength":"50"}' />
                    <div className={'flex flex-row gap-x-4'}>
                        <Input
                            containerClass="flex-initial w-28"
                            label="Latitude"
                            type="text"
                            name="latitude"
                            value={form.latitude}
                            onInput={handleFieldInput}
                            required={true}
                            attrs='{"pattern":"^-?\\d*\\.?\\d*$"}'
                        />
                        <Input
                            containerClass="flex-initial w-28"
                            label="Longitude"
                            type="text"
                            name="longitude"
                            value={form.longitude}
                            onInput={handleFieldInput}
                            required={true}
                            attrs='{"pattern":"^-?\\d*\\.?\\d*$"}'
                        />
                    </div>
                </div>
                <div className="w-2/3 flex flex-col flex1">
                    <StationDataSourcesList stationDataSources={form.dataSources} setForm={setForm} />
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
        </form>
    );
}

export default StationForm;
