import MainContent from '../../../components/layout/MainContent.jsx';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/layout/PageHeader.jsx';
import Layout from '../../../components/layout/Layout.jsx';
import useFetch from '../../../hooks/useFetch.jsx';
import { useEffect, useMemo } from 'react';
import TooltipWrapper from '../../../components/TooltipWrapper.jsx';

function ListStations() {
    const navigate = useNavigate();
    const { data, loading, error, doFetch } = useFetch();
    const token = localStorage.getItem('token');
    const options = useMemo(() => ({ headers: { Authorization: `Bearer ${token}` } }), [token]);

    useEffect(() => {
        doFetch(`http://localhost:8080/api/admin/stations`, options);
    }, [doFetch, options]);

    const editStation = (e) => {
        navigate(`/admin/stations/${e.currentTarget.dataset.slug}`);
    };

    const renderedDataRows = data?.map((station) => (
        <TooltipWrapper title="Click to edit" key={station.id}>
            <button onClick={editStation} className="table-item grid grid-cols-6 justify-items-start px-6 py-4 w-full" data-slug={station.slug}>
                <span>{station.name}</span>
                <span>{station.slug}</span>
                <span>{station.city}</span>
                <span>{station.state}</span>
                <span>{station.latitude}</span>
                <span>{station.longitude}</span>
            </button>
        </TooltipWrapper>
    ));

    return (
        <Layout>
            <PageHeader label={'Stations'} />
            <MainContent data={data} loading={loading} error={error}>
                {!loading && !error && data?.length > 0 && (
                    <div className="card flex flex-col h-full table overflow-hidden">
                        <div className="table-header grid grid-cols-6 font-bold text-lg w-full">
                            <span>Name</span>
                            <span>Slug</span>
                            <span>City</span>
                            <span>State</span>
                            <span>Latitude</span>
                            <span>Longitude</span>
                        </div>
                        <div className="table-body w-full overflow-y-auto">{data && renderedDataRows}</div>
                    </div>
                )}
                {!loading && !error && data?.length === 0 && <p>No stations found.</p>}
            </MainContent>
        </Layout>
    );
}

export default ListStations;
