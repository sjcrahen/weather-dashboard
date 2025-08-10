import { useParams } from 'react-router-dom';
import MainContent from '../../../components/layout/MainContent.jsx';
import PageHeader from '../../../components/layout/PageHeader.jsx';
import Layout from '../../../components/layout/Layout.jsx';
import useFetch from '../../../hooks/useFetch.jsx';
import { useEffect, useMemo, useState } from 'react';
import StationForm from '../../../components/stations/StationForm.jsx';

function CreateEditStation() {
    const { slug } = useParams();
    const { data, loading, error, doFetch } = useFetch();
    const [formData, setFormData] = useState({});
    const token = localStorage.getItem('token');
    const options = useMemo(() => ({ headers: { Authorization: `Bearer ${token}` } }), [token]);

    useEffect(() => {
        const initForm = async () => {
            if (slug === 'new') {
                setFormData({});
                return;
            }
            await doFetch(`http://localhost:8080/api/admin/stations/${slug}`, options);
        };
        initForm();
    }, [slug, doFetch, options]);

    useEffect(() => {
        setFormData(data);
    }, [data]);

    return (
        <Layout>
            <PageHeader label={'Edit Station'} />
            <MainContent loading={loading} error={error} data={data}>
                {<StationForm data={formData} slug={slug} doFetch={doFetch} />}
            </MainContent>
        </Layout>
    );
}

export default CreateEditStation;
