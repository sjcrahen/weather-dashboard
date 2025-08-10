import { useParams } from 'react-router-dom';
import MainContent from '../../components/MainContent.jsx';
import PageHeader from '../../components/PageHeader.jsx';
import Layout from '../../components/Layout.jsx';
import useFetch from '../../hooks/useFetch.jsx';
import { useEffect, useMemo } from 'react';
import StationForm from '../../components/StationForm.jsx';

function EditStation() {
    const { slug } = useParams();
    const { data, loading, error, doFetch } = useFetch();
    const token = localStorage.getItem('token');
    const options = useMemo(() => ({ headers: { Authorization: `Bearer ${token}` } }), [token]);

    useEffect(() => {
        doFetch(`http://localhost:8080/api/admin/stations/${slug}`, options);
    }, [slug, doFetch, options]);

    return (
        <Layout>
            <PageHeader label={'Edit Station'} />
            <MainContent loading={loading} error={error} data={data}>
                {data && <StationForm data={data} slug={slug} doFetch={doFetch} />}
            </MainContent>
        </Layout>
    );
}

export default EditStation;
